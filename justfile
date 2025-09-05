_:
    @just --list

[working-directory: 'client']
dev-client:
  pnpm run dev

[working-directory: 'server']
dev-server:
  watchexec --restart --verbose --wrap-process=session --stop-signal SIGTERM --exts gleam --debounce 500ms --watch src/ -- "gleam run"
