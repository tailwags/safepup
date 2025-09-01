// import gleam/string_tree
import safepup/web
import wisp.{type Request, type Response}

pub fn handle_request(req: Request) -> Response {
  use req <- web.middleware(req)

  case req |> wisp.path_segments {
    _ -> wisp.not_found()
  }
}
