# Troubleshooting

Start with:

```bash
devicely doctor
```

It groups checks by platform, marks each ✓ / ! / ✗, and prints the command that fixes each ✗. `devicely doctor --json` gives the same result as JSON.

Device-specific problems have their own guides, with a section per error code shown in the app:

- **Android:** [ANDROID_FIRST_DEVICE.md](ANDROID_FIRST_DEVICE.md): Developer options per brand, `unauthorized`, `offline`, Linux `no permissions`, adb versions, Wi-Fi pairing.
- **iPhone / iPad:** [IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#connect-errors): WebDriverAgent, signing with a free or paid Apple ID, Developer Mode, trust.

---

## Install and start

### `devicely: command not found`

The npm global `bin` folder isn't on your `PATH`. Run `npm prefix -g` and add its `bin` subfolder to `PATH`, or run `npx devicely start`.

### `EBADENGINE` or Devicely won't start on an old Node

Devicely needs **Node.js 20.9 or later** (`node --version`). Install a current LTS from [nodejs.org](https://nodejs.org) or with your version manager.

### `EBADPLATFORM` on Windows

Devicely supports macOS and Linux. Windows isn't supported yet.

### Port already in use (`EADDRINUSE`)

Another program (or another Devicely) is using port 3001. Start on another port:

```bash
devicely start -p 3002
```

On a non-default port, `devicely start` prints the full Command Center link, for example `https://devicely-ai.vercel.app/?api=http://127.0.0.1:3002`. Open that link; the plain URL looks for the server on 3001. Setting `PORT=3002` does not change the port `devicely start` uses; use `-p`.

### `ENOENT: no such file or directory, uv_cwd`

The folder your terminal is in was deleted. `cd ~` and run the command again.

---

## Browser and Command Center

### The Command Center says it can't reach the server

1. Check `devicely start` is still running in a terminal, and that `curl http://127.0.0.1:3001/api/health` (with your port) answers.
2. Open the exact link `devicely start` printed. On a non-default port the link must include `?api=…`.
3. The Command Center is an HTTPS site calling `http://127.0.0.1` on your machine. Some browsers block that: Brave Shields, Safari, and Chrome's local network access protection. Allow local network access for `devicely-ai.vercel.app` when asked, turn Shields off for the site, or try another browser.
4. With `--https`, use a locally trusted certificate (for example `mkcert localhost 127.0.0.1`). Browsers silently block self-signed ones.

### No devices appear

- **Android:** run `adb devices`. Nothing listed: try a data cable, another port, and check USB debugging ([guide](ANDROID_FIRST_DEVICE.md)). `unauthorized`: tap **Allow** on the phone ([unauthorized](ANDROID_FIRST_DEVICE.md#unauthorized)). `no permissions` on Linux: [no_permission](ANDROID_FIRST_DEVICE.md#no_permission).
- **iPhone / iPad:** run `idevice_id -l` (install with `brew install libimobiledevice`). Nothing listed: unlock the device and tap **Trust This Computer** ([device_untrusted](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#device_untrusted)).
- Started with `--usb-only` or `--wifi-only`? Devices on the other connection are skipped.

---

## Wi-Fi

Android Wi-Fi pairing relies on the computer and phone seeing each other on the network. Guest, hotel, corporate and university Wi-Fi often block this (client isolation), and VPNs reroute it. Use a home network or a phone hotspot, pause the VPN, or pair over USB first. Details: [mdns_unavailable](ANDROID_FIRST_DEVICE.md#mdns_unavailable), [pair_failed](ANDROID_FIRST_DEVICE.md#pair_failed), [connect_failed](ANDROID_FIRST_DEVICE.md#connect_failed).

---

## iOS

| Code shown in Devicely | Fix |
| :--- | :--- |
| `wda_not_found` | [Get WebDriverAgent](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#wda_not_found) |
| `xcode_cli_only` | [Install full Xcode](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#xcode_cli_only) |
| `no_signing_team` | [Pick a signing team](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#no_signing_team) |
| `provisioning_failed` | [Fix the provisioning profile](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#provisioning_failed) |
| `developer_mode_off` | [Turn on Developer Mode](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#developer_mode_off) |
| `untrusted_developer` | [Trust your developer certificate](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#untrusted_developer) |
| `device_untrusted` | [Trust this computer](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#device_untrusted) |
| `device_not_paired` | [Pair with this Mac](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#device_not_paired) |
| `device_locked` | [Keep the device unlocked](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#device_locked) |
| `wda_timeout` | [WDA took too long](IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#wda_timeout) |

Worked last week, fails now, free Apple ID? The signature expires after 7 days: build WDA once more in Xcode with **Product › Test**.

---

## AI agents (MCP)

```bash
devicely mcp doctor
```

checks the backend, token and transports. Reconfigure a client with `devicely mcp install <client>` (`claude-code`, `claude-desktop`, `cursor`, `vscode`, `windsurf`, `gemini`), then restart the client.

---

## Still stuck?

```bash
devicely doctor --bundle
```

writes a redacted support bundle (doctor results, tool versions, recent logs) to your disk. Nothing is uploaded. Look through it, then attach it to an [issue](https://github.com/sureshkumarm8/Devicely/issues).

Maintainers looking for build and publish problems: see [PUBLISHING_GUIDE.md](PUBLISHING_GUIDE.md).
