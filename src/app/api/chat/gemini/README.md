# 🧠 AI Chat API (Gemini + Next.js)

Simple AI Chat API built with **Next.js App Router** and **Google Gemini**, designed for personal websites and public demos with built-in **rate limiting & abuse protection**.

---

## ✨ Features

* 🚀 Next.js App Router API (`/app/api`)
* 🤖 Google Gemini (`gemini-2.5-flash-lite`)
* 🎭 Persona-based system prompt
* 🔒 Built-in rate limiting (Redis / Upstash)
* 🛡️ Anti-spam & abuse protection
* 💸 Token & cost control (input limits)

---

## 📁 API Endpoint

```
POST /api/chat/gemini
```

This endpoint acts as a **server-side proxy** to Google Gemini’s text generation API.

---

## 📦 Request Format

### Headers

```http
Content-Type: application/json
```

### Body

```json
{
  "persona": "radya",
  "history": [
    {
      "role": "user",
      "text": "Halo, jelasin Next.js dong"
    }
  ]
}
```

### Parameters

| Field            | Type   | Required | Description                     |
| ---------------- | ------ | -------- | ------------------------------- |
| `persona`        | string | ❌        | Persona name (default: `radya`) |
| `history`        | array  | ✅        | Chat history messages           |
| `history[].role` | string | ✅        | `"user"` or `"model"`           |
| `history[].text` | string | ✅        | Message content                 |

---

## 📤 Response Format

### Success (`200 OK`)

```json
{
  "text": "Next.js adalah framework React yang..."
}
```

### Error Examples

| Status | Description                             |
| ------ | --------------------------------------- |
| `400`  | Invalid request format                  |
| `413`  | Input too large / conversation too long |
| `429`  | Rate limit exceeded                     |
| `500`  | AI service error                        |

---

## 🧪 Example Usage (Frontend Fetch)

### Basic Fetch Example

```js
const response = await fetch('/api/chat/gemini', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    persona: 'radya',
    history: [
      { role: 'user', text: 'Halo, jelasin Next.js dong' },
    ],
  }),
});

const data = await response.json();
console.log(data.text);
```

### Example with Chat State

```js
const history = [
  { role: 'user', text: 'Apa itu API?' },
  { role: 'model', text: 'API adalah...' },
];

const res = await fetch('/api/chat/gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ persona: 'radya', history }),
});

const { text } = await res.json();

history.push({ role: 'model', text });
```

---

## ⏱️ Rate Limiting

This API is protected using **Redis-based rate limiting (Upstash)**.

### Current Policy

* **5 requests per 10 seconds**
* **Per client fingerprint**

  * IP address
  * User-Agent
* Rate limit is applied **before** calling Gemini (no token cost)

### Example Error

```json
{
  "error": "Too many requests. Please slow down."
}
```

---

## 🛡️ Abuse & Cost Protection

Additional safeguards are implemented:

* 🔢 Max messages per request: **20**
* 🧾 Max total input size: **8,000 characters**
* 🚫 Requests exceeding limits are rejected
* 🔐 API key never exposed to client

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

⚠️ **Do NOT use `NEXT_PUBLIC_` for these variables**
⚠️ **Never commit `.env.local` to GitHub**

---

## 🧩 Tech Stack

* **Next.js** (App Router)
* **Google Gemini SDK**
* **Upstash Redis**
* **TypeScript / JavaScript**

---

## 🚧 Intended Usage

This API is intended for:

* Personal websites
* Portfolio projects
* Public AI demos
* Learning & experimentation

Not designed for:

* High-scale production apps
* Commercial multi-user systems
* Heavy concurrent traffic

---

## 📜 License & Disclaimer

This project is for **educational and personal use**.
Use responsibly and monitor your AI usage and costs.