<div align="center">

# Devicely

### Tap once. Every iPhone, iPad and Android follows.

Control a fleet of real iOS and Android devices from one screen — by hand, in plain English, or through AI agents over MCP. Save what you do as a **Flow** and replay it on every device, no code required. Runs locally on your machine, against your own devices.

[![npm version](https://img.shields.io/npm/v/devicely?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/devicely)
[![npm downloads](https://img.shields.io/npm/dm/devicely?style=for-the-badge&color=CB3837)](https://www.npmjs.com/package/devicely)
[![Platforms](https://img.shields.io/badge/devices-iOS%20%7C%20iPadOS%20%7C%20Android-lightgrey?style=for-the-badge)](#supported-platforms)
[![MCP](https://img.shields.io/badge/MCP-30%20tools-8A2BE2?style=for-the-badge)](#for-ai-agents-mcp-server)
[![License](https://img.shields.io/badge/license-free%20%7C%20closed%20source-blue?style=for-the-badge)](#license)

<img src="https://raw.githubusercontent.com/sureshkumarm8/Devicely/main/DevicelyDemo.gif" alt="One tap on the commander device is mirrored on every follower device" width="900">

[Quick start](#quick-start) · [For QA teams](#for-qa-teams) · [Flows](#flows--no-code-automation) · [For AI agents](#for-ai-agents-mcp-server) · [CLI](#cli-reference) · [Supported platforms](#supported-platforms) · [Privacy](#privacy-and-security)

</div>

---

## Quick start

```bash
npm install -g devicely
devicely doctor      # checks Node, adb, Xcode and device drivers
devicely start       # starts Devicely and opens the Command Center
```

The Command Center opens at **[devicely-ai.vercel.app](https://devicely-ai.vercel.app)**. Plug in a device over USB, or connect Android devices wirelessly with `devicely wifi connect <ip:port>`.

**No phone handy?** Boot an Android emulator or iOS simulator with the server:

```bash
devicely emulators list            # shows installed AVDs and simulators
devicely start --launch <name>     # starts Devicely and boots that virtual device
```

**Requirements:** Node.js 20.9+ on macOS or Linux. Android needs `adb` (platform-tools) on your `PATH`. iOS and iPadOS devices need a Mac with Xcode — see [iOS setup](#ios-setup).

---

## Why Devicely

Testing one flow on ten devices usually means doing it ten times by hand, renting cloud devices by the minute, or maintaining per-device scripts. Devicely takes a different approach: **you drive one device, and the rest of your fleet does the same thing at the same moment.**

| | Devicely | Cloud device labs | Script frameworks (Appium, Maestro, Detox) | Screen mirroring (scrcpy, Vysor) |
| :--- | :---: | :---: | :---: | :---: |
| Live 1-to-many gestures (one tap → every device) | ✅ | ❌ | ❌ | ❌ |
| iOS and Android mixed in one live session | ✅ | ❌ | ❌ | ❌ |
| Uses your own devices, on your own machine | ✅ | ❌ | ✅ | ✅ |
| No code needed (UI, voice, plain English) | ✅ | Partial | ❌ | ✅ (one device) |
| Record once as a Flow, replay on every device | ✅ | Partial | ❌ (you write code) | ❌ |
| Built-in MCP server for AI agents | ✅ | Varies | Varies | ❌ |
| Exports Flows and locators to test code | ✅ | — | ✅ | ❌ |

Devicely doesn't replace your test framework. It shortens the slow parts around it: exploring, reproducing bugs across devices, smoke-testing builds, and finding the locators you'll put in your tests.

---

## For QA teams

### Commander Mode — one-to-many control

- **Live mirror of the commander device**, with every follower shown alongside it.
- **Every gesture is broadcast**: tap, long-press, swipe (speed preserved) and typed text go to all followers at once.
- **Element-aware, not pixel-blind.** Followers find the element the commander touched — by accessibility ID, label, type and position in the UI tree — so a tap on an iPhone hits the same button on an iPad or a Pixel, even when the layouts differ.
- **Swap the commander** from a dropdown on the mirror, without restarting the session.
- **Include or exclude individual followers** with one click.
- **Fast iOS mirroring** over WebDriverAgent MJPEG: about 170 KB per frame, compared with about 5.8 MB for a screenshot poll. Each iOS device gets its own WDA port, so several iPhones don't collide.
- **Real-device feel**: a fingertip cursor and a ripple where you touch, on the commander only.
- **Swipe controls in the action bar** go to every targeted device at once.
- **Immersive full screen**, with the command bar overlaid at the bottom so you never leave the mirror.

### Flows — no-code automation

Do it once by hand; Devicely saves it as a **Flow** you can replay on one device or the whole fleet, and export as test code when you're ready.

- **Steps are recorded as locators** (`accessibilityId`, `resourceId`, text, type, bounds), not raw coordinates.
- **Auto-wait**: on replay, each step waits up to 10 s for its element to appear, so animations and slow networks don't break the run.
- **Coordinate fallback**: if an element can't be found, Devicely taps its scaled position instead and marks the step `fallback`, so you can see what drifted.
- **Replay on one device or the whole fleet in parallel.**
- **Export a Flow** to **Maestro**, **Appium** (Python or Java) or **WebdriverIO**, ready for CI with no AI involved.
- **Manage Flows** in a list or grid view with search and tag filters. A details drawer shows each step's locator, timing and result; the editor lets you add, edit, reorder and delete steps.

### Plain English and voice

Type or say *"launch settings, scroll down, open camera"*. Devicely turns it into the right action for each platform — for example `com.apple.Preferences` on iOS and `com.android.settings` on Android — and runs it on every selected device at once. Voice input waits for a 2-second pause before it runs, so you can speak naturally.

- **Grounded in the real screen.** Before planning, the AI reads what's on the device, so it taps buttons that are actually there instead of guessing.
- **Review before it runs.** The plan appears as a card you can check, edit or cancel. Turn review off from the command palette (⌘K) once you trust it.
- **Safe by default.** An AI plan stops at the first failed step, and waits for each element to appear rather than relying on fixed delays.

Choose your AI provider in **Settings → AI Config**, and use **Test connection** to check the key and model with a real request:

| Provider | Notes |
| :--- | :--- |
| **Ollama** | Runs locally. No API key, and no prompt leaves your machine. |
| **Google Gemini**, **Groq** | Offer free tiers — the easiest way to start. |
| **OpenAI**, **Anthropic Claude** | Bring your own API key. |
| **GitHub Copilot** | Uses your Copilot subscription. |

Each provider lists its current models in the settings screen. Devicely uses only the provider you choose; it never falls back to another one behind your back.

### Quick actions, inspector and code export

- **Command palette (⌘K)**: run any action, pick target devices, switch the commander or jump anywhere, by typing a few letters.
- **Quick Actions panel**: send text, tap an element by name or `x,y`, and launch apps with autocomplete. Arrow keys cycle through what you typed before.
- **UI Inspector**: hover over any element to see its accessibility ID, resource ID, XPath and bounds.
- **One-click export** of a selector as a Devicely command, **WebdriverIO**, **Appium Python** or **Appium Java** code.

### Devices that stay connected

- **QR enrollment**: scan a code from the Command Center to pair a device over Wi-Fi — no IP addresses to type.
- **Health monitoring** spots an unplugged cable, a reboot or a driver failure within seconds and cleans up the session.
- **Auto-reconnect** brings a device back as soon as it reappears on USB or Wi-Fi. It's on by default; set `DEVICELY_AUTO_RECONNECT=0` to turn it off.
- **Virtual devices**: start and stop Android emulators and iOS simulators from the UI or the CLI, next to your physical devices.

---

## For AI agents (MCP server)

Devicely includes a [Model Context Protocol](https://modelcontextprotocol.io) server, so coding agents can see and control real devices.

**Your agent is the brain; Devicely is the hands.** Over MCP, Devicely doesn't call any AI of its own: your agent reads the screen, decides, acts and checks the result. No second model, no extra API key, and nothing to configure in Devicely's AI settings.

```bash
devicely mcp install claude-code      # prints the `claude mcp add` command to run
devicely mcp install cursor           # also: vscode, windsurf, gemini, claude-desktop
devicely mcp doctor                   # checks the backend, token and transports
```

Or add it to Claude Code by hand:

```bash
claude mcp add devicely -- npx -y devicely mcp
```

Two transports are available: **stdio** (`devicely mcp`, which starts the backend if it isn't running) and **Streamable HTTP**, protected by a Bearer token. Run `devicely mcp doctor` to see the HTTP endpoint.

### 30 tools

| Group | Tools |
| :--- | :--- |
| **Observe** | `devicely_snapshot`, `devicely_find_elements`, `devicely_wait_for`, `devicely_get_device_logs`, `devicely_get_action_log` |
| **Act** | `devicely_tap`, `devicely_long_press`, `devicely_swipe`, `devicely_type_text`, `devicely_press_key`, `devicely_open_url` |
| **Apps** | `devicely_launch_app`, `devicely_close_app`, `devicely_list_apps`, `devicely_install_app`, `devicely_uninstall_app` |
| **Devices** | `devicely_list_devices`, `devicely_connect_device`, `devicely_disconnect_device`, `devicely_restart_device`, `devicely_set_passcode`, `devicely_doctor` |
| **Fleet and flows** | `devicely_commander`, `devicely_run_commands`, `devicely_export_test` |
| **Virtual devices** | `devicely_launch_virtual_device`, `devicely_stop_virtual_device` |
| **Flows** | `devicely_save_recording`, `devicely_list_recordings`, `devicely_replay_recording` |

**Prompts** for common jobs: `smoke_test`, `reproduce_bug` and `write_test`.
**Resources** with live context: `devicely://devices`, `devicely://apps`, `devicely://docs/command-language` and `devicely://docs/agent-guide`.

### Safety controls

Set these in **Settings → AI Agents** (stored in `~/.devicely/mcp.json`):

- **Destructive tools are off by default**: `install_app`, `uninstall_app`, `restart_device` and `stop_virtual_device`. When enabled, they can also require confirmation. `set_passcode` is allowed by default; add it to `disabledTools` in `~/.devicely/mcp.json` to block it.
- **Limit agents to specific devices** (`allowedDevices`), turn off individual tools, and redact sensitive values from output.
- **Every agent action is logged** to an audit trail.

### REST API

The same capabilities are available over HTTP at `/api/v1`, using the same Bearer token — useful for CI pipelines and custom harnesses. View or rotate the token with `devicely mcp token [--rotate]`; it's saved in `~/.devicely/mcp-token`.

### Example

> *"Take a snapshot of the Pixel, check that the Login button is visible, tap it, and confirm the welcome screen appears."*

The agent calls `devicely_snapshot` and `devicely_find_elements`, taps with `devicely_tap`, and checks the result with `devicely_wait_for`.

---

## CLI reference

| Command | What it does |
| :--- | :--- |
| `devicely start` | Start the server (binds to loopback `127.0.0.1`) and open Command Center |
| `devicely start --host <addr>` | Bind to a specific interface (e.g. `--host 0.0.0.0` for LAN access) |
| `devicely start -p <port> --no-browser` | Use a custom port without opening a browser (CI, headless machines) |
| `devicely start --usb-only` / `--wifi-only` | Only detect devices on USB, or only on Wi-Fi |
| `devicely start --launch <name>` | Boot a virtual device when the server starts |
| `devicely start --debug` | Turn on debug logging |
| `devicely list [--verbose]` | List connected iOS and Android devices |
| `devicely exec "<command>" [-d <name>]` | Run a command on all devices, or on one with `-d` |
| `devicely doctor` | Check Node, adb, Xcode and driver setup |
| `devicely emulators list` | List Android emulators and iOS simulators (alias: `devicely virtual`) |
| `devicely emulators start <name> [--headless]` | Boot a virtual device |
| `devicely emulators stop <name>` | Shut down a virtual device |
| `devicely mcp [--url <url>] [--no-autostart]` | Run the MCP stdio server |
| `devicely mcp doctor` | Check MCP readiness |
| `devicely mcp token [--rotate]` | Show or rotate the agent token |
| `devicely mcp install <client>` | Configure `claude-code`, `claude-desktop`, `cursor`, `vscode`, `windsurf` or `gemini` |

### Canonical Command Set (DSL)

Devicely executes a deterministic, multi-line or semicolon-separated Command DSL across iOS and Android:

| Verb | Syntax | Platforms | Description |
| :--- | :--- | :--- | :--- |
| `launch` | `launch <app\|package>` | iOS, Android | Launch an application by preset name or bundle/package ID |
| `kill` | `kill <app\|package>` | iOS, Android | Force-stop/terminate an application |
| `click` | `click <text\|x,y>` | iOS, Android | Tap an element by text, accessibility ID, or coordinate pair |
| `longpress` | `longpress <text\|x,y>` | iOS, Android | Long-press an element or coordinate |
| `swipe` | `swipe <up\|down\|left\|right>` | iOS, Android | Physical finger gesture (Note: *scroll down* maps to *swipe up*) |
| `type` | `type <text>` | iOS, Android | Type text into the currently focused input field |
| `enter` | `enter` | Android | Press Enter / Submit key (on iOS, `type` presses Return for you) |
| `home` | `home` | iOS, Android | Navigate to home screen |
| `back` | `back` | iOS, Android | Navigate back |
| `screenshot` | `screenshot` | iOS, Android | Capture device screen |
| `lock` / `unlock` | `lock`, `unlock` | iOS, Android | Lock or wake/unlock device screen |
| `url` | `url <https://...>` | iOS, Android | Open a URL in default browser |
| `WAIT` | `WAIT <ms>` | iOS, Android | Pause execution for specified milliseconds |
| `notifications` | `notifications` | iOS, Android | Open Notification Center / the notification shade |
| `quicksettings` | `quicksettings` | iOS, Android | Open Control Center / quick settings |
| `recent` | `recent` | iOS, Android | Open the app switcher |
| `rotate` | `rotate` | iOS | Rotate the screen |
| `volume` | `volume <up\|down>` | Android | Change the volume |
| `getLocators` | `getLocators` | Android | Dump current screen UI accessibility tree |
| `install` / `clear` | `install <apk>`, `clear <package>` | Android | Install an APK, or clear an app's data |
| `uninstall` | `uninstall <app\|package>` | iOS, Android | Remove an application |
| `restart` / `shutdown` | `restart`, `shutdown` | iOS, Android | Reboot or power off the device |

Example commands for `exec`:

```bash
devicely exec "launch settings"
devicely exec "launch settings; swipe up; launch camera"
devicely exec "url https://github.com" -d "Pixel 8"
```

---

## Supported platforms

| | Supported |
| :--- | :--- |
| **Host machine** | macOS and Linux, Node.js 20.9+. Windows isn't supported yet. |
| **Android** | Phones, tablets and emulators via ADB and UIAutomator2. Wireless debugging needs Android 11+. |
| **iOS / iPadOS** | iPhones, iPads and simulators via WebDriverAgent. Needs a Mac with Xcode. iOS 16+ also requires Developer Mode. |

### iOS setup

Physical iOS devices are controlled through WebDriverAgent, which must be signed with your Apple ID or developer team before it can run on a device. Run `devicely doctor` and follow the in-app setup guide; it walks you through installing the iOS tools, enabling Developer Mode and trusting the computer. Android devices and iOS simulators don't need signing.

---

## Privacy and security

- **Runs locally.** The Devicely server runs on your machine and talks to your devices directly. Your apps, screenshots and test data aren't uploaded anywhere.
- **Loopback binding by default.** The server binds to `127.0.0.1` by default, protecting your host machine from unintended local network exposure.
- **Origin & Host guard.** Requests to the REST API and WebSocket endpoints are guarded against untrusted Host and Origin headers, protecting against DNS rebinding and cross-origin attacks.
- **Local AI is an option.** Use Ollama to keep prompts and screen data on your machine. With a cloud AI provider, your commands go to that provider under your own API key.
- **API keys stay on your machine.** Configuration files containing tokens or keys are stored locally with restrictive filesystem permissions (`0600`).
- **Agents need a token.** MCP over HTTP and the REST API require a 32-byte Bearer token.
- **Analytics:** the local server sends no telemetry. The hosted dashboard at [devicely-ai.vercel.app](https://devicely-ai.vercel.app) uses anonymous Vercel page analytics; it connects to your local server and doesn't send device data to Vercel.

---

## What's new in 2.4.0

- **Flows**: Recordings are now Flows — record once, replay on every device, export to Maestro, Appium or WebdriverIO.
- **Grounded AI commands**: the AI reads the screen before planning, shows the plan for review, stops at the first failed step and waits for elements instead of fixed delays.
- **A redesigned Command Center**: compact command bar, ⌘K command palette, fleet-wide swipe controls, immersive full screen and real-device touch feedback.
- **MCP, simplified**: your agent plans every step itself; Devicely no longer calls its own AI over MCP.
- **AI providers**: latest Gemini and Groq models, a real Test connection, no silent fallback. Cohere and Mistral were removed.
- **iOS 26 fixes**: lock and unlock work again, plus iOS tunnel support for newer versions.
- **Security**: all known dependency vulnerabilities fixed. **Node.js 20.9 or later is now required.**

---

## License

**Free to use. Closed source.** Devicely is free to install and use, for yourself or inside your company. The software is proprietary: you may not copy, modify, reverse engineer or redistribute it, offer it as a hosted service, or use it to train AI models. See the [Devicely Free Use License](https://github.com/sureshkumarm8/Devicely/blob/main/LICENSE).

- **Questions and enterprise inquiries:** [devicelyai@gmail.com](mailto:devicelyai@gmail.com)
- **Report an issue:** [github.com/sureshkumarm8/Devicely/issues](https://github.com/sureshkumarm8/Devicely/issues)

<div align="center">

**If Devicely saves you time, [star it on GitHub](https://github.com/sureshkumarm8/Devicely).**

</div>
