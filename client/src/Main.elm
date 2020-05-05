port module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Dict exposing (Dict)
import EmojiPicker.EmojiPicker as EmojiPicker exposing (Model, Msg(..), PickerConfig, init, update, view)
import Html exposing (Html, button, div, h1, input, li, text, ul)
import Html.Attributes exposing (class, id, placeholder, style, value)
import Html.Events exposing (onClick, onInput)
import Json.Decode exposing (Decoder, andThen, bool, decodeString, dict, errorToString, fail, field, int, list, map, maybe, oneOf, string, succeed)
import Json.Decode.Pipeline exposing (required)
import List.Nonempty as NE exposing (Nonempty)
import Maybe
import Random
import Task


port sendMessage : String -> Cmd msg


port messageReceiver : (String -> msg) -> Sub msg


port saveLogin : ( String, String ) -> Cmd msg


port wsDisconnectReceiver : (() -> msg) -> Sub msg


port wsConnectReceiver : (() -> msg) -> Sub msg


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Model =
    { errorMsg : String
    , lastWsMsg : String
    , credentials : Credentials
    , game : Game
    , submission : String
    , emojiPicker : EmojiPicker.Model
    , playerToBeKicked : Maybe Player
    , connected : Bool
    }


type alias Game =
    { players : List Player
    , name : String
    , turns : Nonempty Turn
    }


type alias Player =
    { name : String
    , points : Int
    , active : Bool
    }


type alias Turn =
    { phrase : String
    , submissions : Dict String String
    , guesser : String
    , submissionsComplete : Bool
    , bestSubmissionPlayerName : Maybe String
    }


type WsMsg
    = GameState Game
    | Ack
    | ErrorMsg String


wsMsgDecoder : Decoder WsMsg
wsMsgDecoder =
    oneOf
        [ field "game" gameDecoder |> map GameState
        , field "ack" (succeed Ack)
        , field "error" string |> map ErrorMsg
        ]


gameDecoder : Decoder Game
gameDecoder =
    succeed Game
        |> required "players" (list playerDecoder)
        |> required "name" string
        |> required "turns" (nonemptyListDecoder turnDecoder)


nonemptyListDecoder : Decoder a -> Decoder (Nonempty a)
nonemptyListDecoder value =
    let
        fn =
            \l ->
                case NE.fromList l of
                    Nothing ->
                        fail "list not expected to be empty."

                    Just neList ->
                        succeed neList
    in
    list value |> andThen fn


playerDecoder : Decoder Player
playerDecoder =
    succeed Player
        |> required "name" string
        |> required "points" int
        |> required "active" bool


turnDecoder : Decoder Turn
turnDecoder =
    succeed Turn
        |> required "phrase" string
        |> required "submissions" (dict string)
        |> required "guesser" string
        |> required "submissionsComplete" bool
        |> required "bestSubmissionPlayerName" (maybe string)


type alias Credentials =
    { playerName : String
    , roomName : String
    , secret : String
    }


init : Credentials -> ( Model, Cmd Msg )
init credentials =
    ( { game = fakeGame credentials
      , errorMsg = ""
      , lastWsMsg = ""
      , credentials = credentials
      , submission = ""
      , emojiPicker = initEmojiPicker
      , playerToBeKicked = Nothing
      , connected = False
      }
    , joinCmd credentials
    )


fakeGame : Credentials -> Game
fakeGame credentials =
    { players = []
    , name = credentials.roomName
    , turns = NE.fromElement fakeTurn
    }


fakeTurn : Turn
fakeTurn =
    { phrase = ""
    , submissions = Dict.empty
    , guesser = ""
    , submissionsComplete = False
    , bestSubmissionPlayerName = Nothing
    }


joinCmd : Credentials -> Cmd msg
joinCmd credentials =
    sendMessage <| "join " ++ credentials.roomName ++ " " ++ credentials.playerName ++ " " ++ credentials.secret



--initLobby : LobbyModel
--initLobby =
--    { roomName = ""
--    , playerName = ""
--    }


type
    Msg
    --= UpdateLobbyPlayerName String
    --| UpdateLobbyRoomName String
    --| JoinRoom
    = UpdateSubmission String
    | Submit
    | ReceiveWs String
    | DisconnectedWs
    | ConnectedWs
    | FinishTurn FinishingVote
    | EmojiMsg EmojiPicker.Msg
    | KickPlayer Player
    | KickPlayerConfirm Bool
    | SkipTurn


type FinishingVote
    = Nope
    | Best String



