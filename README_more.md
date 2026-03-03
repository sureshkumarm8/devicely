# 📱 Devicely: The Mobile Orchestration Engine

### **Stop testing one device at a time. Control your entire fleet as one.**

**[🚀 Web Dashboard](https://devicely-ai.vercel.app/)** | **[📦 NPM Package](https://www.npmjs.com/package/devicely)** | **[🎥 View Demo](https://devicely-ai.vercel.app/)**

---

## ⚡ The "One-to-Many" Revolution
**Devicely** isn't just another automation tool; it's a command center for your mobile laboratory. Whether you have 2 devices or 200, Devicely synchronizes them into a single, cohesive orchestra.

### 👑 **Commander Mode (Real-Time Sync)**
Touch the leader's screen, and every connected iOS and Android device mirrors the action instantly via WebSockets. No more repeating the same login flow 10 times on 10 different handsets.

### 🔍 **Smart Visual Inspector & Overlays**
Stop digging through XML trees. Use the **Live View** and **Device Overlay** to find locators and element IDs with point-and-click precision directly on the web dashboard.

### 🤖 **Zero-Setup AI (Powered by Groq)**
Talk to your devices in plain English. Use **Groq** for ultra-fast, free inference to launch apps, find locators, or navigate complex UI—no complex setup required for your first run.

---

## 🛠️ Built for Transparency & Trust
We know security is critical for developer tools. Devicely acts as a high-performance bridge between our Dashboard and your local machine using industry-standard protocols:

* **iOS Integration:** Uses **XCUITest (WDA)** and **ideviceinstaller**.
* **Android Integration:** Uses **ADB** and **UIAutomator**.
* **Full Visibility:** Every command sent is visible in your local terminal logs in real-time.
* **Privacy First:** All API keys are stored locally; no telemetry or data collection.

---

## 🚀 Quick Start
Get up and running in less than 60 seconds:

```bash
# Install the CLI globally
npm install -g devicely

# Launch the engine
devicely start
```
Visit https://devicely-ai.vercel.app/ to connect your first device.

✨ Latest Features (v2.2.13)
* Live View Mirroring: High-fidelity real-time screen streaming.
* 
* Device Overlay for Locators: Visual highlights for elements directly on the device mirror.
* 
* Enhanced AI Accuracy: Smarter natural language processing for complex navigation.
* 
* Record & Replay: Capture a flow once and replay it across your entire device fleet.