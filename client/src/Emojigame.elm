port module Emojigame exposing (..)

import AssocList
import Browser exposing (Document, UrlRequest)
import Browser.Navigation as Nav
import Credentials exposing (Credentials)
import Debug
import Dict
import EmojiPicker.EmojiPicker as EmojiPicker
import Game exposing (Game, Player, PlayerName(..), Turn)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode
import List.Nonempty as NE
import PlayingScreen as Playing
import Random
import RoomId exposing (RoomId(..))
import Url exposing (Url)
import WsApi exposing (Msg(..))


port sendMessage : String -> Cmd msg


port messageReceiver : (String -> msg) -> Sub msg


port saveLogin : ( String, String ) -> Cmd msg


port wsDisconnectReceiver : (() -> msg) -> Sub msg


port wsConnectReceiver : (() -> msg) -> Sub msg


main =
    Browser.application
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        , onUrlRequest = UrlRequested
        , onUrlChange = UrlChanged
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ messageReceiver <| helper << Json.Decode.decodeString WsApi.decoder
        , wsDisconnectReceiver (always DisconnectedWs)
        , wsConnectReceiver (always ConnectedWs)
        ]


helper : Result Json.Decode.Error WsApi.Msg -> Msg
helper result =
    case result of
        Ok wsMsg ->
            ReceiveWs wsMsg

        Err error ->
            WsError <| Json.Decode.errorToString error



-- Model


type alias Model =
    { navKey : Nav.Key
    , page : Page
    , currentUrl : Url
    }


type Page
    = Disconnected DisconnectedState
    | CreatingScreen Settings PlayerName
    | Creating Settings PlayerName
    | JoiningScreen RoomId PlayerName
    | Joining RoomId PlayerName
    | Playing Playing.Model
    | Error String


type DisconnectedState
    = Create
    | Join RoomId.RoomId
    | Reconnect Credentials


type alias Settings =
    { phraseSet : String
    }



--type alias PlayingModel =
--    { phase : PlayingPhase
--    , picker : EmojiPicker.Model
--    , game : Game
--    , credentials : Credentials
--    }
--
--
--type FinishingVote
--    = Nope
--    | Best String
--type PlayingPhase
--    = Wait
--    | Write String
--    | Submissions
--    | Guess
--    | ConfirmKick Game.Player


type Msg
    = UrlChanged Url
    | UrlRequested UrlRequest
    | WritePlayerName String
    | JoinRoom
    | ReceiveWs WsApi.Msg
    | WsError String
    | DisconnectedWs
    | ConnectedWs
    | PlayingMsg Playing.Msg



--| UpdateSubmission String
--| Submit
--| FinishTurn FinishingVote
--| EmojiMsg EmojiPicker.Msg
--| KickPlayer Game.Player
--| KickPlayerConfirm Bool
--| SkipTurn
--type ServerMsg
--    = GameState Game
--    | Secret Credentials.Secret
--    | ParseError String
-- INIT


init : Json.Decode.Value -> Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { navKey = key
      , page =
            case Json.Decode.decodeValue Credentials.decoder flags of
                Ok credentials ->
                    Disconnected <| Reconnect credentials

                Err _ ->
                    updateUrl url
      , currentUrl = url
      }
    , Cmd.none
    )


updateUrl : Url -> Page
updateUrl url =
    Disconnected <|
        case url.path of
            "/" ->
                Create

            p ->
                Join (RoomId <| String.dropLeft 1 p)


defaultSettings : Settings
defaultSettings =
    { phraseSet = ""
    }



--initPlayingModel : Credentials -> Game -> Playing.Model
--initPlayingModel credentials game =
--    { phase = Playing.Wait
--    , picker = initEmojiPicker
--    , game = game
--    , credentials = credentials
--    }


initEmojiPicker =
    EmojiPicker.init
        { offsetX = 0 -- horizontal offset
        , offsetY = 0 -- vertical offset
        , closeOnSelect = False -- close after clicking an emoji
        }



