# Security Policy

## Reporting a vulnerability

Please **do not open a public GitHub issue** for security problems.

Email **devicelyai@gmail.com** with:
- what you found and its impact
- steps to reproduce (with Devicely version, `devicely --version`, and OS)
- whether you'd like to be credited

What to expect:
- an acknowledgement within **3 working days**
- an assessment and planned fix date within **10 working days**
- a fix or mitigation for confirmed high-severity issues within **30 days**, faster when we can

We'll keep you updated, and credit you in the changelog if you want.

## Supported versions

| Version | Supported |
| :--- | :--- |
| Latest 2.4.x | ✅ |
| Older than the latest minor release | ❌ Please upgrade: `npm install -g devicely@latest` |

## Scope

In scope: the `devicely` npm package (local server, CLI, MCP server) and the hosted Command Center at https://devicely-ai.vercel.app.

Especially interesting: anything that lets a web page, another user on the network, or an untrusted process control devices or read data through the Devicely server without the user's consent.

Out of scope: vulnerabilities in third-party tools Devicely uses (adb, Xcode, WebDriverAgent, AI providers). Please report those upstream.

## How Devicely handles your data

See [docs/SECURITY_AND_PRIVACY.md](docs/SECURITY_AND_PRIVACY.md).
