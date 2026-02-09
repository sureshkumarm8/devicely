<div align="center">

# 📱✨ Devicely

### **Orchestrate Your Mobile World. AI-Powered. Infinitely Scalable.**

**The ultimate command center for mobile automation and multi-device orchestration.**

[![NPM Version](https://img.shields.io/npm/v/devicely?style=for-the-badge&color=CB3837)](https://www.npmjs.com/package/devicely)
[![License](https://img.shields.io/badge/license-Proprietary-blue?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey?style=for-the-badge)](https://devicely-ai.vercel.app)

[🚀 Quick Start](#-quick-start) • [✨ Key Features](#-the-devicely-advantage) • [🌌 Infinite Possibilities](#-glimpse-of-the-infinite) • [📟 CLI Reference](#-cli-reference)

---

### ⚡ **Automate at Scale, Not Just Execute.**

Devicely isn't just a tool; it's an **orchestrator**. It provides a unified, professional interface to control, automate, and inspect iOS and Android devices simultaneously using **Natural Language AI** and **Voice Commands**.

</div>

---

![Devicely Demo](DevicelyDemo.gif)

## 🌌 Glimpse of the Infinite

Devicely redefines what's possible with your mobile infrastructure. By bridging the gap between human intent and device execution, you can:

*   **🧪 Massive Parallel Testing:** Transform a 2-hour manual smoke test into a 5-minute automated broadcast across your entire device fleet.
*   **🤖 AI-Native QA:** Move beyond brittle selectors. Use natural language to navigate apps, verify UI, and find bugs across different screen sizes autonomously.
*   **🏢 Enterprise Device Labs:** Turn any desk or rack of physical devices into a private, web-accessible cloud lab for your entire global team.
*   **🔄 Instant Bug Reproduction:** Record a complex bug on one device and instantly "broadcast" those exact steps to every other device to see which OS versions are affected.
*   **🎤 Voice-Driven Automation:** Speak commands naturally and watch your entire device fleet respond in real-time.
*   **🔀 Cross-Platform Sync:** Run the same command on iOS and Android simultaneously with platform-specific intelligence.

---

## ✨ The Devicely Advantage

### 🤖 **AI-Native Interaction**
Stop hunting for element IDs. Devicely understands your intent.
*   **Natural Language Commands:** `"Open Instagram and find the search button"` or `"Take a screenshot on all Android devices"`.
*   **Voice Control:** Speak commands naturally with automatic silence detection and multi-phrase support.
*   **Context Awareness:** Automatically identifies buttons, inputs, and text across iOS and Android.
*   **7 AI Providers:** Choose from **OpenAI** 🤖, **Google Gemini** ✨, **Anthropic Claude** 🧠, **GitHub Copilot** 🐙, **Groq** ⚡, **Cohere** 🌊, or **Mistral AI** 🌬️.
*   **Model Selection:** Pick specific models (GPT-4 Turbo, Claude 3.5 Sonnet, Gemini 2.0 Flash, Llama 3 70B, etc.).
*   **Smart Error Handling:** Clear, actionable error messages displayed inline with results.

### 🎮 **Unified Command Center**
A single conductor for your entire device orchestra.
*   **Cross-Platform:** Native, low-latency support for **iOS 14+** and **Android 5+**.
*   **Parallel Execution:** Run the same action on 5, 50, or 100+ devices simultaneously with zero overhead.
*   **Synchronized Commands:** Execute platform-specific commands (different apps) on mixed device fleets at the exact same time.
*   **Live Feedback:** See real-time logs, status updates, and visual confirmations via high-speed WebSockets.
*   **API Key Management:** Secure credential storage with show/hide toggles for easy verification.

### 🔍 **Smart UI Inspector**
The most practical way to explore your apps.
*   **Visual Element Scan:** Instantly see all clickable, enabled, and visible elements.
*   **Point-and-Click Control:** Interact with devices directly through the inspector interface.
*   **Developer Friendly:** Export clean selectors and coordinates for your automation scripts.

### 🔴 **Record & Broadcast**
*   **Zero-Code Automation:** Record complex manual workflows (logins, checkouts, onboarding) and save them as reusable scripts.
*   **AI-Generated Recordings:** Voice or text commands automatically converted to replayable scripts.
*   **Fleet Replay:** Replay recorded flows on any single device or your entire laboratory at once.
*   **Edit & Refine:** Full editor for AI-generated and manual recordings with add, remove, and modify capabilities.

### 🎤 **Voice Commands**
*   **Hands-Free Operation:** Control your devices without touching a keyboard.
*   **Continuous Listening:** Speak naturally with pauses - 2-second silence detection auto-stops.
*   **Live Transcription:** See your words convert to commands in real-time.
*   **Complex Multi-Step:** Voice commands like "launch settings scroll up launch camera go to google.com press home" work seamlessly.

---

## 🚀 Quick Start

Get up and running in less than 60 seconds.

### 1. Installation
```bash
# Install Devicely globally via NPM
npm install -g devicely
```

### 2. Launch
```bash
# Start the command center
devicely start
```

**Visit `https://devicely-ai.vercel.app/` to enter your Command Center.**

### 3. Configure AI (Optional)
To enable natural language and voice commands:
1. Visit Settings ⚙️ → AI Configuration
2. Choose from **7 AI providers** with model selection
3. Add your API key (secured locally, never transmitted)
4. Start using AI: `"launch settings on all devices"`

**Free AI Options:** Gemini, Groq, and Cohere offer generous free tiers!

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

## 🆕 Latest Features (February 2026)

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

### **Ready to Scale Your Mobile Automation?**
[Install on NPM](https://www.npmjs.com/package/devicely) • [Visit Homepage](https://devicely-ai.vercel.app)

**Built with ❤️ for the next generation of Mobile Engineers.**

</div>
