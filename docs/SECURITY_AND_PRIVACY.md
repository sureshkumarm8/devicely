# Security and privacy: what Devicely can and cannot see

Devicely controls real phones, so you should know exactly what it touches and what leaves your machine. This page describes how Devicely behaves. You can check every point yourself (see [Verify it yourself](#verify-it-yourself)).

## How it fits together

```
 Your browser                      Your computer                          Your devices
┌──────────────────────┐   HTTP   ┌──────────────────────────────┐  USB / Wi-Fi  ┌──────────────┐
│ devicely-ai.vercel.app│ ───────▶ │ devicely server              │ ────────────▶ │ Android: adb │
│ (static page only)    │ 127.0.0.1│ (Node.js, 127.0.0.1:3001)    │               │ iOS: WDA     │
└──────────────────────┘          └──────────────────────────────┘               └──────────────┘
                                            │ only if you choose a cloud AI provider
                                            ▼
                                   OpenAI / Gemini / Groq / Anthropic / GitHub Copilot
```

There is no Devicely cloud server. The hosted page is a static web app. Once it is loaded in your browser, it talks straight to the server on your own machine.

## What runs where

- **The server listens on `127.0.0.1` (loopback) by default**, so other machines on your network can't reach it. It binds to other interfaces only if you pass `--host` (or set `DEVICELY_HOST`), for example to use QR mobile connect from a phone on your Wi-Fi.
- **Only trusted web pages can call it.** Browser requests must come from `https://devicely-ai.vercel.app`, from `localhost` / `127.0.0.1`, or from an origin you add with `DEVICELY_ALLOWED_ORIGINS`. Requests with any other `Origin` are refused. Requests with an untrusted `Host` header are refused too, which blocks DNS-rebinding attacks.
- **Requests without a browser origin** (CLI, scripts) are accepted only from your own machine.
- **The agent API (`/api/v1`) and MCP over HTTP (`/mcp`) need a Bearer token** and accept connections only from your own machine. The token is a random 32-byte value stored in your Devicely data folder (`mcp-token`, folder mode `0700`). Show it with `devicely mcp token`; replace it with `devicely mcp token --rotate`.
- **AI agent settings** (the token, the agent policy and the audit log of agent actions) can only be read or changed from your own machine.

## What leaves your machine

| What | When | Where it goes |
| :--- | :--- | :--- |
| The web page itself, plus anonymous page views | Whenever you open the Command Center | Vercel (hosting and Vercel Web Analytics) |
| Anonymous setup events (fixed codes only) | **Only if you opt in** | Vercel Web Analytics, sent from your browser. Full list in [TELEMETRY.md](TELEMETRY.md) |
| Your plain-English command, plus a summary of the current screen | **Only if you use a cloud AI provider** for plain-English or voice commands | The provider you picked, under your own API key |
| Anything your AI agent asks for over MCP (screen elements, screenshots) | When you connect an agent such as Claude Code or Cursor | Your agent, and from there that agent's model provider |
| Nothing else | — | The local Devicely server has no telemetry code that sends data |

**What a cloud AI provider receives** with a plain-English command:
- the command you typed or spoke
- the names and platforms of the target devices
- the app in the foreground and the screen size
- up to 40 entries from your app list (app names and package or bundle IDs)
- up to 80 visible on-screen elements (their text label, element ID and position)

**Screenshots are not sent** to the AI provider. On-screen text can include personal data, though (names, messages, emails). If that matters, use **Ollama**: it runs locally, and no prompt or screen data leaves your machine.

## What is stored on your machine

Everything lives in one folder: `~/.devicely` by default, or `$DEVICELY_DATA_DIR` if you set it.

| Item | Notes |
| :--- | :--- |
| AI API keys | In `.env` inside the data folder, file mode `0600` (readable only by you). The Settings page shows them masked, and they are sent only to the provider they belong to. |
| MCP / agent token | `mcp-token`, inside a `0700` folder |
| Recordings, Flows, screenshots, logs | Local files only. Nothing is uploaded. |
| WebDriverAgent checkout (iOS) | `~/.devicely/WebDriverAgent`, or wherever `WDA_PATH` points |

`devicely doctor --bundle` writes a support bundle **to your disk** with home paths and IP addresses redacted. It never uploads anything; you decide whether to attach it to an issue.

## What Devicely puts on your devices

- **Android:** it uses ADB, which you enable with USB debugging. For element locators it installs the open-source Appium UIAutomator2 server (`io.appium.uiautomator2.server` and its test package), which you can uninstall like any other app. No root needed.
- **iOS / iPadOS:** it uses [WebDriverAgent](https://github.com/appium/WebDriverAgent), Appium's open-source test runner, signed with your own Apple ID. You can delete it from the device like any app. No jailbreak needed.
- To stop Devicely from reaching a device, turn off USB debugging (Android) or delete WebDriverAgent (iOS).

## Why Devicely is closed source

Devicely is free, and it's built by one person. Keeping the source closed protects that work while the product finds its feet. The npm package is obfuscated for the same reason. Obfuscation is not a security feature, and it doesn't hide any network calls. The table above lists everything that leaves your machine, and you can confirm it yourself.

## Verify it yourself

See which network connections the server has open:

```bash
lsof -i -P -n | grep -i node
```

You should see the server listening on `127.0.0.1:3001` and connections to your devices (and to your AI provider while a plain-English command is running). There should be no other outbound connections. A firewall like Little Snitch or LuLu will show the same thing over time.

## For teams and enterprises

- **Works offline with Ollama.** No account is needed and there's nothing to sign up for.
- `DO_NOT_TRACK=1` or `DEVICELY_TELEMETRY_DISABLED=1` turns off setup events. They're also off automatically in CI.
- The server stays on loopback unless you choose otherwise.
- Agents over HTTP need the token, and every MCP tool call is written to a local audit log (`logs/mcp-audit.jsonl` in the data folder).

## Reporting a vulnerability

Please email **devicelyai@gmail.com** and don't open a public issue. See [SECURITY.md](https://github.com/sureshkumarm8/Devicely/blob/main/SECURITY.md).