-- update -------------


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ReceiveWs wsMsgJson ->
            ( onWsMsg model wsMsgJson, Cmd.none )

        DisconnectedWs ->
            ( { model | connected = False }, Cmd.none )

        ConnectedWs ->
            ( { model | connected = True }, joinCmd model.credentials )

        UpdateSubmission text ->
            ( { model | submission = text }, Cmd.none )

        Submit ->
            ( { model | submission = "" }, sendMessage ("submit " ++ cleanSubmission model.submission) )

        FinishTurn Nope ->
            ( model, sendMessage "finish" )

        FinishTurn (Best name) ->
            ( model, sendMessage <| "finish " ++ name )

        EmojiMsg subMsg ->
            case subMsg of
                EmojiPicker.Select s ->
                    ( { model | submission = model.submission ++ s }, Cmd.none )

                EmojiPicker.Toggle ->
                    ( model, Cmd.none )

                _ ->
                    let
                        ( m, c ) =
                            EmojiPicker.update subMsg model.emojiPicker
                    in
                    ( { model | emojiPicker = m }, Cmd.map EmojiMsg c )

        KickPlayer player ->
            ( { model | playerToBeKicked = Just player }, Cmd.none )

        KickPlayerConfirm confirm ->
            case model.playerToBeKicked of
                Nothing ->
                    ( model, Cmd.none )

                Just player ->
                    ( { model | playerToBeKicked = Nothing }
                    , if confirm then
                        sendMessage <| "kick " ++ player.name

                      else
                        Cmd.none
                    )

        SkipTurn ->
            ( model, sendMessage "skip" )



--GeneratedRandomSecret randomVal ->
--    ( { model | randomVal = Just randomVal }, Cmd.none )
--UpdateLobbyPlayerName name ->
--    ifInLobby model (\lobbyModel -> ( { lobbyModel | playerName = name }, Cmd.none ))
--
--UpdateLobbyRoomName name ->
--    ifInLobby model (\lobbyModel -> ( { lobbyModel | roomName = name }, Cmd.none ))
--JoinRoom ->
--    case model.page of
--        Lobby lobbyModel ->
--            if (String.length lobbyModel.roomName == 0) || (String.length lobbyModel.playerName == 0) then
--                ( model, Cmd.none )
--
--            else
--                case model.randomVal of
--                    Just randomVal ->
--                        ( { model | secret = Just randomVal }
--                        , sendMessage <| "join " ++ lobbyModel.roomName ++ " " ++ lobbyModel.playerName ++ " " ++ randomVal
--                        )
--
--                    Nothing ->
--                        ( model, Cmd.none )
--
--        _ ->
--            ( model, Cmd.none )
--_ ->
--case model.page of
--    Lobby lobbyModel ->
--        let
--            ( newLobbyModel, cmd ) =
--                updateLobby msg lobbyModel
--        in
--        ( { model | page = Lobby newLobbyModel }, cmd )
--
--    Room roomModel ->
--        let
--            ( newRoomModel, cmd ) =
--                updateRoom msg roomModel
--        in
--        ( { model | page = Room newRoomModel }, cmd )
--
--    _ ->
--        ( model, Cmd.none )
--ifInLobby : Model -> (LobbyModel -> ( LobbyModel, Cmd msg )) -> ( Model, Cmd msg )
--ifInLobby model func =
--    case model.page of
--        Lobby lobbyModel ->
--            let
--                ( newLobbyModel, cmd ) =
--                    func lobbyModel
--            in
--            ( { model | page = Lobby newLobbyModel }, cmd )
--
--        _ ->
--            ( { model | errorMsg = "Error" }, Cmd.none )
--updateRoom : Msg -> RoomModel -> ( RoomModel, Cmd Msg )
--updateRoom msg roomModel =
--    case msg of
--
--        _ ->
--            ( roomModel, Cmd.none )
--
--
--
---- todo error


cleanSubmission : String -> String
cleanSubmission input =
    input



--String.filter isEmoji input
--let
--    maybeRegex =
--        --Regex.fromString "/(©|®|[\u{2000}-㌀]|\u{D83C}[퀀-\u{DFFF}]|\u{D83D}[퀀-\u{DFFF}]|\u{D83E}[퀀-\u{DFFF}])/"
--        Regex.fromString "/[^\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+/u"
--
--    --Regex.fromString "/[^\u{D83C}-\u{DBFF}\u{DC00}-\u{DFFF}]+/u"
--    replaceFn =
--        \_ -> ""
--in
--case maybeRegex of
--    Nothing ->
--        "regexerror"
--
--    Just regex ->
--        Regex.replace regex replaceFn input


