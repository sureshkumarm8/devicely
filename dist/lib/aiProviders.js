// AI Provider Abstraction Layer - Enhanced Multi-Provider Support
// Supports: OpenAI, Google Gemini, Anthropic Claude, GitHub Copilot, Groq, Cohere, Mistral AI

const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Anthropic } = require('@anthropic-ai/sdk');
const { getPackageId, APP_MAPPINGS } = require('./appMappings');

class AIProviderManager {
  constructor() {
    this.provider = process.env.AI_PROVIDER || 'gemini';
    this.model = process.env.AI_MODEL || null; // Auto-select default if null
    this.initializeProviders();
  }

  initializeProviders() {
    // OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }

    // Google Gemini
    if (process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }

    // Anthropic Claude
    if (process.env.CLAUDE_API_KEY) {
      this.claude = new Anthropic({
        apiKey: process.env.CLAUDE_API_KEY,
      });
    }

    // GitHub Copilot
    if (process.env.GITHUB_TOKEN) {
      this.copilot = new OpenAI({
        apiKey: process.env.GITHUB_TOKEN,
        baseURL: 'https://api.githubcopilot.com',
      });
    }

    // Groq (ultra-fast inference)
    if (process.env.GROQ_API_KEY) {
      this.groq = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
      });
    }

    // Cohere
    if (process.env.COHERE_API_KEY) {
      this.cohere = new OpenAI({
        apiKey: process.env.COHERE_API_KEY,
        baseURL: 'https://api.cohere.ai/v1',
      });
    }

    // Mistral AI
    if (process.env.MISTRAL_API_KEY) {
      this.mistral = new OpenAI({
        apiKey: process.env.MISTRAL_API_KEY,
        baseURL: 'https://api.mistral.ai/v1',
      });
    }
  }

  getSystemPrompt(platform = null) {
    // Generate app list based on platform
    let appListSection = '';
    
    if (platform === 'both') {
      // Multi-platform mode - use generic app names
      const commonApps = Object.keys(APP_MAPPINGS)
        .filter(app => APP_MAPPINGS[app].ios && APP_MAPPINGS[app].android)
        .slice(0, 30);
      
      appListSection = `\n\nMULTI-PLATFORM MODE (iOS + Android devices)
Available apps: ${commonApps.join(', ')}

IMPORTANT: Use generic app names (e.g., "launch settings", "launch chrome")
The system will automatically convert to platform-specific package IDs:
${commonApps.slice(0, 15).map(app => `- ${app} -> iOS: ${APP_MAPPINGS[app].ios} / Android: ${APP_MAPPINGS[app].android}`).join('\n')}

Commands will execute SIMULTANEOUSLY on all devices with correct package IDs.
`;
    } else if (platform) {
      const availableApps = Object.keys(APP_MAPPINGS)
        .filter(app => APP_MAPPINGS[app][platform])
        .slice(0, 50);
      
      appListSection = `\n\nPLATFORM: ${platform.toUpperCase()}
Available apps for ${platform}: ${availableApps.join(', ')}

APP PACKAGE MAPPINGS:
When user says "launch chrome", "open chrome", etc., use the correct package ID:
${availableApps.slice(0, 20).map(app => `- ${app} -> launch ${APP_MAPPINGS[app][platform]}`).join('\n')}
`;
    }
    
    return `You are a mobile device automation command converter. Convert natural language requests into executable commands for iOS and Android devices.

Available commands (work on both iOS & Android):
- launch <app_name>: Launch an app using generic name (e.g., "launch settings", "launch chrome")
- kill <app_name>: Close/force stop an app
- home: Go to home screen (press home button)
- back: Navigate back (Android/iOS)
- url <url>: Open URL in browser
- click <text>: Click on a button or element by visible text
- click <x,y>: Click at specific coordinates (e.g., click 500,1000)
- tap <text/coords>: Same as click
- longpress <text/coords>: Long press on element or coordinates
- swipe <direction>: Swipe up/down/left/right (use for scrolling)
- type <text>: Type text into focused field (just the text, no "type" prefix)
- screenshot: Take screenshot
- restart: Restart device
- rotate <left/right/portrait/landscape>: Rotate screen

iOS-specific commands:
- darkmode/lightmode: Change appearance
- airplane <on/off>: Toggle airplane mode
- wifi <on/off>: Toggle WiFi
- volume <up/down/mute>: Control volume

Android-specific commands:
- getLocators: Get all interactive elements on current screen
- recent: Open recent apps
- notifications: Open notification panel
- quicksettings: Open quick settings
${appListSection}

COMMON PHRASE MAPPINGS:
- "scroll up" OR "scroll down" -> swipe up OR swipe down
- "go to <url>" OR "open <url>" OR "visit <url>" -> url https://<url>
- "press home" OR "go home" OR "home button" -> home
- "open settings" OR "launch settings" -> launch settings
- "open camera" OR "launch camera" -> launch camera

Examples:
- "open chrome" -> launch chrome
- "launch settings" -> launch settings
- "open camera" -> launch camera
- "scroll up" -> swipe up
- "scroll down" -> swipe down
- "click on the login button" -> click Login
- "tap at center of screen" -> click 540,1000
- "swipe down" -> swipe down
- "type hello world" -> hello world
- "take a screenshot" -> screenshot
- "go back" -> back
- "press home" -> home
- "go to google.com" -> url https://www.google.com
- "visit youtube.com" -> url https://www.youtube.com
- "launch Chrome and search google.com" -> launch chrome
WAIT 3000
url https://www.google.com
- "launch settings scroll up launch camera go to google.com press home" ->
launch settings
WAIT 3000
swipe up
WAIT 1000
home
WAIT 500
launch camera
WAIT 3000
home
WAIT 500
url https://www.google.com
WAIT 2000
home

Convert this request to commands: "{INPUT}"

CRITICAL RULES - YOU MUST FOLLOW THESE EXACTLY:
1. Output ONLY executable commands, one per line
2. NO explanations, NO markdown code blocks, NO comments, NO extra text
3. For multi-step actions, insert WAIT <milliseconds> between commands
4. Use GENERIC app names (e.g., "launch settings", "launch chrome", "launch camera")
5. Do NOT use platform-specific package IDs - use simple app names
6. The system will automatically convert to correct package IDs for each platform
5. For URLs, always use: url https://example.com
6. For scrolling, use: swipe up OR swipe down (never "scroll")
7. For text input, output ONLY the text (never include "type" prefix)
8. For home button, output: home (never "press home" or "go home")
9. WAIT timings: apps=3000ms, pages=2000ms, UI=1000ms, quick=500ms
10. Parse compound requests into individual steps with WAIT between each

OUTPUT FORMAT EXAMPLE:
launch com.apple.Preferences
WAIT 3000
swipe up
WAIT 1000
home

DO NOT include any other text. Start your response with the first command.`;
  }

  async convertCommand(text, platform = null, providerOverride = null) {
    const provider = providerOverride || this.provider;
    
    try {
      switch (provider) {
        case 'openai':
          return await this.convertWithOpenAI(text, platform);
        case 'gemini':
          return await this.convertWithGemini(text, platform);
        case 'claude':
          return await this.convertWithClaude(text, platform);
        case 'copilot':
          return await this.convertWithCopilot(text, platform);
        case 'groq':
          return await this.convertWithGroq(text, platform);
        case 'cohere':
          return await this.convertWithCohere(text, platform);
        case 'mistral':
          return await this.convertWithMistral(text, platform);
        default:
          throw new Error(`Unknown AI provider: ${provider}`);
      }
    } catch (error) {
      console.error(`Error with ${provider}:`, error.message);
      throw new Error(`AI conversion failed (${provider}): ${error.message}`);
    }
  }

  // Get model to use (from env or default)
  getModelForProvider(provider) {
    // If specific model is set, use it
    if (this.model) return this.model;
    
    // Otherwise use defaults (optimized for speed)
    const defaults = {
      openai: 'gpt-4o-mini',             // Faster than gpt-4o
      gemini: 'gemini-2.5-flash',        // Fast and reliable
      claude: 'claude-3-5-sonnet-20241022',
      copilot: 'gpt-4o',
      groq: 'llama-3.3-70b-versatile',
      cohere: 'command-r-plus',
      mistral: 'mistral-large-latest',
    };
    
    return defaults[provider] || 'gpt-4';
  }

  async convertWithOpenAI(text, platform = null) {
    if (!this.openai) {
      throw new Error('OpenAI not configured');
    }

    const model = this.getModelForProvider('openai');

    const response = await this.openai.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: this.getSystemPrompt(platform) },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    let convertedText = response.choices[0].message.content.trim();
    convertedText = this.cleanAIResponse(convertedText);
    
    return convertedText;
  }

  async convertWithGemini(text, platform = null) {
    if (!this.gemini) {
      throw new Error('Gemini not configured');
    }

    let modelName = this.getModelForProvider('gemini');
    
    try {
      // Use default Gemini config for best accuracy
      const model = this.gemini.getGenerativeModel({ model: modelName });
      
      // Build prompt and sanitize for Gemini API (requires ASCII-safe ByteString)
      const rawPrompt = this.getSystemPrompt(platform).replace('{INPUT}', text);
      
      // Remove ALL non-ASCII characters that could cause ByteString errors
      const sanitizedPrompt = rawPrompt
        .replace(/[^\x00-\x7F]/g, ' ')  // Replace non-ASCII with spaces
        .replace(/\s+/g, ' ')             // Normalize multiple spaces
        .trim();
      
      const result = await model.generateContent(sanitizedPrompt);
      const response = await result.response;
      let convertedText = response.text().trim();

      return this.cleanAIResponse(convertedText);
    } catch (error) {
      // If the model fails, try with a faster fallback
      if (modelName !== 'gemini-2.5-flash') {
        console.warn(`Gemini model ${modelName} failed, falling back to gemini-2.5-flash`);
        const fallbackModel = this.gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const prompt = this.getSystemPrompt(platform).replace('{INPUT}', text);
        const sanitizedPrompt = prompt.replace(/[^\x00-\x7F]/g, " ").replace(/\s+/g, ' ').trim();
        const result = await fallbackModel.generateContent(sanitizedPrompt);
        const response = await result.response;
        return this.cleanAIResponse(response.text().trim());
      }
      throw error;
    }
  }

  async convertWithCopilot(text, platform = null) {
    if (!this.copilot) {
      throw new Error('GitHub Copilot not configured');
    }

    const model = this.getModelForProvider('copilot');

    const response = await this.copilot.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: this.getSystemPrompt(platform) },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 500,
    });
    
    let convertedText = response.choices[0].message.content.trim();
    convertedText = this.cleanAIResponse(convertedText);
    
    return convertedText;
  }

  async convertWithClaude(text, platform = null) {
    if (!this.claude) {
      throw new Error('Claude not configured');
    }

    const model = this.getModelForProvider('claude');
    const systemPrompt = this.getSystemPrompt(platform);
    
    const response = await this.claude.messages.create({
      model: model,
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        { role: 'user', content: text }
      ],
      temperature: 0.3,
    });
    
    let convertedText = response.content[0].text.trim();
    convertedText = this.cleanAIResponse(convertedText);
    
    return convertedText;
  }

  async convertWithGroq(text, platform = null) {
    if (!this.groq) {
      throw new Error('Groq not configured');
    }

    const model = this.getModelForProvider('groq');

    const response = await this.groq.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: this.getSystemPrompt(platform) },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    let convertedText = response.choices[0].message.content.trim();
    convertedText = this.cleanAIResponse(convertedText);
    
    return convertedText;
  }

  async convertWithCohere(text, platform = null) {
    if (!this.cohere) {
      throw new Error('Cohere not configured');
    }

    const model = this.getModelForProvider('cohere');

    const response = await this.cohere.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: this.getSystemPrompt(platform) },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    let convertedText = response.choices[0].message.content.trim();
    convertedText = this.cleanAIResponse(convertedText);
    
    return convertedText;
  }

  async convertWithMistral(text, platform = null) {
    if (!this.mistral) {
      throw new Error('Mistral AI not configured');
    }

    const model = this.getModelForProvider('mistral');

    const response = await this.mistral.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: this.getSystemPrompt(platform) },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    let convertedText = response.choices[0].message.content.trim();
    convertedText = this.cleanAIResponse(convertedText);
    
    return convertedText;
  }
  
  // Clean up AI responses - remove markdown, explanations, etc.
  cleanAIResponse(text) {
    // Remove markdown code blocks
    text = text.replace(/```[\s\S]*?```/g, '').trim();
    text = text.replace(/```/g, '').trim();
    
    // Remove any lines that look like explanations (starting with explanatory text)
    const lines = text.split('\n');
    const cleanedLines = lines.filter(line => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      
      // Keep lines that are commands or WAIT
      if (trimmed.startsWith('launch ')) return true;
      if (trimmed.startsWith('kill ')) return true;
      if (trimmed === 'home') return true;
      if (trimmed === 'back') return true;
      if (trimmed.startsWith('url ')) return true;
      if (trimmed.startsWith('click ')) return true;
      if (trimmed.startsWith('tap ')) return true;
      if (trimmed.startsWith('longpress ')) return true;
      if (trimmed.startsWith('swipe ')) return true;
      if (trimmed.startsWith('WAIT ')) return true;
      if (trimmed.startsWith('screenshot')) return true;
      if (trimmed.startsWith('restart')) return true;
      if (trimmed.startsWith('rotate ')) return true;
      if (trimmed.startsWith('darkmode')) return true;
      if (trimmed.startsWith('lightmode')) return true;
      if (trimmed.startsWith('airplane ')) return true;
      if (trimmed.startsWith('wifi ')) return true;
      if (trimmed.startsWith('volume ')) return true;
      if (trimmed === 'getLocators') return true;
      if (trimmed === 'recent') return true;
      if (trimmed === 'notifications') return true;
      if (trimmed === 'quicksettings') return true;
      
      // If it doesn't start with a known command, it might be text to type
      // Check if previous line was a command that expects text input
      return true; // For now, include it (could be text to type)
    });
    
    return cleanedLines.join('\n').trim();
  }

  getAvailableProviders() {
    const available = [];
    
    if (this.openai) available.push({ id: 'openai', name: 'OpenAI', icon: '🤖' });
    if (this.gemini) available.push({ id: 'gemini', name: 'Google Gemini', icon: '✨' });
    if (this.claude) available.push({ id: 'claude', name: 'Anthropic Claude', icon: '🧠' });
    if (this.copilot) available.push({ id: 'copilot', name: 'GitHub Copilot', icon: '🐙' });
    if (this.groq) available.push({ id: 'groq', name: 'Groq', icon: '⚡' });
    if (this.cohere) available.push({ id: 'cohere', name: 'Cohere', icon: '🌊' });
    if (this.mistral) available.push({ id: 'mistral', name: 'Mistral AI', icon: '🌬️' });
    
    return available;
  }

  setProvider(provider, model = null) {
    const available = this.getAvailableProviders().map(p => p.id);
    if (available.includes(provider)) {
      this.provider = provider;
      if (model) {
        this.model = model;
      }
      return true;
    }
    return false;
  }

  getCurrentProvider() {
    return {
      id: this.provider,
      name: this.getProviderName(this.provider),
      model: this.model || this.getModelForProvider(this.provider),
      available: this.getAvailableProviders(),
    };
  }

  getProviderName(providerId) {
    const names = {
      openai: 'OpenAI',
      gemini: 'Google Gemini',
      claude: 'Anthropic Claude',
      copilot: 'GitHub Copilot',
      groq: 'Groq',
      cohere: 'Cohere',
      mistral: 'Mistral AI',
    };
    return names[providerId] || 'Unknown';
  }
}

module.exports = AIProviderManager;
