export PATH := "./node_modules/.bin:" + env_var('PATH')

_:
    @just --list

# Development

# Start both server and dashboard in watch mode
[group('dev')]
dev: _check-node_modules
    @concurrently -n server,client -c green,blue 'just dev-server' 'just dev-client'

# Start server in watch mode
[group('dev')]
[working-directory('packages/server')]
dev-server: _check-node_modules
    bun run dev

# Start the dashboard in watch mode
[group('dev')]
[working-directory('packages/dashboard')]
dev-client: _check-node_modules
    bun run dev

# Building

# Build everything
[group('build')]
build-all: build-server build-client build-components build-extension build-extension-firefox

# Build server
[group('build')]
[working-directory('packages/server')]
build-server: _check-node_modules
    bun run build

# Build dashboard
[group('build')]
[working-directory('packages/dashboard')]
build-client: _check-node_modules
    bun run build

# Build components library
[group('build')]
[working-directory('packages/components')]
build-components: _check-node_modules
    bun run build

# Build browser extension
[group('build')]
[working-directory('packages/extension')]
build-extension: _check-node_modules
    bun run build

# Build firefox extension
[group('build')]
[working-directory('packages/extension')]
build-extension-firefox: _check-node_modules
    bun run build:firefox

# Linting and Formatting

# Run all checks (format, lint)
[group('quality')]
check-all: check-format check-lint

# Run all fixes (format, lint)
[group('quality')]
fix-all: format lint

# Format code with fixes
[group('quality')]
format: _check-node_modules
    bun run format:fix

# Check formatting (no fixes)
[group('quality')]
check-format: _check-node_modules
    bun run format

# Lint code with fixes
[group('quality')]
lint: _check-node_modules
    bun run lint:fix

# Check linting (no fixes)
[group('quality')]
check-lint: _check-node_modules
    bun run lint

# Utilities

# Clean all artifacts
[group('utils')]
clean:
    rm -rf node_modules packages/*/node_modules
    rm -rf packages/*/.astro packages/*/.output packages/*/dist packages/*/.wxt

# Internal stuff

_check-node_modules:
    @if [ ! -d node_modules ]; then \
        printf '\033[0;33m⚠️ node_modules not found, running bun install...\033[0m\n'; \
        bun install; \
    fi