isEmoji : Char -> Bool
isEmoji char =
    let
        code =
            Char.toCode char
    in
    (code >= 0xD83C && code <= 0xDBFF)
        || (code >= 0xDC00 && code <= 0xDFFF)



--updateLobby : Msg -> LobbyModel -> ( LobbyModel, Cmd Msg )
--updateLobby msg lobbyModel =
--    case msg of
--        --, Cmd.batch
--        --    [ sendMessage ("join " ++ lobbyModel.roomName ++ " " ++ lobbyModel.playerName ++ " somesecret")
--        --    , saveLogin ( lobbyModel.roomName, lobbyModel.playerName )
--        --    ]
--        --)
--        _ ->
--            ( lobbyModel, Cmd.none )
--
--todo error


onWsMsg : Model -> String -> Model
onWsMsg model wsMsgJson =
    case decodeString wsMsgDecoder wsMsgJson of
        Ok wsMsg ->
            case wsMsg of
                GameState game ->
                    { model | game = game }

                Ack ->
                    model

                --todo
                ErrorMsg msg ->
                    { model | errorMsg = msg }

        Err msg ->
            { model | errorMsg = "Decode Error: " ++ errorToString msg }



--initRoom : LobbyModel -> Game -> RoomModel
--initRoom lobbyModel game =
--    { roomName = lobbyModel.roomName
--    , playerName = lobbyModel.playerName
--    , game = game
--    , submission = ""
--    , emojiPicker = { initEmojiPicker | hidden = False }
--    , playerToBeKicked = Nothing
--    }


initEmojiPicker =
    EmojiPicker.init
        { offsetX = 0 -- horizontal offset
        , offsetY = 0 -- vertical offset
        , closeOnSelect = False -- close after clicking an emoji
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ messageReceiver ReceiveWs
        , wsDisconnectReceiver (always DisconnectedWs)
        , wsConnectReceiver (always ConnectedWs)
        ]



-- view ----------------


view : Model -> Html Msg
view model =
    div [ id "container" ]
        ([ div [ style "color" "red" ] [ text model.errorMsg ]

         --, viewRoom model
         ]
            ++ [ case model.connected of
                    False ->
                        viewDisconnected

                    True ->
                        viewRoom model
               ]
        )


viewDisconnected : Html Msg
viewDisconnected =
    div [ id "disconnected" ] [ text "Trying to reconnect to the server..." ]



--viewLobby : LobbyModel -> Html Msg
--viewLobby model =
--    div [ id "lobby" ]
--        [ input [ id "playerName", onInput UpdateLobbyPlayerName, value model.playerName, placeholder "Player Name" ] []
--        , input [ id "roomName", onInput UpdateLobbyRoomName, value model.roomName, placeholder "Room Name" ] []
--        , button [ onClick JoinRoom ] [ text "Join" ]
--        ]


