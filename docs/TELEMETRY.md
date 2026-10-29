# Telemetry

Devicely asks before it collects anything about your setup, and collects very little when you say yes. This page lists everything.

**In short**

- The **local Devicely server sends nothing**. No telemetry leaves your machine from the `devicely` process.
- The **hosted Command Center** at [devicely-ai.vercel.app](https://devicely-ai.vercel.app) records anonymous **page views** with [Vercel Web Analytics](https://vercel.com/docs/analytics), like most websites.
- **Setup diagnostics are opt-in.** The Command Center asks once whether to share anonymous setup events. Until you say yes, none are sent.
- Events are **fixed codes only**: never device serials or UDIDs, IP addresses, device names, Apple IDs, app names or bundle IDs, file paths, screenshots, commands, or anything typed on a device.

## Why

The goal is for a new user to get from `npm install` to a first device action in minutes. These events show where setup fails (for example "adb missing" or "Wi-Fi pairing blocked by the network") so we fix the most common problems first.

## What is collected (after you opt in)

Events are sent from the Command Center in your browser as Vercel Web Analytics custom events. Only the events and fields below can leave the browser; anything else is dropped before sending. Every value must be a short code (letters, digits, `-`, `_`); values that look like an ID, serial or IP address are dropped too.

| Event | Fields | Example |
| :--- | :--- | :--- |
| `first_run` | none | Devicely was opened for the first time (sent once per browser profile) |
| `doctor_result` | `check_id`, `status` | `adb`, `fail` |
| `device_detected` | `platform`, `connection` | `android`, `usb` (not which device) |
| `device_setup_state` | `state` | `unauthorized` while waiting for you to tap Allow |
| `connect_failed` | `code` | `no_signing_team` |
| `pairing_result` | `status`, `code` | how Wi-Fi pairing ended, for example `fail`, `mdns_unavailable` |
| `first_device_action` | `type`, `msBucket` | `screenshot`, `2-5m`: a time range since first run, not a timestamp |
| `demo_mode_used` | `platform` | a simulator or emulator was used instead of a device |

`msBucket` is one of `lt-1m`, `1-2m`, `2-5m`, `5-15m`, `15-60m`, `1-24h`, `gt-24h`, so a timing can't be matched to a session. Error codes are the same ones documented in the [Android](guides/ANDROID_FIRST_DEVICE.md#errors) and [iOS](guides/IOS_NEW_DEVICE_ONBOARDING_AND_WDA_SIGNING.md#connect-errors) guides. The same list is shown in the Command Center under *Settings › Privacy*.

Vercel Web Analytics adds what it records for any page view, such as the page path, browser, OS and country. See [Vercel's privacy documentation](https://vercel.com/docs/analytics/privacy-policy).

## What is never collected

- Device serials, UDIDs, IMEIs, IP addresses or MAC addresses
- Device, computer or user names; Apple IDs or signing team names
- App names, bundle IDs or package names
- File paths, logs, screenshots, screen contents, recordings or Flows
- Commands, AI prompts or API keys
- Anything from the local server: it has no telemetry code that sends data

## Opting in and out

**In the Command Center:** the first time you open it, Devicely asks whether to share anonymous setup diagnostics. Choose **Yes** or **No**. Your choice is saved by your local Devicely server, and you can change it later in *Settings › Privacy*.

**From the CLI:**

```bash
devicely telemetry status     # shows whether setup diagnostics are on, and why
devicely telemetry enable
devicely telemetry disable
```

**With environment variables** (set them where you run `devicely start`). Either one turns setup diagnostics off, whatever you chose in the app. Devicely also turns them off when it detects it is running in CI.

```bash
export DO_NOT_TRACK=1                    # the cross-tool convention, see consoledonottrack.com
export DEVICELY_TELEMETRY_DISABLED=1
```

Page-view analytics on the hosted site are not covered by these settings; browser content blockers and privacy settings that block Vercel Analytics also block them.

## See exactly what is sent

In the Command Center, open the browser developer console and run:

```js
localStorage.setItem('devicely_telemetry_debug', '1')
```

Reload the page. Setup events are then printed to the console with all their fields **instead of being sent**. Remove it with `localStorage.removeItem('devicely_telemetry_debug')`.

## Retention and deletion

Events and page views are stored by Vercel Web Analytics and kept for Vercel's analytics retention period; see [Vercel Web Analytics limits and pricing](https://vercel.com/docs/analytics/limits-and-pricing) and [privacy](https://vercel.com/docs/analytics/privacy-policy).

Events carry no user ID, install ID, account or device identifier, so they can't be traced back to you or to a particular install, and there is nothing personal to look up. To stop future events, run `devicely telemetry disable` or set `DEVICELY_TELEMETRY_DISABLED=1`. Questions or deletion requests: [devicelyai@gmail.com](mailto:devicelyai@gmail.com).

## Support bundles are separate

`devicely doctor --bundle` writes a redacted support bundle to your own disk. It is never uploaded; you decide whether to attach it to an issue.
