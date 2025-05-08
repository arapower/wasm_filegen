# WASM sample: Large file generation

## How to setup

```sh
# Install Rust
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install wasm-pack
cargo install wasm-pack
```

## How to run

```sh
# Build WASM
$ wasm-pack build --target web --out-dir web/pkg

# Execute local server
$ cd web
$ npx serve
```
