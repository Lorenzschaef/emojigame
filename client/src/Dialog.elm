module Dialog exposing (..)

import Html exposing (Html, div, text)
import Html.Events exposing (onClick)
import List exposing (tail)


type alias Dialog appMsg =
    { text : String
    , buttons : List (Button appMsg)
    }


type alias Button appMsg =
    { label : String
    , cmd : Msg appMsg
    }


type Msg appMsg
    = Open (Dialog appMsg)
    | Close
    | Do appMsg


type alias Model appMsg =
    { stack : List (Dialog appMsg)
    }


type alias DialogRenderer appMsg =
    Dialog appMsg -> Html appMsg


update : Model appMsg -> Msg appMsg -> Model appMsg
update model msg =
    case msg of
        Open d ->
            { model | stack = d :: model.stack }

        Close ->
            { model | stack = Maybe.withDefault [] (tail model.stack) }

        -- the msg is meant to be intercepted and handled by the app
        Do _ ->
            { model | stack = Maybe.withDefault [] (tail model.stack) }


view : Model appMsg -> DialogRenderer appMsg -> Html appMsg
view model renderer =
    case List.head model.stack of
        Nothing ->
            div [] []

        Just d ->
            renderer d



--div [] [ List.map renderer model.stack ]


viewDialog : DialogRenderer appMsg
viewDialog d =
    div []
        [ div [] [ text d.text ]
        , div [] (List.map viewButton d.buttons)
        ]


viewButton : Button appMsg -> Html (Msg appMsg)
viewButton button =
    Html.button [ onClick button.cmd ] [ text button.label ]


make : String -> List (Button appMsg) -> Dialog appMsg
make text buttons =
    Dialog text buttons



-- shortcuts


dialog : String -> List (Button appMsg) -> Msg appMsg
dialog text buttons =
    Open <| Dialog text buttons


confirm : String -> appMsg -> Msg appMsg
confirm text appMsg =
    dialog text [ Button "OK" (Do appMsg), Button "Cancel" Close ]


alert : String -> Msg appMsg
alert text =
    dialog text [ Button "OK" Close ]


choose : String -> appMsg -> appMsg -> Msg appMsg
choose text onTrue onFalse =
    dialog text [ Button "Yes" (Do onTrue), Button "No" (Do onFalse) ]



-- extended
--type alias DialogX appModel appMsg dialogModel =
--    { init : dialogModel
--    , update :
--    }


type alias DialogController dialogModel dialogMsg =
    { update : dialogModel -> dialogMsg -> dialogModel
    , view : dialogModel -> Html dialogMsg
    }


type alias DialogX dialogModel dialogMsg appMsg =
    { controller : DialogController dialogModel dialogMsg
    , model : dialogModel
    , buttons : List (Button appMsg)
    }


dialogx : dialogModel -> DialogController dialogModel dialogMsg -> List (Button appMsg) -> Msg appMsg
dialogx model controller buttons =
    OpenX <| DialogX controller model buttons


makeSimple : String -> List (Button appMsg) -> DialogX String () appMsg
makeSimple text buttons =
    { controller = simpleController
    , model = text
    , buttons = buttons
    }


simpleController : DialogController String ()
simpleController =
    { update = \model _ -> model
    , view = \model -> text model
    }


type alias DialogFunc =
    DialogX dialogModel dialogMsg appMsg -> Html appMsg



--type alias Dialog model msg =
--    { init : model
--    , update : msg -> model -> ( model, Cmd msg )
--    , view : model -> Html msg
--    , buttons : List ( Button msg )
--    }
--
--type alias Button msg =
--    { label : String
--    , cmd : msg
--    }
--
--type alias DialogStack model msg = List (Dialog model msg)
--
--type Msg msg
--    = Open
--    | Close
--    | Do msg
--
--type alias StandardModel msg =
--    { text : String
--    , buttons : List ( Button msg ) }
--
--alert : String -> String -> (Dialog _ msg)
--alert text buttonLabel =
--    { init = ()
--    , update = \_ _ -> ( (), Cmd.none )
--    , view = view <| StandardModel <| text [ Button buttonLabel Close ]
--    }
--
--confirm : String ->
--
--view : model -> Html msg
--view model =
--    div []
--        [ div [] [ text  ]
--        ]