--initCredentials : RoomId -> Credentials
--initCredentials roomId =
--    { roomId = roomId
--    , playerName = PlayerName ""
--    , secret = Credentials.Secret ""
--    }
-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        updatePage =
            \page -> { model | page = page }
    in
    case ( msg, model.page ) of
        -- on connect
        ( ConnectedWs, Disconnected Create ) ->
            ( updatePage <| CreatingScreen defaultSettings (PlayerName ""), Cmd.none )

        ( ConnectedWs, Disconnected (Join roomId) ) ->
            ( updatePage <| JoiningScreen roomId (PlayerName ""), Cmd.none )

        -- creating a game
        ( WritePlayerName name, CreatingScreen settings playerName ) ->
            ( updatePage <| CreatingScreen settings (PlayerName name), Cmd.none )

        ( JoinRoom, CreatingScreen settings playerName ) ->
            ( updatePage <| Creating settings playerName, createRoom settings playerName )

        ( ReceiveWs (Joined game secret), Creating settings playerName ) ->
            let
                credentials =
                    { playerName = playerName
                    , roomId = game.id
                    , secret = secret
                    }

                (RoomId roomId) =
                    game.id
            in
            ( updatePage <| Playing <| Playing.init credentials game (makeLink model.currentUrl ++ roomId), Nav.replaceUrl model.navKey roomId )

        ( UrlChanged url, page ) ->
            ( { model | currentUrl = url }, Cmd.none )

        -- join screen
        ( WritePlayerName name, JoiningScreen roomId playerName ) ->
            ( updatePage <| JoiningScreen roomId (PlayerName name), Cmd.none )

        ( JoinRoom, JoiningScreen roomId playerName ) ->
            ( updatePage <| Joining roomId playerName, join roomId playerName )

        ( ReceiveWs (Joined game secret), Joining _ playerName ) ->
            let
                credentials =
                    { playerName = playerName
                    , roomId = game.id
                    , secret = secret
                    }
            in
            ( updatePage <| Playing <| Playing.init credentials game (makeLink model.currentUrl), Cmd.none )

        -- ignore broadcasted state at this point
        ( ReceiveWs _, Joining _ _ ) ->
            ( updatePage <| model.page, Cmd.none )

        -- reconnecting
        ( DisconnectedWs, Playing playingModel ) ->
            ( updatePage <| Disconnected <| Reconnect playingModel.credentials, Cmd.none )

        ( ConnectedWs, Disconnected (Reconnect credentials) ) ->
            ( updatePage <| Disconnected (Reconnect credentials), reconnect credentials )

        ( ReceiveWs (GameState game), Disconnected (Reconnect credentials) ) ->
            ( updatePage <| Playing <| Playing.init credentials game (makeLink model.currentUrl), Cmd.none )

        -- playing
        ( ReceiveWs (GameState game), Playing playingModel ) ->
            Tuple.mapFirst updatePage <| mapPlayingUpdate <| Playing.update playingModel (Playing.UpdateGame game)

        ( PlayingMsg playingMsg, Playing playingModel ) ->
            Tuple.mapFirst updatePage <| mapPlayingUpdate <| Playing.update playingModel playingMsg

        --( UpdateSubmission , Playing playingScreen ) ->
        --( Submit , Playing playingScreen ) ->
        --( ReceiveWs , Playing playingScreen ) ->
        --( FinishTurn , Playing playingScreen ) ->
        --( EmojiMsg , Playing playingScreen ) ->
        --( KickPlayer , Playing playingScreen ) ->
        --( KickPlayerConfirm , Playing playingScreen ) ->
        --( SkipTurn , Playing playingScreen ) ->
        anyOther ->
            ( updatePage <| Error <| "Invalid Msg: " ++ Debug.toString (Debug.log "msg: " anyOther), Cmd.none )


mapPlayingUpdate : ( Playing.Model, Cmd Playing.Msg, Maybe Playing.WsCmd ) -> ( Page, Cmd Msg )
mapPlayingUpdate ( m, c, wsm ) =
    let
        wsCmd =
            case wsm of
                Just (Playing.WsCmd cmdStr) ->
                    sendMessage cmdStr

                Nothing ->
                    Cmd.none
    in
    ( Playing m, Cmd.batch [ Cmd.map PlayingMsg c, wsCmd ] )


createRoom : Settings -> PlayerName -> Cmd Msg
createRoom settings (PlayerName playerName) =
    sendMessage <| "create " ++ playerName


join : RoomId -> PlayerName -> Cmd Msg
join (RoomId roomId) (PlayerName playerName) =
    sendMessage <| "join " ++ roomId ++ " " ++ playerName