viewRoom : Model -> Html Msg
viewRoom model =
    div
        ([ id "room" ]
            ++ (if currentScreen model == Write then
                    [ class "write-mode" ]

                else
                    []
               )
        )
        --[ h1 [] [ text roomModel.roomName ]
        [ div [ id "left-col" ]
            [ viewPlayerList model
            , viewInfoDisplay model.game
            ]
        , div [ id "main-window" ] [ viewMainWindow model ]
        , div [ id "emoji-picker", style "position" "relative" ] [ viewEmojiPicker model ]
        ]


type Screen
    = Wait
    | Write
    | Submissions
    | Guess
    | ConfirmKick Player


currentScreen : Model -> Screen
currentScreen model =
    case model.playerToBeKicked of
        Just player ->
            ConfirmKick player

        Nothing ->
            if iAmTheGuesser model then
                if (currentTurn model.game).submissionsComplete then
                    Guess

                else
                    Wait

            else if (currentTurn model.game).submissionsComplete then
                Submissions

            else if hasSubmittedForCurrentTurn model then
                Wait

            else
                Write


viewMainWindow : Model -> Html Msg
viewMainWindow model =
    case currentScreen model of
        Wait ->
            viewWaitForSubmissions model.game

        Write ->
            viewSubmissionForm model

        Submissions ->
            viewSubmissions (currentTurn model.game)

        Guess ->
            viewSubmissionsForGuesser (currentTurn model.game)

        ConfirmKick player ->
            viewKickConfirm player


viewKickConfirm : Player -> Html Msg
viewKickConfirm player =
    div [ id "kick-confirm" ]
        [ div [] [ text <| "Do you want to throw " ++ player.name ++ " out of the game?" ]
        , div []
            [ button [ onClick <| KickPlayerConfirm True ] [ text "Yes" ]
            , button [ onClick <| KickPlayerConfirm False ] [ text "No" ]
            ]
        ]


viewInfoDisplay : Game -> Html Msg
viewInfoDisplay game =
    div [ id "info-display" ]
        [ div []
            [ text <| "Turn " ++ (String.fromInt <| NE.length game.turns)
            , button [ onClick SkipTurn ] [ text "Skip" ]
            ]
        , div [] [ text game.name ]
        ]


viewPlayerList : Model -> Html Msg
viewPlayerList model =
    div [ id "player-list" ]
        [ ul []
            (List.map (viewPlayer model) model.game.players)
        ]


viewPlayer : Model -> Player -> Html Msg
viewPlayer model player =
    li
        ((if player.name == model.credentials.playerName then
            [ class "player-self" ]

          else
            []
         )
            ++ [ onClick <| KickPlayer player ]
        )
        [ div [ id "player-icon1" ]
            [ text
                (if isTheGuesser model.game player then
                    "🕵️\u{200D}♂️"

                 else if not <| playerHasSubmitted model.game player then
                    "⏳"

                 else
                    ""
                )
            ]
        , div
            ([ id "player-name" ]
                ++ (if player.active then
                        []

                    else
                        [ class "inactive" ]
                   )
            )
            [ text player.name ]
        , div [ id "player-icon2" ]
            [ text <|
                if playerGotPointLastTurn model.game player then
                    "\u{1F947}"

                else if not player.active then
                    "😴"

                else
                    ""
            ]
        , div [ id "player-points" ] [ text <| String.fromInt player.points ]
        ]


isTheGuesser : Game -> Player -> Bool
isTheGuesser game player =
    (currentTurn game).guesser == player.name


playerHasSubmitted : Game -> Player -> Bool
playerHasSubmitted game player =
    List.member player.name <| Dict.keys <| (currentTurn game).submissions


playerGotPointLastTurn : Game -> Player -> Bool
playerGotPointLastTurn game player =
    case List.head <| NE.tail game.turns of
        Nothing ->
            False

        Just turn ->
            case turn.bestSubmissionPlayerName of
                Nothing ->
                    False

                Just playerName ->
                    playerName == player.name


currentTurn : Game -> Turn
currentTurn game =
    NE.head game.turns


viewSubmissions : Turn -> Html Msg
viewSubmissions turn =
    div [ id "submission-list" ]
        [ div [] [ text turn.phrase ]
        , ul [] (List.map (\s -> li [] [ text s ]) (Dict.values turn.submissions))
        , div [] [ text <| "Wait for " ++ turn.guesser ++ " to guess." ]
        ]


viewSubmissionsForGuesser : Turn -> Html Msg
viewSubmissionsForGuesser turn =
    div [ id "submission-list" ]
        --[ ul [] (List.map (\s -> li [] [ text s ]) (Dict.values turn.submissions))
        [ viewVotingButtons turn
        ]


viewVotingButtons : Turn -> Html Msg
viewVotingButtons turn =
    div [ id "voting-buttons" ]
        --[ button [ onClick VoteOk ] [ text "✅" ]
        [ ul [] (List.map (\( k, v ) -> li [ onClick <| FinishTurn (Best k) ] [ text v ]) (Dict.toList turn.submissions))
        , button [ onClick (FinishTurn Nope) ] [ text "\u{1F937}" ]
        , div [] [ text "Did you get it? Talk to the other players. Then choose who did the best job or click \u{1F937} if you didn't guess it right." ]
        ]


viewSubmissionForm : Model -> Html Msg
viewSubmissionForm model =
    div [ id "submission-form-container" ]
        [ viewPhrase <| currentTurn model.game
        , div [ id "submission-form" ]
            [ input [ onInput UpdateSubmission, placeholder "My Submission", value model.submission ] []
            , button [ onClick Submit ] [ text "Submit" ]
            ]
        ]


hasSubmittedForCurrentTurn : Model -> Bool
hasSubmittedForCurrentTurn model =
    List.member model.credentials.playerName (Dict.keys (currentTurn model.game).submissions)


viewWaitForSubmissions : Game -> Html Msg
viewWaitForSubmissions _ =
    div [ id "wait-for-submissions" ] [ text "Waiting for the other players" ]


viewPhrase : Turn -> Html Msg
viewPhrase turn =
    div [ id "phrase" ] [ text turn.phrase ]


viewEmojiPicker : Model -> Html Msg
viewEmojiPicker model =
    Html.map EmojiMsg <| EmojiPicker.view model.emojiPicker


iAmTheGuesser : Model -> Bool
iAmTheGuesser model =
    (currentTurn model.game).guesser == model.credentials.playerName
