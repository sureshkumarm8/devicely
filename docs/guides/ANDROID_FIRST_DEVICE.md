# Android: your first device

**Expect about 2 minutes** over USB. You need:

- `adb` from Android platform-tools on your `PATH`. `devicely doctor` checks it and prints the install command: `brew install --cask android-platform-tools` on macOS, or your distribution's `android-tools` / `adb` package on Linux. A recent version matters for Wi-Fi pairing ([adb_too_old](#adb_too_old)).
- A USB **data** cable. Many cables that came with chargers are charge-only.
- Wi-Fi pairing needs Android 11 or later.

The in-app **Add your first device › Android phone** guide shows these steps with a live checklist. This page is the reference it links to.

---

## 1. Turn on Developer options

Open *Settings*, find the **Build number**, tap it **7 times**, and enter your PIN if asked. "You are now a developer" confirms it.

| Brand | Where the Build number is | Where Developer options appear |
| :--- | :--- | :--- |
| **Google Pixel** | *Settings › About phone › Build number* | *Settings › System › Developer options* |
| **Samsung** (One UI) | *Settings › About phone › Software information › Build number* | *Settings › Developer options* (bottom of the list) |
| **Xiaomi / Redmi / POCO** (MIUI, HyperOS) | Tap **MIUI version** or **OS version** 7 times in *Settings › About phone* | *Settings › Additional settings › Developer options* |
| **OnePlus / Oppo / Realme** (OxygenOS, ColorOS, Realme UI) | *Settings › About device › Version › Build number* (older: *About phone › Build number*) | *Settings › Additional settings › Developer options* (OnePlus: *Settings › System › Developer options*) |
| **Motorola** | *Settings › About phone › Build number* | *Settings › System › Developer options* |

Menu names move between OS versions; searching Settings for "Build number" and "Developer options" works on all of them.

## 2. Turn on USB debugging and allow this computer

1. In **Developer options**, turn on **USB debugging**.
2. Connect the phone with the cable and unlock it.
3. On the *Allow USB debugging?* prompt, tick **Always allow from this computer** and tap **Allow**.

While the prompt is waiting, Devicely shows the device as **waiting for permission**. Once you tap Allow it goes online.

**Xiaomi / Redmi / POCO** also need, in Developer options:

- **USB debugging (Security settings)**: lets Devicely tap and type. Without it, screenshots work but input is silently ignored.
- **Install via USB**: lets Devicely install its helper app.

Both require being **signed in to a Mi account**, and Xiaomi usually requires a **SIM card** in the phone to turn them on. Turn off **MIUI optimization** (bottom of Developer options) if taps still don't register.

**Windows** isn't supported by Devicely yet; on macOS and Linux no driver is needed.

## 3. Start Devicely

```bash
devicely doctor
devicely start
```

The phone appears in the Command Center. `adb devices` should list it as `device`.

---

## Wi-Fi (Android 11+)