reconnect : Credentials -> Cmd Msg
reconnect credentials =
    let
        (RoomId roomId) =
            credentials.roomId

        (PlayerName playerName) =
            credentials.playerName

        (Credentials.Secret secret) =
            credentials.secret
    in
    sendMessage <| "reconnect " ++ roomId ++ " " ++ playerName ++ " " ++ secret


makeLink : Url -> String
makeLink url =
    Url.toString url



-- VIEW


view : Model -> Document Msg
view model =
    { title = "Emojigame"
    , body =
        [ div [ id "container" ]
            [ case model.page of
                Disconnected _ ->
                    viewDisconnected

                CreatingScreen settings playerName ->
                    viewCreating settings playerName

                --viewLoading
                Creating settings playerName ->
                    viewLoading

                JoiningScreen roomId playerName ->
                    viewJoining roomId playerName

                Joining roomId playerName ->
                    viewLoading

                Playing playingModel ->
                    Html.map PlayingMsg (Playing.viewPlaying playingModel)

                Error msg ->
                    div [] [ text msg ]
            ]
        ]
    }


viewDisconnected : Html Msg
viewDisconnected =
    div [] [ text "Connecting to server..." ]


viewCreating : Settings -> PlayerName -> Html Msg
viewCreating settings (PlayerName playerName) =
    div [ id "lobby" ]
        [ input [ id "playerName", onInput WritePlayerName, value playerName, placeholder "Player Name" ] []
        , button [ onClick JoinRoom ] [ text "Start Game" ]
        ]


viewJoining : RoomId -> PlayerName -> Html Msg
viewJoining roomId (PlayerName playerName) =
    div [ id "lobby" ]
        [ input [ id "playerName", onInput WritePlayerName, value playerName, placeholder "Player Name" ] []
        , button [ onClick JoinRoom ] [ text "Join" ]
        ]


viewLoading : Html Msg
viewLoading =
    div [] [ text "Loading..." ]



