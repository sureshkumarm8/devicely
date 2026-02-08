// AI Providers Configuration
// Centralized configuration for all supported AI providers

const AI_PROVIDERS_CONFIG = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    icon: '🤖',
    description: 'GPT-4o and GPT-4 Turbo models',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', description: 'Fastest GPT-4 level, multimodal', default: true },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Affordable and fast' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Most capable GPT-4' },
      { id: 'gpt-4', name: 'GPT-4', description: 'High capability' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and cost-effective' },
    ],
    apiKeyLabel: 'OpenAI API Key',
    apiKeyPlaceholder: 'sk-proj-...',
    apiKeyPattern: /^sk-(proj-)?[A-Za-z0-9]{32,}$/,
    docsUrl: 'https://platform.openai.com/api-keys',
    docsLabel: 'OpenAI Platform',
  },
  
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    icon: '✨',
    description: 'Gemini 3, 2.5, and 2.0 models',
    models: [
      { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash Preview', description: 'Latest Gemini 3 - Fast', default: true },
      { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro Preview', description: 'Latest Gemini 3 - Most capable' },
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Stable 2.5 Flash, 1M tokens' },
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Stable 2.5 Pro, best reasoning' },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Fast and versatile' },
      { id: 'gemini-2.0-flash-001', name: 'Gemini 2.0 Flash 001', description: 'Stable 2.0 Flash (Jan 2025)' },
      { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', description: 'Auto-updated to latest Flash' },
      { id: 'gemini-pro-latest', name: 'Gemini Pro Latest', description: 'Auto-updated to latest Pro' },
    ],
    apiKeyLabel: 'Gemini API Key',
    apiKeyPlaceholder: 'AIza...',
    apiKeyPattern: /^AIza[A-Za-z0-9_-]{35}$/,
    docsUrl: 'https://aistudio.google.com/apikey',
    docsLabel: 'Google AI Studio',
  },
  
  claude: {
    id: 'claude',
    name: 'Anthropic Claude',
    icon: '🧠',
    description: 'Claude 3.5 Sonnet and Claude 3 models',
    models: [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Latest)', description: 'Best overall, Oct 2024', default: true },
      { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet', description: 'Previous version' },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', description: 'Fastest 3.5 version' },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', description: 'Most powerful' },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', description: 'Balanced performance' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', description: 'Fastest, most compact' },
    ],
    apiKeyLabel: 'Anthropic API Key',
    apiKeyPlaceholder: 'sk-ant-...',
    apiKeyPattern: /^sk-ant-[A-Za-z0-9_-]{95,}$/,
    docsUrl: 'https://console.anthropic.com/account/keys',
    docsLabel: 'Anthropic Console',
  },
  
  copilot: {
    id: 'copilot',
    name: 'GitHub Copilot',
    icon: '🐙',
    description: 'GitHub Copilot AI models',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', description: 'Latest multimodal', default: true },
      { id: 'gpt-4', name: 'GPT-4', description: 'High capability' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast responses' },
    ],
    apiKeyLabel: 'GitHub Token',
    apiKeyPlaceholder: 'ghp_...',
    apiKeyPattern: /^(ghp_|gho_|ghu_|ghs_|ghr_)[A-Za-z0-9]{36,}$/,
    docsUrl: 'https://github.com/settings/tokens',
    docsLabel: 'GitHub Tokens',
  },
  
  groq: {
    id: 'groq',
    name: 'Groq',
    icon: '⚡',
    description: 'Ultra-fast LLM inference',
    models: [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', description: 'Latest Llama, best quality', default: true },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', description: 'Fastest responses' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', description: '32K context' },
      { id: 'gemma2-9b-it', name: 'Gemma 2 9B', description: 'Google model' },
    ],
    apiKeyLabel: 'Groq API Key',
    apiKeyPlaceholder: 'gsk_...',
    apiKeyPattern: /^gsk_[A-Za-z0-9]{52}$/,
    docsUrl: 'https://console.groq.com/keys',
    docsLabel: 'Groq Console',
  },
  
  cohere: {
    id: 'cohere',
    name: 'Cohere',
    icon: '🌊',
    description: 'Enterprise-grade AI',
    models: [
      { id: 'command-r-plus', name: 'Command R+', description: 'Most capable', default: true },
      { id: 'command-r', name: 'Command R', description: 'Balanced' },
      { id: 'command', name: 'Command', description: 'Fast' },
    ],
    apiKeyLabel: 'Cohere API Key',
    apiKeyPlaceholder: 'Co...',
    apiKeyPattern: /^[A-Za-z0-9]{40}$/,
    docsUrl: 'https://dashboard.cohere.com/api-keys',
    docsLabel: 'Cohere Dashboard',
  },
  
  mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    icon: '🌬️',
    description: 'European AI excellence',
    models: [
      { id: 'mistral-large-latest', name: 'Mistral Large Latest', description: 'Top-tier flagship model', default: true },
      { id: 'mistral-small-latest', name: 'Mistral Small Latest', description: 'Cost-effective and fast' },
      { id: 'codestral-latest', name: 'Codestral Latest', description: 'Specialized for code' },
      { id: 'mistral-embed', name: 'Mistral Embed', description: 'Embeddings model' },
    ],
    apiKeyLabel: 'Mistral API Key',
    apiKeyPlaceholder: 'Enter API key',
    apiKeyPattern: /^[A-Za-z0-9]{32,}$/,
    docsUrl: 'https://console.mistral.ai/api-keys',
    docsLabel: 'Mistral Console',
  },
};

// Get default model for a provider
function getDefaultModel(providerId) {
  const provider = AI_PROVIDERS_CONFIG[providerId];
  if (!provider) return null;
  
  const defaultModel = provider.models.find(m => m.default);
  return defaultModel ? defaultModel.id : provider.models[0].id;
}

// Validate API key format
function validateApiKey(providerId, apiKey) {
  const provider = AI_PROVIDERS_CONFIG[providerId];
  if (!provider || !apiKey) return false;
  
  return provider.apiKeyPattern.test(apiKey);
}

// Get provider list for frontend
function getProvidersList() {
  return Object.values(AI_PROVIDERS_CONFIG).map(provider => ({
    id: provider.id,
    name: provider.name,
    icon: provider.icon,
    description: provider.description,
  }));
}

// Get models for a specific provider
function getProviderModels(providerId) {
  const provider = AI_PROVIDERS_CONFIG[providerId];
  return provider ? provider.models : [];
}

module.exports = {
  AI_PROVIDERS_CONFIG,
  getDefaultModel,
  validateApiKey,
  getProvidersList,
  getProviderModels,
};
