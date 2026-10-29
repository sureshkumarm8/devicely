# iPhone and iPad: first connection and WebDriverAgent signing

Devicely controls iPhones, iPads and iOS simulators through **WebDriverAgent** (WDA), Appium's open-source test runner. Simulators only need the WDA source. A physical device also needs WDA **signed with your Apple ID** before iOS will run it. Signing is the one step nobody can automate for you, but you only do it once per device (once a week with a free Apple ID).

**Expect about 15 minutes the first time.** You need:

- A Mac with **Xcode** installed from the App Store (Command Line Tools alone are not enough).
- An **Apple ID**. A free one works ([Personal Team](#personal-team-free-apple-id)); a paid Apple Developer Program team avoids the 7-day expiry ([Paid team](#paid-developer-team)).
- An iPhone or iPad on **iOS / iPadOS 17 or later**, and a USB data cable.

The in-app **Add your first device › iPhone** guide follows the same steps with a live checklist. This page is the reference it links to.

---

## 1. Get WebDriverAgent

Pick one:

- **In the app:** *Add your first device › iPhone › Download WebDriverAgent*. Devicely downloads it into its data folder.
- **From a terminal:**
  ```bash
  git clone https://github.com/appium/WebDriverAgent ~/.devicely/WebDriverAgent
  ```

Devicely looks for WDA in this order: the `WDA_PATH` environment variable, `~/.devicely/WebDriverAgent` (or `$DEVICELY_DATA_DIR/WebDriverAgent` if you set `DEVICELY_DATA_DIR`), an Appium-installed copy under `~/.appium`, then folders in `~/WDA` and `~/Downloads`.

**Simulators:** that's it. Boot one with `devicely emulators start "<name>"` or from the Command Center; no signing needed.

## 2. Prepare the device

1. Connect it to the Mac with a USB data cable and unlock it.
2. Tap **Trust This Computer** and enter the passcode.
3. Turn on **Developer Mode**: *Settings › Privacy & Security › Developer Mode*, then restart and confirm. If the toggle isn't there, open Xcode with the device connected (*Window › Devices and Simulators*); it appears after Xcode has seen the device. See [developer_mode_off](#developer_mode_off).

## 3. Sign WebDriverAgent in Xcode

1. Add your Apple ID: *Xcode › Settings › Accounts › +*.
2. Open the project:
   ```bash
   open ~/.devicely/WebDriverAgent/WebDriverAgent.xcodeproj
   ```
3. In the project navigator click **WebDriverAgent**, then for the **WebDriverAgentLib** and **WebDriverAgentRunner** targets open **Signing & Capabilities**, tick **Automatically manage signing** and choose your **Team**.
4. Free Apple ID only: change the bundle identifier, see [Personal Team](#personal-team-free-apple-id).
5. In the toolbar choose the **WebDriverAgentRunner** scheme and your device as the destination, then **Product › Test** (⌘U). The first build takes a few minutes.
6. When the test starts running on the phone, signing worked. Stop it in Xcode (⌘.).
7. If the phone says *Untrusted Developer*: *Settings › General › VPN & Device Management › Developer App ›* your Apple ID *› Trust*.

## 4. Connect in Devicely

Run `devicely start`. The device appears over USB on its own; click **Connect**. Devicely builds and launches WDA (the first launch can take a couple of minutes) and starts mirroring. If it fails, the device card shows a named reason that links to one of the [fixes below](#connect-errors).

---

## Personal Team (free Apple ID)

A free Apple ID gives you a **Personal Team**. It works with Devicely, with these limits set by Apple:

| Limit | What it means |
| :--- | :--- |
| Signature expires after **7 days** | WDA stops launching a week after you signed it. Repeat [step 3](#3-sign-webdriveragent-in-xcode) (Product › Test) to re-sign. |
| **3 devices** per Apple ID | Registered automatically when you build to a device. |
| **10 App IDs per 7 days** | Each new bundle identifier uses one. Pick one bundle ID and keep it. |
| Unique bundle identifier required | The default `com.facebook.WebDriverAgentRunner` is taken. |

Setup:

1. In **Signing & Capabilities**, choose *Your Name (Personal Team)* as the team for **WebDriverAgentLib** and **WebDriverAgentRunner**.
2. In **WebDriverAgentRunner › Build Settings › Product Bundle Identifier**, set something unique to you, for example `com.yourname.WebDriverAgentRunner`. If Xcode still reports a bundle ID conflict, also change it on **WebDriverAgentLib**.
3. Build with **Product › Test** as in step 3.
4. On the device, trust your Apple ID: *Settings › General › VPN & Device Management › Developer App › Trust "Apple Development: you@example.com"*.

## Paid developer team

With an Apple Developer Program team and **Automatically manage signing**, Xcode registers new devices for you when you build to them. If your team uses **manual signing** with a fixed provisioning profile, every new device must be added to that profile first:

1. Find the UDID: `idevice_id -l`, `xcrun xctrace list devices`, or click the text under the device name in Finder.
2. Register it at [developer.apple.com › Devices](https://developer.apple.com/account/resources/devices/list) (several at once: upload a `.deviceids` file).
3. Open your WDA profile at [developer.apple.com › Profiles](https://developer.apple.com/account/resources/profiles/list), **Edit**, tick the new device, **Save**, then **Download**.
4. Double-click the downloaded `.mobileprovision` to install it, select it under **WebDriverAgentRunner › Signing & Capabilities**, and build with **Product › Test**.

Only someone with access to the team's developer account can do this.

---

## Connect errors

Each error Devicely shows on the device card has a code. The sections below use the same codes as their anchors.

<a id="no_signing_team"></a>
### no_signing_team

**Xcode has no team selected for WebDriverAgent.** Add your Apple ID in *Xcode › Settings › Accounts*, then pick the team for **WebDriverAgentLib** and **WebDriverAgentRunner** in *Signing & Capabilities* ([step 3](#3-sign-webdriveragent-in-xcode)). With a free Apple ID, also set a unique bundle identifier ([Personal Team](#personal-team-free-apple-id)).

<a id="provisioning_failed"></a>
### provisioning_failed

**Xcode couldn't create or use a provisioning profile for this device.** Common causes:

- *Free Apple ID:* the bundle identifier is still `com.facebook.WebDriverAgentRunner`, you've used 10 App IDs this week, you already have 3 devices registered, or the 7-day signature expired. See [Personal Team](#personal-team-free-apple-id), then build once more with **Product › Test**.
- *Paid team, manual signing:* the profile doesn't include this device's UDID. See [Paid developer team](#paid-developer-team).

Building once from Xcode (**Product › Test**) is the most reliable fix: Xcode can fix up profiles interactively, the command-line build Devicely runs can't.

<a id="developer_mode_off"></a>
### developer_mode_off

**Developer Mode is off on the device.** *Settings › Privacy & Security › Developer Mode › On*, restart, then tap **Turn On** after the restart and enter the passcode. If there is no Developer Mode entry, connect the device, open *Xcode › Window › Devices and Simulators* so Xcode sees it, and check again.

<a id="untrusted_developer"></a>
### untrusted_developer

**iOS doesn't yet trust the certificate WDA was signed with.** On the device: *Settings › General › VPN & Device Management › Developer App ›* your Apple ID or team *› Trust*. Needs an internet connection on the device.

<a id="device_locked"></a>
### device_locked

**The device was locked while WDA was launching.** Unlock it and keep it on the home screen until mirroring starts. During setup it helps to set *Settings › Display & Brightness › Auto-Lock › Never*.

<a id="device_untrusted"></a>
### device_untrusted

**The device hasn't trusted this Mac.** Unlock it, replug the cable and tap **Trust This Computer**, then enter the passcode. If the prompt never appears: *Settings › General › Transfer or Reset iPhone › Reset › Reset Location & Privacy*, then replug.

<a id="device_not_paired"></a>
### device_not_paired

**The device isn't paired with this Mac yet.** Same fix as [device_untrusted](#device_untrusted): unlock, replug, tap **Trust This Computer**. From a terminal, `idevicepair pair` starts pairing and `idevicepair validate` checks it.

<a id="xcode_cli_only"></a>
### xcode_cli_only

**Only the Command Line Tools are active, not full Xcode.** Install Xcode from the App Store, then:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -license accept
xcodebuild -runFirstLaunch
```

`devicely doctor` reports this too.

<a id="wda_not_found"></a>
### wda_not_found

**Devicely can't find the WebDriverAgent project.** Click *Download WebDriverAgent* in the app, or:

```bash
git clone https://github.com/appium/WebDriverAgent ~/.devicely/WebDriverAgent
```

If you keep WDA somewhere else, set `WDA_PATH` to the folder that contains `WebDriverAgent.xcodeproj`. Search order: [step 1](#1-get-webdriveragent).

<a id="wda_timeout"></a>
### wda_timeout

**WDA didn't come up in time.** The first build on a Mac can take several minutes, so first just retry. If it keeps timing out:

1. Keep the device unlocked during launch ([device_locked](#device_locked)).
2. Build once in Xcode with **Product › Test** and read the error there; signing problems show up clearly in Xcode.
3. Make sure your Xcode supports the device's iOS version (a newer iOS than your Xcode knows about fails to build). Update Xcode if needed.
4. Run `devicely doctor` and `devicely doctor --bundle` and attach the bundle to an [issue](https://github.com/sureshkumarm8/Devicely/issues) if you're stuck.

---

## FAQ

**Why can't Devicely sign WDA for me?** Signing needs your Apple ID credentials, two-factor authentication and your signing certificate. Devicely never asks for them.

**Do simulators need signing?** No. They only need the WDA source ([step 1](#1-get-webdriveragent)) and Xcode with a simulator runtime.

**Which iOS versions work?** iOS and iPadOS 17 or later. Devicely builds WDA with a deployment target of iOS 17.0.

**It worked last week and now doesn't.** With a free Apple ID the signature expires after 7 days. Build again with **Product › Test**.
