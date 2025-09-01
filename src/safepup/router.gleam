// import gleam/string_tree
import gleam/dynamic/decode
import gleam/http.{Get, Post}
import gleam/json
import gleam/result
import safepup/web
import wisp.{type Request, type Response}

pub fn handle_request(req: Request) -> Response {
  use req <- web.middleware(req)

  case req |> wisp.path_segments {
    ["auth", "register"] -> req |> register
    _ -> wisp.not_found()
  }
}

fn register(req: Request) -> Response {
  use <- wisp.require_method(req, Post)
  use json <- wisp.require_json(req)

  let result = {
    use register_request <- result.try(decode.run(
      json,
      register_request_decoder(),
    ))

    echo register_request

    Ok(
      json.to_string_tree(
        json.object([
          #("user_id", json.string("550e8400-e29b-41d4-a716-446655440000")),
        ]),
      ),
    )
  }

  case result {
    Ok(json) -> wisp.json_response(json, 201)
    Error(_) -> wisp.unprocessable_entity()
  }
}

pub type RegisterRequest {
  RegisterRequest(
    email: String,
    auth_hash: String,
    auth_salt: String,
    key_salt: String,
    recovery_salt: String,
    encrypted_master_key: String,
  )
}

fn register_request_decoder() -> decode.Decoder(RegisterRequest) {
  use email <- decode.field("email", decode.string)
  use auth_hash <- decode.field("auth_hash", decode.string)
  use auth_salt <- decode.field("auth_salt", decode.string)
  use key_salt <- decode.field("key_salt", decode.string)
  use recovery_salt <- decode.field("recovery_salt", decode.string)
  use encrypted_master_key <- decode.field(
    "encrypted_master_key",
    decode.string,
  )

  decode.success(RegisterRequest(
    email:,
    auth_hash:,
    auth_salt:,
    key_salt:,
    recovery_salt:,
    encrypted_master_key:,
  ))
}
