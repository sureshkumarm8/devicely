<div align="center">

# 📱✨ Devicely

### **Control one device, and every connected device follows in real-time - with live screen sync on the web**

*Ever wondered what happens when you combine device mirroring with AI-powered automation? Meet the mobile orchestration platform that curious developers are exploring.*

### 🤔 **Intrigued? Try it yourself:**

```bash
npm install -g devicely
devicely start
```
**Visit [https://devicely-ai.vercel.app/](https://devicely-ai.vercel.app/) and see what happens when devices work together.**

[![NPM Version](https://img.shields.io/badge/npm-v2.2.13-CB3837?style=for-the-badge)](https://www.npmjs.com/package/devicely)
[![License](https://img.shields.io/badge/license-Proprietary-blue?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey?style=for-the-badge)](https://devicely-ai.vercel.app)

[🚀 Quick Start](#-quick-start) • [✨ Key Features](#-the-devicely-advantage) • [🌌 Infinite Possibilities](#-glimpse-of-the-infinite) • [📟 CLI Reference](#-cli-reference)

---

### 🤷‍♀️ **What if mobile testing was more like conducting an orchestra?**

Instead of manually testing the same flow across multiple devices, what if you could:

- **Speak naturally** to your devices: *"Take a screenshot"* → all devices respond
- **Touch one screen** and watch others mirror your actions in real-time
- **Record once**, replay everywhere - from 1 device to 100+
- **See everything** happening across your device fleet on one web dashboard

*Turns out, when devices can follow a leader and understand natural language, mobile development gets pretty interesting.*

</div>

---

---

## 🌟 **What makes this different?**

### 👑 **Commander Mode** - *Like screen sharing, but for device control*
*   One device leads, others follow in real-time
*   Touch the leader's screen → all followers mirror the action
*   Switch leaders with a simple dropdown
*   Watch it all happen on your web dashboard

### 🔄 **Live Sync** - *What if all your devices moved together?*
*   Commands reach all devices simultaneously via WebSockets
*   iOS and Android understand the same instructions differently (as they should)
*   See live status updates from every connected device
*   No waiting for one device to finish before the next starts

### 📹 **Record & Replay - Zero-Code Automation**
*   **Visual Recording:** Capture complex workflows with simple button clicks
*   **AI-Generated Scripts:** Voice commands auto-convert to replayable recordings
*   **Fleet Replay:** Run recorded flows on single devices or entire laboratories
*   **Edit & Refine:** Full editor for recordings with add/remove/modify capabilities

### 🤖 **AI Integration** - *Talk to your devices like a person*
*   Say *"Open Instagram and find search"* - it just works
*   Choose from 7 AI providers (some are free to try)
*   Devices understand context - no hunting for element IDs
*   Same command, different results on iOS vs Android (intelligently)

### 🎤 **Voice Control** - *Because typing is so 2020*
*   Speak naturally, pause when you're thinking (2-second detection)
*   Chain commands: *"launch settings, scroll up, launch camera"*
*   Watch your words turn into actions in real-time
*   Works across as many devices as you want to connect

---

## ✨ **Other things you might find useful**

### ⚡ **Quick Actions Panel**
*   **Type Text to Send:** Rapid text input without typing full commands
*   **Element to Tap:** Click by name or coordinates (x,y) instantly
*   **App ID to Launch:** Launch apps with autocomplete dropdown
*   **History Navigation:** Arrow keys cycle through previous inputs

### 🎮 **Unified Command Center**
*   **Cross-Platform:** Native support for **iOS 14+** and **Android 5+**
*   **Massive Scale:** Control 5, 50, or 100+ devices with zero overhead
*   **Live Feedback:** Real-time logs and visual confirmations via WebSockets
*   **API Key Management:** Secure local storage with show/hide toggles

### 🔍 **Smart UI Inspector**
*   **Visual Element Scan:** See all clickable, enabled, visible elements instantly
*   **Point-and-Click Control:** Direct device interaction through inspector
*   **Developer Export:** Clean selectors and coordinates for automation scripts

### 📷 **Screenshots Gallery & Management**
*   **Unified Media Library:** Combined recordings and screenshots in tabbed interface
*   **Visual Screenshot Gallery:** Thumbnail grid with device names and timestamps
*   **Full-Screen Viewer:** Click to enlarge screenshots with dark background overlay
*   **Quick Management:** Delete screenshots directly from gallery with one-click
*   **Auto-Collection:** Screenshots captured via commands automatically appear in gallery

### 🌌 **The bigger picture**
*   Transform 2-hour manual testing into 5-minute parallel runs
*   Turn your device collection into a web-accessible lab
*   Reproduce bugs instantly across different devices/OS versions
*   Mix iOS and Android devices - they all speak the same language

---

## 🔍 **How it works** *(in about 60 seconds)*

### **Step 1: Get it running**
```bash
npm install -g devicely
devicely start
```

### **Step 2: Connect and explore**
1. Open [https://devicely-ai.vercel.app/](https://devicely-ai.vercel.app/)
2. Connect your iOS/Android devices (as many as you want)
3. Try saying: *"Take screenshot on all devices"*
4. Watch what happens

### **Step 3: Discover the AI layer** *(optional, but fun)*
- Settings → AI Config → Choose a provider (Gemini/Groq are free)
- Now you can talk to your devices in plain English
- *"Launch settings, scroll down, open camera"* - just works

**💡 Curious tip:** The more devices you connect, the more interesting it gets.

---

## 🎯 Usage Examples

### Natural Language Commands
```bash
# Simple actions
"take screenshot"
"launch chrome"
"go to google.com"

# Multi-step sequences
"launch settings scroll up launch camera go to youtube.com press home"

# Cross-platform (automatically uses correct package IDs)
"launch settings"  # → com.apple.Preferences (iOS) + com.android.settings (Android)
```

### Voice Commands
1. Click 🎤 microphone button
2. Speak: "launch settings scroll up launch camera"
3. Pause for 2 seconds
4. Command executes on all selected devices!

### Recording & Replay
1. Click **Record** button
2. Perform actions on device
3. Click **Stop Recording**
4. Save with name
5. Replay anytime on any device(s)

### Commander Mode
1. Connect 2+ devices
2. First device auto-becomes commander
3. Click on commander screen to broadcast actions
4. Use top-left dropdown on mirror to swap commander
5. All devices stay synchronized automatically

---

## 🤖 AI Provider Comparison

Devicely supports **7 leading AI providers** with multiple models to choose from:

| Provider | Models | Speed | Free Tier | Best For |
|----------|--------|-------|-----------|----------|
| **🤖 OpenAI** | GPT-4 Turbo, GPT-4, GPT-3.5 | 🔥🔥 | ❌ | General purpose, accuracy |
| **✨ Google Gemini** | 2.0 Flash, 1.5 Pro, 1.5 Flash | 🔥🔥🔥 | ✅ Yes | Cost-effective, multimodal |
| **🧠 Anthropic Claude** | 3.5 Sonnet, 3 Opus, 3 Haiku | 🔥🔥 | ❌ | Complex reasoning, long context |
| **🐙 GitHub Copilot** | GPT-4, GPT-3.5 | 🔥🔥 | ❌ | Developers with subscription |
| **⚡ Groq** | Llama 3 70B, Mixtral, Gemma | 🔥🔥🔥 | ✅ Yes | **Ultra-fast inference** |
| **🌊 Cohere** | Command R+, Command R | 🔥🔥 | ✅ Yes | Enterprise-grade |
| **🌬️ Mistral AI** | Large, Medium, Small | 🔥🔥 | ❌ | EU compliance, open-source |

### 💡 Recommendations
- **Free Users:** Start with Gemini 2.0 Flash or Groq Llama 3
- **Speed Critical:** Use Groq (fastest inference available)
- **Best Quality:** Claude 3.5 Sonnet or GPT-4 Turbo
- **Cost Effective:** Gemini Flash or GPT-3.5 Turbo

Get API Keys:
- **OpenAI:** https://platform.openai.com/api-keys
- **Gemini:** https://makersuite.google.com/app/apikey
- **Claude:** https://console.anthropic.com/account/keys
- **Groq:** https://console.groq.com/keys
- **Cohere:** https://dashboard.cohere.com/api-keys
- **Mistral:** https://console.mistral.ai/api-keys

---

## 📟 CLI Reference

Devicely comes with a powerful command-line interface for quick actions:

| Command | Description |
| :--- | :--- |
| `devicely start` | Launch the web-based Command Center. |
| `devicely list` | List all connected iOS and Android devices. |
| `devicely doctor` | Verify system requirements (ADB, WDA, etc.). |
| `devicely exec "<cmd>"` | Execute a natural language command on all devices. |

---

## 🆕 Latest Features (v2.2.13 - February 2026)

### 🎨 **Major UI & Performance Update (v2.2.13 - Latest)**
- **📷 Screenshots Gallery:** Complete screenshot management system with tabbed interface
- **🎨 Apps Menu Redesign:** Beautiful gradient backgrounds and improved visual hierarchy
- **🤖 AI Bypass Optimization:** App commands now execute instantly without AI processing
- **⚡ Performance Boost:** Significantly faster app operations and UI responsiveness
- **🎯 Enhanced UX:** Better z-index management, tooltips, and user feedback

### 📷 **Screenshots Gallery & Management (NEW!)**
- **Unified Media Library:** Combined Recordings and Screenshots in elegant tabbed interface
- **Visual Gallery:** Responsive thumbnail grid (2-6 columns) with device context
- **Full-Screen Viewer:** Click any screenshot for full-screen view with dark overlay
- **Smart Management:** One-click delete with instant feedback and auto-refresh
- **Device Tracking:** See which device captured each screenshot with timestamps
- **Auto-Collection:** Screenshots from `screenshot` command automatically appear
- **Cross-Platform:** Works seamlessly with iOS and Android screenshots

### 🎨 **Apps Menu Visual Overhaul**
- **Gradient Backgrounds:** Each section has beautiful, color-coded gradient styling:
    - 🟢 **Quick Launch:** Green-emerald gradient with enhanced app cards
    - 🚀 **Launch App:** Green-teal gradient for app launching controls
    - ❌ **Kill App:** Red-pink gradient for app termination controls
    - 📦 **Install App:** Blue-cyan gradient for app installation
    - 🗑️ **Uninstall App:** Orange-yellow gradient (NEW dedicated section)
    - 📱 **Installed Apps:** Purple-pink gradient for app listing
- **Enhanced Visual Hierarchy:** Clear section separation with consistent iconography
- **Z-Index Management:** Apps Menu now properly appears above all hints and tooltips
- **Improved Tooltips:** Better button labeling and user guidance throughout

### 🤖 **AI Processing Optimization**
- **Smart Command Detection:** Automatic bypass for app control commands
- **Regex Pattern Matching:** Detects `launch`, `kill`, `install`, `uninstall` commands
- **Direct Execution:** App commands execute immediately without AI conversion
- **Performance Gain:** Eliminated "🤖 Converting with Local Built-In AI" delays
- **Maintained Intelligence:** Other commands still benefit from AI when enabled

### ⚡ **Commander Mode App Launch Fix (v2.2.13)**
- **Simple Detection:** Pre-tap home screen detection for smart app launches
- **Skip Coordinate Mirroring:** No more wrong taps when launching apps from home screen
- **Direct App Sync:** Detects launched app and immediately launches same app on followers
- **Performance Optimized:** Reduced cache refresh overhead during app launches
- **Smart Cache Management:** Refresh timing optimized for app launch vs regular tap scenarios

### 🔧 **Intelligent Locator System Enhancements**
- **Advanced Caching:** Smart cache invalidation and refresh strategies
- **Performance Tuning:** Reduced cache refresh from 10s to 30s for better responsiveness
- **Session Recovery:** Improved session handling with smart recovery mechanisms
- **Cross-Device Sync:** Better coordinate scaling and device synchronization

### 🐛 **Critical Fixes Applied**
- **Commander Mode Errors:** Fixed "Error starting commander mode" when devices already connected
- **Duplicate Follower Mirrors:** Resolved multiple mirror display issues
- **Coordinate Scaling:** Fixed scaling problems between commander and follower devices
- **Session Management:** Improved session lifecycle and error recovery
- **AI Command Order:** Fixed command conversion and execution sequence

### 🎯 **Developer Experience Improvements**
- **Clean Code Architecture:** Improved separation of concerns and modularity
- **Better Error Handling:** Enhanced error messages and user feedback
- **Performance Monitoring:** Added metrics and logging for better debugging
- **Cross-Platform Consistency:** Unified behavior across iOS and Android platforms

---

### 📋 **Recent Commits on Release_2.2.13 Branch**
```
dda75e2 🎨 MAJOR UPDATE: Apps Menu UI Fixes + Screenshots Gallery + AI Bypass
a267fab 🚀 OPTIMIZE: Simple app launch detection and performance improvements  
0dd3fcc Complete system update: AI fixes, intelligent locators, and comprehensive improvements
8c437b1 Fix AI command conversion order and follower device execution
5610575 🔧 MAJOR FIX: Duplicate follower mirrors & coordinate scaling
```

**🚀 Total Improvements:** 5 major commits with 650+ lines of enhancements including UI overhaul, performance optimizations, AI bypass implementation, screenshots gallery, and critical bug fixes.
- **Fixed**: "Error starting commander mode" when devices are already connected
- **Improved**: Commander mode now gracefully handles already-active sessions
- **Enhanced**: Better error messaging and automatic session management
- **Smart**: Auto-switches commander between devices without throwing errors

### 👑 Commander Mode with Quick Swap (NEW!)
- **Real-Time Mirroring:** Live screen mirroring of commander device with follower devices displayed in background
- **Commander Dropdown:** Top-left dropdown on mirror screen for quick commander device changes
- **One-Click Swap:** Select any connected device to instantly make it the new commander
- **Visual Indicators:** Commander badge (👑) on device cards and mirror screen
- **Auto-Synchronization:** WebSocket-based real-time updates across all components
- **Touch Broadcasting:** Tap commander screen, all followers execute the same action
- **Seamless Transitions:** Smooth commander swaps with automatic follower re-assignment
- **Button Updates:** "Connect All" and "Select All" for clearer bulk operations

### 🤖 Multi-AI Provider Support
- **7 AI Providers:** OpenAI, Gemini, Claude, Copilot, Groq, Cohere, Mistral AI
- **Model Selection:** Choose specific models for each provider (GPT-4 Turbo, Claude 3.5 Sonnet, Llama 3 70B, etc.)
- **Smart Defaults:** Auto-selects best model if not specified (marked with ⭐)
- **Revamped UI:** Modern Settings interface with provider cards, model dropdowns, and help sections
- **Free Tiers:** Gemini, Groq, and Cohere offer generous free tiers for testing
- **Performance Hints:** UI shows speed/cost comparisons (Groq = fastest, Claude = best reasoning)

### ✨ Enhanced AI Capabilities
- **Multi-Platform Intelligence:** Single AI command generates platform-specific actions for iOS and Android
- **Simultaneous Execution:** All devices execute at the same time, not sequentially
- **Error Visibility:** AI errors (quota limits, auth failures) shown inline with results
- **Response Cleaning:** Automatically removes markdown and explanations from AI output
- **Cross-Platform Apps:** AI generates both iOS and Android app bundles (Settings, Camera, Chrome, etc.)

### 🎤 Improved Voice Input
- **Extended Listening:** 2-second silence detection for natural speech
- **Continuous Speech:** Speak multiple phrases with natural pauses
- **Live Transcription:** See your words accumulate in real-time
- **Complex Commands:** "launch settings scroll up launch camera go to google.com press home" works flawlessly
- **No Duplicates:** Fixed transcript accumulation for clean output

### 🔐 Settings Enhancements
- **Revamped AI Config Tab:** Professional card-based design with dark mode support
- **Dynamic API Key Input:** Field changes based on selected provider
- **Show/Hide Toggles:** Individual toggles for all 7 provider keys
- **Status Display:** Green success box showing current provider, model, and key preview
- **Quick Tips Section:** In-UI recommendations for choosing providers
- **Close Button:** Easy navigation back to main screen
- **Dark Mode:** Proper color schemes for light and dark themes

### 📝 Recording Improvements
- **AI Recording Editor:** Edit AI-generated recordings like manual ones
- **Format Conversion:** Seamlessly handles both string and array command formats
- **Save & Replay:** Edit, save, and replay AI-generated commands
- **Status Persistence:** Recording status preserved when navigating between screens

---

## 📜 License & Privacy

**Proprietary & Confidential.**
Devicely is currently in a controlled rollout phase. This NPM package provides the binary execution environment. Source code remains private under phase 2 & 3 of our roadmap.

**Privacy First:**
- All API keys stored locally on your machine
- No telemetry or data collection
- Commands executed directly on your devices
- No cloud dependencies for core functionality

For enterprise inquiries or commercial access, contact: **devicelyai@gmail.com**

---

<div align="center">

---

---

## 🤔 **Still curious?**

Mobile development has always been about juggling multiple devices, hunting for the right selectors, and repeating the same tests over and over. What if there was a more interesting way?

### **Give it a try:**

```bash
npm install -g devicely
devicely start
```

[📦 NPM Package](https://www.npmjs.com/package/devicely) • [🌐 Try it live](https://devicely-ai.vercel.app) • [📧 Questions: devicelyai@gmail.com](mailto:devicelyai@gmail.com)

*Built by developers who got tired of the same old mobile testing routine.*

**⭐ Star this repo if you find it interesting!**

</div>
