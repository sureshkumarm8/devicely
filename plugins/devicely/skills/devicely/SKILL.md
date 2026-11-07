---
name: devicely
description: Drive real iPhones, iPads and Android devices, simulators and emulators through the Devicely MCP server. Use when the user wants something done on a phone or tablet, wants to test or explore a mobile app on real devices, reproduce a mobile bug, run the same check on several devices at once, find element locators, or turn a flow into a Maestro, Appium or WebdriverIO test.
---

# Devicely: hands on real phones

Devicely gives you the `devicely_*` MCP tools. You are the brain; Devicely is the hands. It has no AI of its own here, so plan every step yourself and check every result.

## 0. Make sure it's set up

- **No `devicely_*` tools available?** Devicely isn't connected to this agent. Tell the user:
  - Claude Code: `claude mcp add devicely -- npx -y devicely mcp`, or `/plugin marketplace add sureshkumarm8/Devicely` then `/plugin install devicely@devicely`
  - Any other MCP client: a stdio server with command `npx`, args `["-y", "devicely", "mcp"]`
  - Needs macOS or Linux and Node.js 20.9+. Android needs `adb`; iPhone and iPad need a Mac with Xcode.
- **Tools available but something fails?** Call `devicely_doctor`. It says what's ready and gives the exact fix command for anything missing. Relay the fix; don't guess.
- **No devices?** `devicely_list_devices`. With nothing connected, offer to boot one with `devicely_launch_virtual_device` (then poll `devicely_list_devices` until it's online), or point the user to the setup guide at https://github.com/sureshkumarm8/Devicely#first-device-in-minutes.
- A device that's listed but not connected needs `devicely_connect_device` first. The first iOS start can take up to a minute.

## 1. The loop: observe → act → verify

1. **Observe:** `devicely_snapshot` returns a screenshot and the interactive elements with refs (`e1`, `e2`, …). For a quick "is this button there?", use `devicely_find_elements`, which is faster and sends no image.
2. **Act** on what you saw: `devicely_tap` (prefer element refs or visible text over coordinates), `devicely_type_text`, `devicely_swipe`, `devicely_press_key`, `devicely_launch_app`, `devicely_open_url`.
3. **Verify:** take another snapshot, or pass `returnSnapshot: true` to `devicely_tap`. **A tool reporting success only means the action was sent.** Only the screen tells you it worked.

Rules that prevent most mistakes:
- **Read state before toggling.** Check whether a switch is already on before you tap it, so you never turn off what the user wanted on.
- **Wait for the screen, not a timer.** Use `devicely_wait_for` (element visible, element gone, text appears) after navigation, launches and network actions.
- **Scroll to find.** If an element isn't in the snapshot, swipe and snapshot again before concluding it doesn't exist.
- **iOS and Android differ.** The same setting has different labels and locations per platform and per OS version. Snapshot each platform separately; don't assume one device's screen applies to another.
- **Passwords and secrets:** set `sensitive: true` on `devicely_type_text` so they're masked in logs.

## 2. Many devices at once

- **A sequence you already know** (same app, same screens): send it once to every device with `devicely_run_commands`. It uses the Devicely command language, one command per line: `launch <app>`, `tap <target>`, `type "<text>"`, `swipe <up|down|left|right>`, `longpress <target> <ms>`, `url <url>`, `home`, `back`, `enter`, `kill <app>`, `WAIT <ms>`; `#` starts a comment. Then snapshot each device to verify.
- **Mirroring:** `devicely_commander` sets a commander device whose actions are scaled and repeated on the followers. Good for exploring by hand across a fleet.
- **Mixed platforms:** when screens differ, run per-platform commands instead of one shared script.
- **Report per device:** for every device, say what passed or failed and what you saw. Never summarise a fleet as "done" if one device didn't get there.

## 3. Turn a session into a test

- `devicely_get_action_log` returns the verified actions with locators, coordinates and timings (as JSON, Devicely commands, or Appium code that tries locators first and falls back to coordinates).
- `devicely_save_recording` saves a flow; `devicely_replay_recording` replays it on any devices; `devicely_list_recordings` lists them.
- `devicely_export_test` turns a saved recording into a CI test with no AI involved: `maestro`, `appium-python`, `appium-java` or `webdriverio`.
- For a stable locator, use `devicely_find_elements` and prefer IDs and accessibility labels over text, and text over coordinates.

## 4. Debugging

- **App crashed or misbehaving:** `devicely_get_device_logs` (logcat on Android, simulator logs on iOS) with `grep` for the app or the error.
- **Reproducing a bug:** snapshot at every step, note exact device, OS version and app version from `devicely_list_devices` / `devicely_list_apps`, and report the steps that reproduce it with the evidence.

## 5. Safety and blocked tools

- **Off by default, by design:** `devicely_install_app`, `devicely_uninstall_app`, `devicely_restart_device` and `devicely_stop_virtual_device`. If one is refused, tell the user it can be enabled in Devicely under **Settings → AI Agents**; don't work around it.
- The user may limit you to certain devices (`allowedDevices`). Use only devices that `devicely_list_devices` shows as allowed.
- **iOS passcodes can't be set by software:** `devicely_set_passcode` returns `NOT_SUPPORTED_ON_IOS` with manual steps. Relay them; don't try to do it with taps.
- Ask before anything irreversible on the user's real devices: deleting data, signing out, purchases, sending messages, changing security settings. Every agent action is logged in Devicely's audit trail.
- Everything runs on the user's machine against their devices; the local server listens on 127.0.0.1 only.

## 6. Good results look like

- Each claim backed by what you saw on screen ("Settings › Display shows Dark selected on Pixel 4a").
- Failures reported plainly, per device, with the last screen state and the likely reason.
- When the user will want to repeat it: offer to save a recording or export a test.