Your computer and phone must be on the **same network**, and the network must allow devices to talk to each other ([mdns_unavailable](#mdns_unavailable)).

On the phone: *Developer options › **Wireless debugging** › On*.

### QR code

1. In Devicely: *Add your first device › Android › Wi-Fi › QR code*.
2. On the phone: *Wireless debugging › **Pair device with QR code***, and scan the code on screen.
3. Devicely finds the phone on the network, pairs and connects. Nothing to type.

### Pairing code

1. On the phone: *Wireless debugging › **Pair device with pairing code***. It shows an `IP address & Port` and a 6-digit code.
2. Enter both in Devicely (*Wi-Fi › Pairing code*), or from a terminal:
   ```bash
   devicely wifi pair 192.168.1.23:37199 123456
   devicely wifi connect 192.168.1.23:41827
   ```
   The **pairing** port (on the pairing dialog) and the **connect** port (on the main *Wireless debugging* screen, under *IP address & Port*) are different.

Pairing is remembered; next time only `connect` is needed. The connect port changes whenever Wireless debugging restarts.

### USB first, then Wi-Fi (fallback)

When pairing is blocked, or on Android 10 and older:

```bash
adb -s <serial> tcpip 5555          # with the phone on USB
adb -s <serial> shell ip route      # the phone's IP is after "src"
devicely wifi connect <phone-ip>:5555
```

Unplug the cable afterwards. This lasts until the phone restarts.

---

## Errors

Devicely shows these codes on the device card. The sections below use the same codes as their anchors.

<a id="unauthorized"></a>
### unauthorized

**Shown as "waiting for permission". The phone hasn't allowed this computer yet.** Unlock the phone and tap **Allow** on the *Allow USB debugging?* prompt (tick *Always allow*). If no prompt appears:

1. Unplug, then *Developer options › **Revoke USB debugging authorizations***.
2. Turn USB debugging off and on, plug back in and unlock.
3. Still nothing: `adb kill-server`, then replug.

<a id="authorizing"></a>
### authorizing

**Also shown as "waiting for permission".** adb has seen the phone and the *Allow USB debugging?* prompt is on its way. Unlock the phone and tap **Allow**. If it stays like this, follow [unauthorized](#unauthorized).

<a id="offline"></a>
### offline

**adb sees the device but can't talk to it.** Usually a flaky cable or port, a phone that's still booting, or two adb versions fighting ([adb_too_old](#adb_too_old)). Try another cable and USB port (avoid hubs), then:

```bash
adb kill-server
adb devices
```

For Wi-Fi devices, the connection dropped: reconnect with `devicely wifi connect <ip:port>` (check the current port under *Wireless debugging*).

<a id="no_permission"></a>
### no_permission

**Linux only: `adb devices` says `no permissions`.** Your user can't open the USB device. Add a udev rule and put yourself in the `plugdev` group:

```bash
# Debian/Ubuntu: the packaged rules cover most vendors
sudo apt install android-sdk-platform-tools-common

# Or write a rule yourself (replace 18d1 with your vendor ID from `lsusb`)
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0660", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
sudo usermod -aG plugdev "$USER"
```

Log out and back in for the group change, then replug and run `adb kill-server`. Also set the phone's USB mode to *File transfer* if it's on *Charging only*.

<a id="adb_missing"></a>
### adb_missing

**`adb` isn't installed or isn't on your `PATH`.** Install platform-tools (`brew install --cask android-platform-tools` on macOS, `sudo apt install adb` or your distribution's equivalent on Linux), or add Android Studio's copy to your `PATH`:

```bash
export PATH="$HOME/Library/Android/sdk/platform-tools:$PATH"   # macOS, Android Studio
export PATH="$HOME/Android/Sdk/platform-tools:$PATH"           # Linux, Android Studio
```

Then rerun `devicely doctor`.

<a id="adb_too_old"></a>
### adb_too_old

**An old `adb` is first on your `PATH`, or two versions are running.** Old adb lacks the mDNS support Wi-Fi pairing needs, and a mismatch causes `adb server version (X) doesn't match this client (Y); killing...` loops, often because Android Studio, Genymotion or another tool runs its own adb.

1. See which adb you're using: `which -a adb` and `adb version`.
2. Update platform-tools (`brew upgrade --cask android-platform-tools`) or put the newest copy first on your `PATH`, and remove or rename stale ones.
3. Restart the server so only one version runs:
   ```bash
   adb kill-server
   adb start-server
   ```

<a id="mdns_unavailable"></a>
### mdns_unavailable

**Your network doesn't let the computer discover the phone.** QR pairing finds the phone with mDNS (Bonjour), which many networks block. Devicely runs this check for you; to run it yourself: `adb mdns check` and `adb mdns services`.

Typical causes:

- **Guest, hotel, café, university and corporate Wi-Fi** often use *client isolation*: devices can reach the internet but not each other.
- **VPNs** on the computer or phone send traffic away from the local network.
- The phone and computer are on **different networks or bands** (for example a 5 GHz guest SSID).

Fixes, in order: use a home network or your phone's **personal hotspot** (connect the computer to it); pause the VPN; use the [pairing code](#pairing-code) (it still needs device-to-device traffic, but not discovery); or use [USB first, then Wi-Fi](#usb-first-then-wi-fi-fallback) or plain USB.

<a id="pair_failed"></a>
### pair_failed

**Pairing was rejected or timed out.** The pairing code and port are only valid while the pairing dialog is open on the phone. Open *Pair device with pairing code* again and use the new code and **pairing** port right away. Also check [mdns_unavailable](#mdns_unavailable) and [adb_too_old](#adb_too_old).

<a id="connect_failed"></a>
### connect_failed

**Paired, but the connection didn't open.** The connect port changes every time Wireless debugging restarts: read the current one under *Wireless debugging › IP address & Port* and run `devicely wifi connect <ip:port>`. Keep the phone unlocked and on the same Wi-Fi. If the network blocks device-to-device traffic, see [mdns_unavailable](#mdns_unavailable).

---

Still stuck? `devicely doctor --bundle` writes a redacted support bundle to your disk (nothing is uploaded) that you can attach to an [issue](https://github.com/sureshkumarm8/Devicely/issues). More: [Troubleshooting](TROUBLESHOOTING.md).
