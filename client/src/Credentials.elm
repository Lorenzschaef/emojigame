module Credentials exposing (..)

import Game
import Json.Decode exposing (string, succeed)
import Json.Decode.Pipeline exposing (required)
import RoomId exposing (RoomId)


type alias Credentials =
    { playerName : Game.PlayerName
    , roomId : RoomId
    , secret : Secret
    }


type Secret
    = Secret String


decoder : Json.Decode.Decoder Credentials
decoder =
    succeed Credentials
        |> required "playerName" Game.playerNameDecoder
        |> required "roomId" RoomId.roomIdDecoder
        |> required "secret" secretDecoder


secretDecoder =
    string |> Json.Decode.map Secret
