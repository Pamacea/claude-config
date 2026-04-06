# Rust + Axum Patterns

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Advanced
> **Auto-Activation:** "axum handler", "tokio spawn", "rust ownership", "rust async"
> **Tags:** [rust, axum, tokio, async, ownership, types]
> **Related:** [nestjs-patterns], [wasm-rust]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Building Axum web servers
- Working with Tokio async runtime
- Managing Rust ownership
- Implementing middleware
- Handling database connections

**Progressive Disclosure:**
1. **Metadata** → Core concepts
2. **Instructions** → Common patterns
3. **Resources** → Advanced features

---

##  Quick Start

```bash
# Cargo.toml
[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["full"] }
serde = { version = "1", features = ["derive"] }
tower = "0.4"
```

---

##  Quick Reference

| Concept | Pattern | Use Case |
|---------|---------|----------|
| **Handlers** | `async fn handler()` | Route handlers |
| **Extractors** | `State<T>`, `Path<T>` | Request data |
| **Middleware** | `tower::Service` | Request/response processing |
| **Error** | `Result<T, E>` | Error handling |

---

##  Core Concepts

### Basic Handler

```rust
use axum::{
    routing::get,
    Router,
    Json,
};

async fn hello() -> &'static str {
    "Hello, World!"
}

let app = Router::new().route("/hello", get(hello));
```

### State Management

```rust
use axum::extract::State;

#[derive(Clone)]
struct AppState {
    db: PgPool,
}

async fn handler(
    State(state): State<AppState>,
) -> Result<String, Error> {
    // Use state.db
    Ok("Hello".to_string())
}
```

---

##  Implementation Patterns

### Pattern 1: JSON Handler with Validation

```rust
use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Deserialize, Validate)]
struct CreateUser {
    #[validate(length(min = 3))]
    name: String,
    #[validate(email)]
    email: String,
}

async fn create_user(
    Valid(payload): Valid<CreateUser>,
) -> Json<User> {
    let user = User::create(payload).await;
    Json(user)
}
```

### Pattern 2: Error Handling

```rust
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};

#[derive(Debug)]
enum AppError {
    NotFound(String),
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AppError::NotFound(msg) => (StatusCode::NOT_FOUND, msg),
            AppError::Internal(msg) => (StatusCode::INTERNAL_SERVER_ERROR, msg),
        };
        (status, message).into_response()
    }
}
```

### Pattern 3: Middleware with Tower

```rust
use tower_http::trace::TraceLayer;
use tower::ServiceBuilder;

let app = Router::new()
    .route("/", get(handler))
    .layer(
        ServiceBuilder::new()
            .layer(TraceLayer::new_for_http())
            .layer(CorsLayer::permissive())
    );
```

---

##  Quality Gates

### Validation Checklist

- [ ] All handlers return `Result<T, E>`
- [ ] Error types implement `IntoResponse`
- [ ] Database connections use connection pooling
- [ ] Async uses `tokio::spawn` for parallelism
- [ ] Ownership properly managed

### Acceptance Criteria

- **Safety:** No unsafe unless necessary
- **Performance:** Uses async efficiently
- **Error Handling:** All errors properly propagated
- **Type Safety:** Full type coverage

---

##  Troubleshooting

| Symptom | Root Cause | Solution |
|---------|-----------|----------|
| "Borrow checker error" | Ownership conflict | Clone, use Arc, or redesign |
| "Future not Send" | !Send type | Use `tokio::spawn` with `Send` bound |
| "Handler doesn't implement Service" | Missing function signature | Check handler signature |
| "State not found" | Not added to router | Use `.with_state(state)` |

---

##  Best Practices

### Database with sqlx

```rust
use sqlx::PgPool;

struct AppState {
    db: PgPool,
}

impl AppState {
    async fn new() -> Result<Self, sqlx::Error> {
        let db = PgPool::connect(&dotenv!("DATABASE_URL")).await?;
        Ok(Self { db })
    }
}
```

### Extractors for Auth

```rust
use axum::{
    extract::Request,
    http::HeaderMap,
};

async fn auth_handler(
    headers: HeaderMap,
) -> Result<String, AppError> {
    let token = headers
        .get("authorization")
        .ok_or(AppError::Unauthorized)?;
    // Validate token
    Ok("User".to_string())
}
```

---

##  Advanced Topics

### SSE (Server-Sent Events)

```rust
use axum::{
    response::{sse::{Event, Sse},
    body::Body,
};

async fn sse_handler() -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    let stream = async_stream::interval(Duration::from_secs(1))
        .map(|_| Ok(Event::default().data("ping")));
    Sse::new(stream).keep_alive(
        axum::response::sse::KeepAlive::new()
            .interval(Duration::from_secs(10)),
    )
}
```

### WebSocket

```rust
use axum::{
    extract::{
        ws::{WebSocket, WebSocketUpgrade},
    },
    response::IntoResponse,
};

async fn ws_handler(
    ws: WebSocketUpgrade,
) -> impl IntoResponse {
    ws.on_upgrade(|socket| handle_socket(socket))
}

async fn handle_socket(mut socket: WebSocket) {
    while let Some(Ok(msg)) = socket.recv().await {
        match msg {
            Message::Text(text) => socket.send(Message::Text(text)).await.unwrap(),
            _ => {}
        }
    }
}
```

---

##  Related Skills

- **Alternative:** `nestjs-patterns` - Node.js backend
- **Related:** `wasm-rust` - Rust for frontend
- **Complementary:** `rust-workspace-structure` - Project organization

---

##  Further Reading

- [Axum Documentation](https://docs.rs/axum/)
- [Tokio Documentation](https://tokio.rs/)
- [Rust Book](https://doc.rust-lang.org/book/)

---

##  Success Criteria

Implementation is complete when:
- [ ] Compiles without warnings
- [ ] Handlers use proper async/await
- [ ] Error handling covers all cases
- [ ] Database uses prepared statements
- [ ] Tests cover main paths

---

*Version: 1.0.0 | Rust + Axum Patterns*
