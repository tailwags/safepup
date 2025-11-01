export PATH := "./node_modules/.bin:" + env_var('PATH')

_:
    @just --list

# Install js packages and fetch rust crates
[group('setup')]
install:
    pnpm install
    cargo fetch

# Development

# Start both server and dashboard in watch mode
[group('dev')]
dev:
    concurrently -n server,client -c green,blue 'just dev-server' 'just dev-client'

# Start server in watch mode
[group('dev')]
[working-directory('crates/server')]
dev-server log="debug":
    RUST_LOG={{ log }} watchexec -w src -e rs -w Cargo.toml -r -- cargo run

# Start the dashboard in watch mode
[group('dev')]
[working-directory('packages/dashboard')]
dev-client:
    pnpm dev

# Building

# Build everything
[group('build')]
build-all: build-server build-client build-components build-extension build-extension-firefox

# Build server
[group('build')]
build-server:
    cargo build --release --package safepup-server

# Build dashboard
[group('build')]
[working-directory('packages/dashboard')]
build-client:
    pnpm build

# Build components library
[group('build')]
[working-directory('packages/components')]
build-components:
    pnpm build

# Build browser extension
[group('build')]
[working-directory('packages/extension')]
build-extension:
    pnpm build

# Build firefox extension
[group('build')]
[working-directory('packages/extension')]
build-extension-firefox:
    pnpm build:firefox

# Utilities

# Clean all artifacts
[group('utils')]
clean: clean-js clean-rust

# Clean js related artifacts
[group('utils')]
clean-js:
    rm -rf node_modules packages/*/node_modules
    rm -rf packages/*/.astro packages/*/.output packages/*/dist packages/*/.wxt

# Clean rust related artifacts
[group('utils')]
clean-rust:
    cargo clean
