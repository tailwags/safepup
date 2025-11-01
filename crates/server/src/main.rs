use std::net::Ipv4Addr;

use anyhow::{Context, Result};
use axum::{Router, response::Html, routing::get};
use tokio::net::TcpListener;
use tracing::info;

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    let app = Router::new().route("/", get(handler));

    let listener = TcpListener::bind((Ipv4Addr::UNSPECIFIED, 3131))
        .await
        .context("Failed to create tcp listener")?;

    info!("Server started at {}", listener.local_addr()?);

    axum::serve(listener, app)
        .await
        .context("Failed to start application")?;

    Ok(())
}

async fn handler() -> Html<&'static str> {
    Html("<h1>Hai from safepup :3</h1>")
}
