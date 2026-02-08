// AI Provider Abstraction Layer - Enhanced Multi-Provider Support
// Supports: OpenAI, Google Gemini, Anthropic Claude, GitHub Copilot, Groq, Cohere, Mistral AI

const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Anthropic } = require('@anthropic-ai/sdk');
const { getPackageId, APP_MAPPINGS } = require('./appMappings');
const { AI_PROVIDERS_CONFIG, getDefaultModel } = require('./aiProvidersConfig');

class AIProviderManager {
  constructor() {
    this.provider = process.env.AI_PROVIDER || 'gemini';
    this.model = process.env.AI_MODEL || null; // null = use default for provider
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
