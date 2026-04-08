# WebAssembly Patterns

**Type:** knowledge
**Summary:** WebAssembly patterns with Rust covering wasm-bindgen, WasmGC, reference types, and performance optimization.
**Tags:** #wasm #rust #webassembly
**Status:** active
**Updated:** 2026-04-08
**Related:** []

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Advanced
> **Auto-Activation:** "wasm-bindgen", "rust wasm", "wasmgc", "reference types"
> **Tags:** [wasm, rust-wasm, webassembly, performance, rust]
> **Related:** [rust-axum], [leptos], [dioxus]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Compiling Rust to WebAssembly
- Using wasm-bindgen
- Optimizing WASM performance
- Working with WASM GC
- Implementing Rust in frontend

**Progressive Disclosure:**
1. **Metadata** → Core concepts
2. **Instructions** → Build patterns
3. **Resources** → Optimization

---

##  Quick Start

```bash
# Install WASM target
rustup target add wasm32-unknown-unknown

# Cargo.toml
[dependencies]
wasm-bindgen = "0.2"

[lib]
crate-type = ["cdylib", "rlib"]
```

---

##  Quick Reference

| Tool | Purpose | Command |
|------|---------|---------|
| **wasm-pack** | Build WASM packages | `wasm-pack build --target web` |
| **wasm-bindgen** | JS interop | `#[wasm_bindgen]` |
| **wasm-opt** | Optimize output | `wasm-opt -O3 -o output.wasm` |

---

##  Core Concepts

### Basic WASM Module

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}
```

### JavaScript Usage

```javascript
import init, { add } from './pkg/my_wasm.js';

async function run() {
  await init();
  const result = add(1, 2);
  console.log(result); // 3
}

run();
```

---

##  Implementation Patterns

### Pattern 1: Export Functions

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

// Complex types with Serde
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
pub struct User {
    id: u32,
    name: String,
}

#[wasm_bindgen]
pub fn create_user(id: u32, name: &str) -> JsValue {
    let user = User { id, name: name.to_string() };
    serde_wasm_bindgen::to_value(&user).unwrap()
}
```

### Pattern 2: Export Types

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Calculator {
    value: f64,
}

#[wasm_bindgen]
impl Calculator {
    #[wasm_bindgen(constructor)]
    pub fn new(value: f64) -> Self {
        Self { value }
    }

    #[wasm_bindgen]
    pub fn add(&mut self, value: f64) -> f64 {
        self.value += value;
        self.value
    }

    #[wasm_bindgen(getter)]
    pub fn value(&self) -> f64 {
        self.value
    }
}
```

### Pattern 3: Async Operations

```rust
use wasm_bindgen_futures::future_to_promise;

#[wasm_bindgen]
pub async fn fetch_data(url: &str) -> Result<JsValue, JsValue> {
    let response = reqwest::get(url).await.unwrap();
    Ok(serde_wasm_bindgen::to_value(&response.json::<serde_json::Value>().await.unwrap()).unwrap())
}
```

---

##  Quality Gates

### Validation Checklist

- [ ] No `std::println` (use console_log instead)
- [ ] Wasm size is optimized
- [ ] No panic paths in production
- [ ] JS interop tested
- [ ] Performance benchmarks pass

### Acceptance Criteria

- **Size:** WASM < 1MB unoptimized
- **Speed:** Performance > JS equivalent
- **Interop:** All exported functions callable from JS
- **Safety:** No unwraps, proper error handling

---

##  Troubleshooting

| Issue | Cause | Solution |
|-------|--------|----------|
| "cannot find function" | Not exported | Add `#[wasm_bindgen]` |
| "wasm file too large" | Debug build | Use `--release` |
| "panic in wasm" | unwrap() | Replace with proper error handling |
| "TypeError" | Type mismatch | Check Serde serialization |

---

##  Best Practices

### Optimize for Size

```toml
# .cargo/config.toml
[build]
target = "wasm32-unknown-unknown"

[target.wasm32-unknown-unknown]
rustflags = [
  "-C", "link-arg=-s",          # Strip symbols
  "-C", "link-arg=-z",          # Remove dead code
  "-C", "link-arg=--import-memory", # Import memory
]
```

### Use Wasm GC (Experimental)

```rust
#![feature(wasm_gc)]

// Enables garbage collection in WASM
pub struct Data {
    items: Vec<String>,
}
```

---

##  Advanced Topics

### Shared Memory

```rust
use wasm_bindgen::prelude::*;
use web_sys::{WebAssembly, Memory};

#[wasm_bindgen]
pub fn allocate_shared_memory() -> JsValue {
    let memory = Memory::new(1024).unwrap();
    JsValue::from(memory)
}
```

### SIMD (Single Instruction Multiple Data)

```rust
#![feature(target_feature_11)]
#![cfg_attr(target_arch = "wasm32", target_feature = "simd128"))`

use std::arch::wasm32::*;

#[wasm_bindgen]
pub fn process_bytes(data: &[u8]) -> Vec<u8> {
    // SIMD processing
    data.to_vec()
}
```

---

##  Related Skills

- **Prerequisite:** `rust-axum` - Rust knowledge
- **Related:** `leptos` - Rust WASM framework
- **Related:** `dioxus` - Rust WASM framework

---

##  Further Reading

- [Wasm Bindgen Guide](https://rustwasm.github.io/wasm-bindgen/)
- [Wasm Pack](https://rustwasm.github.io/wasm-pack/)
- [Rust and WebAssembly](https://rustwasm.github.io/)

---

##  Success Criteria

Implementation is complete when:
- [ ] WASM compiles without errors
- [ ] Size is < 1MB (gzip < 300KB)
- [ ] All exports callable from JS
- [ ] Performance benchmarked vs JS
- [ ] No console panics in production

---

*Version: 1.0.0 | WebAssembly Patterns*