-- view playing
--
--viewPlaying : PlayingModel -> Html Msg
--viewPlaying model =
--    div
--        ([ id "room" ]
--            ++ (case model.phase of
--                    Write _ ->
--                        [ class "write-mode" ]
--
--                    _ ->
--                        []
--               )
--        )
--        [ div [ id "left-col" ]
--            [ viewPlayerList model
--            , viewInfoDisplay model.game
--            ]
--        , div [ id "main-window" ] [ viewMainWindow model ]
--        , div [ id "emoji-picker", style "position" "relative" ] [ viewEmojiPicker model.picker ]
--        ]
--
--
--viewMainWindow : PlayingModel -> Html Msg
--viewMainWindow model =
--    case model.phase of
--        Wait ->
--            viewWaitForSubmissions model.game
--
--        Write submission ->
--            viewSubmissionForm model submission
--
--        Submissions ->
--            viewSubmissions (currentTurn model.game)
--
--        Guess ->
--            viewSubmissionsForGuesser (currentTurn model.game)
--
--        ConfirmKick player ->
--            viewKickConfirm player
--
--
--viewKickConfirm : Player -> Html Msg
--viewKickConfirm player =
--    let
--        (Game.PlayerName playerName) =
--            player.name
--    in
--    div [ id "kick-confirm" ]
--        [ div [] [ text <| "Do you want to throw " ++ playerName ++ " out of the game?" ]
--        , div []
--            [ button [ onClick <| KickPlayerConfirm True ] [ text "Yes" ]
--            , button [ onClick <| KickPlayerConfirm False ] [ text "No" ]
--            ]
--        ]
--
--
--viewInfoDisplay : Game -> Html Msg
--viewInfoDisplay game =
--    div [ id "info-display" ]
--        [ div []
--            [ text <| "Turn " ++ (String.fromInt <| NE.length game.turns)
--            , button [ onClick SkipTurn ] [ text "Skip" ]
--            ]
--
--        --, div [] [ text game.name ] --todo show url?
--        ]
--
--
--viewPlayerList : PlayingModel -> Html Msg
--viewPlayerList model =
--    div [ id "player-list" ]
--        [ ul []
--            (List.map (viewPlayer model) model.game.players)
--        ]
--
--
--viewPlayer : PlayingModel -> Player -> Html Msg
--viewPlayer model player =
--    let
--        (Game.PlayerName playerName) =
--            player.name
--    in
--    li
--        ((if player.name == model.credentials.playerName then
--            [ class "player-self" ]
--
--          else
--            []
--         )
--            ++ [ onClick <| KickPlayer player ]
--        )
--        [ div [ id "player-icon1" ]
--            [ text
--                (if isTheGuesser model.game player then
--                    "🕵️\u{200D}♂️"
--
--                 else if not <| playerHasSubmitted model.game player then
--                    "⏳"
--
--                 else
--                    ""
--                )
--            ]
--        , div
--            ([ id "player-name" ]
--                ++ (if player.active then
--                        []
--
--                    else
--                        [ class "inactive" ]
--                   )
--            )
--            [ text playerName ]
--        , div [ id "player-icon2" ]
--            [ text <|
--                if playerGotPointLastTurn model.game player then
--                    "\u{1F947}"
--
--                else if not player.active then
--                    "😴"
--
--                else
--                    ""
--            ]
--        , div [ id "player-points" ] [ text <| String.fromInt player.points ]
--        ]
--
--
--isTheGuesser : Game -> Player -> Bool
--isTheGuesser game player =
--    (currentTurn game).guesser == player.name
--
--
--playerHasSubmitted : Game -> Player -> Bool
--playerHasSubmitted game player =
--    List.member player.name <| AssocList.keys <| (currentTurn game).submissions
--
--
--playerGotPointLastTurn : Game -> Player -> Bool
--playerGotPointLastTurn game player =
--    case List.head <| NE.tail game.turns of
--        Nothing ->
--            False
--
--        Just turn ->
--            case turn.bestSubmissionPlayerName of
--                Nothing ->
--                    False
--
--                Just playerName ->
--                    playerName == player.name
--
--
--currentTurn : Game -> Turn
--currentTurn game =
--    NE.head game.turns
--
--
--viewSubmissions : Turn -> Html Msg
--viewSubmissions turn =
--    let
--        (PlayerName guesserName) =
--            turn.guesser
--    in
--    div [ id "submission-list" ]
--        [ div [] [ text turn.phrase ]
--        , ul [] (List.map (\s -> li [] [ text s ]) (AssocList.values turn.submissions))
--        , div [] [ text <| "Wait for " ++ guesserName ++ " to guess." ]
--        ]
--
--
--viewSubmissionsForGuesser : Turn -> Html Msg
--viewSubmissionsForGuesser turn =
--    div [ id "submission-list" ]
--        --[ ul [] (List.map (\s -> li [] [ text s ]) (Dict.values turn.submissions))
--        [ viewVotingButtons turn
--        ]
--
--
--viewVotingButtons : Turn -> Html Msg
--viewVotingButtons turn =
--    div [ id "voting-buttons" ]
--        --[ button [ onClick VoteOk ] [ text "✅" ]
--        [ ul [] (List.map (\( PlayerName k, v ) -> li [ onClick <| FinishTurn (Best k) ] [ text v ]) (AssocList.toList turn.submissions))
--        , button [ onClick (FinishTurn Nope) ] [ text "\u{1F937}" ]
--        , div [] [ text "Did you get it? Talk to the other players. Then choose who did the best job or click \u{1F937} if you didn't guess it right." ]
--        ]
--
--
--viewSubmissionForm : PlayingModel -> String -> Html Msg
--viewSubmissionForm model submission =
--    div [ id "submission-form-container" ]
--        [ viewPhrase <| currentTurn model.game
--        , div [ id "submission-form" ]
--            [ input [ onInput UpdateSubmission, placeholder "My Submission", value submission ] []
--            , button [ onClick Submit ] [ text "Submit" ]
--            ]
--        ]
--
--
--hasSubmittedForCurrentTurn : PlayingModel -> Bool
--hasSubmittedForCurrentTurn model =
--    List.member model.credentials.playerName (AssocList.keys (currentTurn model.game).submissions)
--
--
--viewWaitForSubmissions : Game -> Html Msg
--viewWaitForSubmissions _ =
--    div [ id "wait-for-submissions" ] [ text "Waiting for the other players" ]
--
--
--viewPhrase : Turn -> Html Msg
--viewPhrase turn =
--    div [ id "phrase" ] [ text turn.phrase ]
--
--
--viewEmojiPicker : EmojiPicker.Model -> Html Msg
--viewEmojiPicker model =
--    Html.map EmojiMsg <| EmojiPicker.view model
--
--
--iAmTheGuesser : PlayingModel -> Bool
--iAmTheGuesser model =
--    (currentTurn model.game).guesser == model.credentials.playerName
