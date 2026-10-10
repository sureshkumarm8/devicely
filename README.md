<div align="center">

# Devicely

### Tap once. Every iPhone, iPad and Android follows.

Control a fleet of real iOS and Android devices from one screen — by hand, by voice, or through AI agents over MCP. Runs locally on your machine, against your own devices.

[![npm version](https://img.shields.io/npm/v/devicely?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/devicely)
[![npm downloads](https://img.shields.io/npm/dm/devicely?style=for-the-badge&color=CB3837)](https://www.npmjs.com/package/devicely)
[![Platforms](https://img.shields.io/badge/devices-iOS%20%7C%20iPadOS%20%7C%20Android-lightgrey?style=for-the-badge)](#supported-platforms)
[![MCP](https://img.shields.io/badge/MCP-30%20tools-8A2BE2?style=for-the-badge)](#for-ai-agents-mcp-server)
[![License](https://img.shields.io/badge/license-free%20%7C%20closed%20source-blue?style=for-the-badge)](#license)

<img src="https://raw.githubusercontent.com/sureshkumarm8/Devicely/main/DevicelyDemo.gif" alt="One tap on the commander device is mirrored on every follower device" width="900">

[Quick start](#quick-start) · [For QA teams](#for-qa-teams) · [For AI agents](#for-ai-agents-mcp-server) · [CLI](#cli-reference) · [Supported platforms](#supported-platforms) · [Privacy](#privacy-and-security)

</div>

---

## Quick start

```bash
npm install -g devicely
devicely doctor      # checks Node, adb, Xcode and device drivers
devicely start       # starts Devicely and opens the Command Center
```

The Command Center opens at **[devicely-ai.vercel.app](https://devicely-ai.vercel.app)**. Plug in a device over USB, or click **Connect via QR** to pair one over Wi-Fi.

**No phone handy?** Boot an Android emulator or iOS simulator with the server:

```bash
devicely emulators list            # shows installed AVDs and simulators
devicely start --launch <name>     # starts Devicely and boots that virtual device
```

**Requirements:** Node.js 18+ on macOS or Linux. Android needs `adb` (platform-tools) on your `PATH`. iOS and iPadOS devices need a Mac with Xcode — see [iOS setup](#ios-setup).

---

## Why Devicely

Testing one flow on ten devices usually means doing it ten times by hand, renting cloud devices by the minute, or maintaining per-device scripts. Devicely takes a different approach: **you drive one device, and the rest of your fleet does the same thing at the same moment.**

| | Devicely | Cloud device labs | Script frameworks (Appium, Maestro, Detox) | Screen mirroring (scrcpy, Vysor) |
| :--- | :---: | :---: | :---: | :---: |
| Live 1-to-many gestures (one tap → every device) | ✅ | ❌ | ❌ | ❌ |
| iOS and Android mixed in one live session | ✅ | ❌ | ❌ | ❌ |
| Uses your own devices, on your own machine | ✅ | ❌ | ✅ | ✅ |
| No code needed (UI, voice, plain English) | ✅ | Partial | ❌ | ✅ (one device) |
| Built-in MCP server for AI agents | ✅ | Varies | Varies | ❌ |
| Exports locators to test code | ✅ | — | ✅ | ❌ |

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
- **Full-screen mirror** with zoom and fit-to-window, and a **D-pad** for directional scrolling and swiping.

### Recordings that survive UI changes

- **Steps are recorded as locators** (`accessibilityId`, `resourceId`, text, type, bounds), not raw coordinates.
- **Auto-wait**: on replay, each step waits up to 10 s for its element to appear, so animations and slow networks don't break the run.
- **Coordinate fallback**: if an element can't be found, Devicely taps its scaled position instead and marks the step `fallback`, so you can see what drifted.
- **Replay on one device or the whole fleet in parallel.**
- **Manage recordings** in a list or grid view with search and tag filters. A details drawer shows each step's locator, timing and result; the editor lets you add, edit, reorder and delete steps.

### Plain English and voice

Type or say *"launch settings, scroll down, open camera"*. Devicely turns it into the right action for each platform — for example `com.apple.Preferences` on iOS and `com.android.settings` on Android — and runs it on every selected device at once. Voice input waits for a 2-second pause before it runs, so you can speak naturally.

Choose your AI provider in **Settings → AI Config**:

| Provider | Notes |
| :--- | :--- |
| **Ollama** | Runs locally. No API key, and no prompt leaves your machine. |
| **Google Gemini**, **Groq**, **Cohere** | Offer free tiers — the easiest way to start. |
| **OpenAI**, **Anthropic Claude**, **Mistral AI** | Bring your own API key. |
| **GitHub Copilot** | Uses your Copilot subscription. |

Each provider lists its current models in the settings screen.

### Quick actions, inspector and code export

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
| **Fleet and flows** | `devicely_commander`, `devicely_run_commands`, `devicely_run_natural_language` |
| **Virtual devices** | `devicely_launch_virtual_device`, `devicely_stop_virtual_device` |
| **Recordings** | `devicely_save_recording`, `devicely_list_recordings`, `devicely_replay_recording` |

**Prompts** for common jobs: `smoke_test`, `reproduce_bug` and `write_test`.
**Resources** with live context: `devicely://devices`, `devicely://apps`, `devicely://docs/command-language` and `devicely://docs/agent-guide`.

### Safety controls

Set these in **Settings → AI Agents** (stored in `~/.devicely/mcp.json`):

- **Destructive tools are off by default**: `install_app`, `uninstall_app`, `restart_device`, `set_passcode` and `stop_virtual_device`. When enabled, they can also require confirmation.
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
| `devicely start` | Start the server and open the Command Center |
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

Example commands for `exec`:

```bash
devicely exec "launch settings"
devicely exec "launch settings scroll down launch camera"
devicely exec "open url https://github.com" -d "Pixel 8"
```

---

## Supported platforms

| | Supported |
| :--- | :--- |
| **Host machine** | macOS and Linux, Node.js 18+. Windows isn't supported yet. |
| **Android** | Phones, tablets and emulators via ADB and UIAutomator2. Wireless debugging needs Android 11+. |
| **iOS / iPadOS** | iPhones, iPads and simulators via WebDriverAgent. Needs a Mac with Xcode. iOS 16+ also requires Developer Mode. |

### iOS setup

Physical iOS devices are controlled through WebDriverAgent, which must be signed with your Apple ID or developer team before it can run on a device. Run `devicely doctor` and follow the in-app setup guide; it walks you through installing the iOS tools, enabling Developer Mode and trusting the computer. Android devices and iOS simulators don't need signing.

---

## Privacy and security

- **Runs locally.** The Devicely server runs on your machine and talks to your devices directly. Your apps, screenshots and test data aren't uploaded anywhere.
- **Local AI is an option.** Use Ollama to keep prompts and screen data on your machine. With a cloud AI provider, your commands go to that provider under your own API key.
- **API keys stay on your machine.**
- **Agents need a token.** MCP over HTTP and the REST API require a 32-byte Bearer token.
- **Analytics:** the local server sends no telemetry. The hosted dashboard at [devicely-ai.vercel.app](https://devicely-ai.vercel.app) uses anonymous Vercel page analytics; it connects to your local server and doesn't send device data to Vercel.

---

## What's new in 2.3.4

- **Recordings, rebuilt**: locator-based steps, 10 s auto-wait, coordinate fallback, list and grid views, a details drawer and a step editor.
- **MCP server and REST API**: 30 tools, prompts and resources, stdio and Streamable HTTP transports, safety policy and an audit log, plus one-command setup for six AI clients.
- **Faster iOS mirroring** with WebDriverAgent MJPEG streaming and a dedicated WDA port per device.
- **Device health monitoring and auto-reconnect.**
- **Virtual devices**: Android emulators and iOS simulators from the UI, CLI and MCP.
- **Passcode tool**: sets a PIN on Android over ADB and gives guided steps on iOS.

---

## License

**Free to use. Closed source.** Devicely is free to install and use. The source code is proprietary: you may not copy, modify or redistribute it. See [LICENSE](https://github.com/sureshkumarm8/Devicely/blob/main/LICENSE).

- **Questions and enterprise inquiries:** [devicelyai@gmail.com](mailto:devicelyai@gmail.com)
- **Report an issue:** [github.com/sureshkumarm8/Devicely/issues](https://github.com/sureshkumarm8/Devicely/issues)

<div align="center">

**If Devicely saves you time, [star it on GitHub](https://github.com/sureshkumarm8/Devicely).**

</div>
