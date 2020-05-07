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
import Json.Encode exposing (Value)
import List.Nonempty as NE
import PlayingScreen as Playing
import Random
import RoomId exposing (RoomId(..))
import Url exposing (Url)
import WsApi exposing (Msg(..))


port sendMessage : String -> Cmd msg


port messageReceiver : (String -> msg) -> Sub msg


port credentialsSaver : String -> Cmd msg


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
            case getCredentialsFromFlags flags url of
                Nothing ->
                    updateUrl url

                Just credentials ->
                    Disconnected <| Reconnect credentials
      , currentUrl = url
      }
    , case getCredentialsFromFlags flags url of
        Nothing ->
            Cmd.none

        Just credentials ->
            reconnect credentials
    )


getCredentialsFromFlags : Json.Decode.Value -> Url -> Maybe Credentials
getCredentialsFromFlags flags url =
    case Json.Decode.decodeValue Credentials.decoder flags of
        Ok credentials ->
            let
                (RoomId roomId) =
                    credentials.roomId
            in
            if String.dropLeft 1 url.path == roomId then
                Just credentials

            else
                Nothing

        Err _ ->
            Nothing


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
            ( updatePage <| Playing <| Playing.init credentials game (makeLink model.currentUrl ++ roomId)
            , Cmd.batch
                [ Nav.replaceUrl model.navKey roomId
                , saveCredentials credentials
                ]
            )

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
            ( updatePage <| Playing <| Playing.init credentials game (makeLink model.currentUrl)
            , saveCredentials credentials
            )

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


saveCredentials : Credentials -> Cmd Msg
saveCredentials credentials =
    credentialsSaver <| Json.Encode.encode 1 <| Credentials.encoder credentials



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
