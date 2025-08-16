# AI Setup Guide: Enabling AI-Powered Content Organization

This guide explains how to set up AI API keys to enable intelligent content reorganization for your AZ-305 study notes.

## 🤖 AI Providers Supported

### Option 1: Anthropic Claude API (Recommended)
- **Model**: Claude 3.5 Sonnet (`claude-3-5-sonnet-20241022`)
- **Advantages**: Excellent at understanding context and technical content
- **Cost**: Pay-per-use, very reasonable for document organization
- **Quality**: Superior content organization and Azure service categorization

### Option 2: OpenAI API (Fallback)
- **Model**: GPT-4 Turbo Preview
- **Advantages**: Widely available, good general performance
- **Cost**: Pay-per-use
- **Quality**: Good content organization capabilities

## 🔧 Setup Instructions

### Step 1: Choose Your AI Provider

#### For Anthropic Claude (Recommended):
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://console.anthropic.com/account/keys)
4. Click "Create Key" and give it a name (e.g., "AZ305-Notes-Org")
5. Copy the API key (starts with `sk-ant-...`)

#### For OpenAI (Alternative):
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://platform.openai.com/account/api-keys)
4. Click "Create new secret key"
5. Copy the API key (starts with `sk-...`)

### Step 2: Add API Key to GitHub Repository

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/az305-study-notes`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add your secret:

   **For Anthropic Claude:**
   - Name: `ANTHROPIC_API_KEY`
   - Secret: Your Anthropic API key

   **For OpenAI:**
   - Name: `OPENAI_API_KEY`
   - Secret: Your OpenAI API key

6. Click **Add secret**

### Step 3: Test the Setup

1. Make a small change to your `az305.md` file
2. Commit and push the changes
3. Go to **Actions** tab in your repository
4. Watch the workflow run and check for AI processing messages

## 💰 Cost Estimates

### Anthropic Claude Pricing (Approximate)
- **Input**: ~$3.00 per 1M tokens
- **Output**: ~$15.00 per 1M tokens
- **Typical AZ-305 file**: ~2,000 tokens input, ~2,500 tokens output
- **Cost per reorganization**: ~$0.04-0.05

### OpenAI GPT-4 Pricing (Approximate)
- **Input**: ~$30.00 per 1M tokens
- **Output**: ~$60.00 per 1M tokens
- **Typical AZ-305 file**: ~2,000 tokens input, ~2,500 tokens output
- **Cost per reorganization**: ~$0.21

> **Note**: Actual costs may vary. Both services offer free tiers for initial testing.

## 🔒 Security Best Practices

### API Key Security
- ✅ **Never commit API keys to your repository**
- ✅ **Use GitHub Secrets for secure storage**
- ✅ **Regenerate keys periodically**
- ✅ **Monitor usage in your AI provider dashboard**

### Access Control
- ✅ **Limit key permissions** if possible
- ✅ **Set spending limits** in your AI provider account
- ✅ **Monitor usage regularly**

## 🚀 How It Works

Once configured, the AI-powered system will:

1. **Analyze your content** using advanced language models
2. **Understand Azure service relationships** and categorization
3. **Intelligently move misplaced items** to correct sections
4. **Preserve all formatting** and content exactly as written
5. **Provide superior organization** compared to simple alphabetical sorting

## 🛠️ Troubleshooting

### No AI Processing
- ✅ Check that secrets are properly set in GitHub
- ✅ Verify API key is valid and has sufficient credits
- ✅ Check workflow logs for error messages

### API Errors
- ✅ Verify API key format and validity
- ✅ Check your account usage limits
- ✅ Ensure sufficient credits/usage remaining

### Fallback Behavior
- If AI processing fails, the system automatically continues with local reorganization
- No data is lost, and basic organization still occurs

## 🎯 Expected Results

With AI processing enabled, you'll see:

- **Smarter content placement**: Azure services moved to their correct conceptual sections
- **Context-aware organization**: Related services grouped logically
- **Better categorization**: Items placed based on their primary function
- **Preserved content**: All your original text and formatting maintained

## 📞 Support

- **GitHub Issues**: Report problems in your repository
- **AI Provider Support**: Contact Anthropic or OpenAI for API-related issues
- **Documentation**: Check this guide and the main README for help

---

**Ready to supercharge your AZ-305 study notes with AI! 🚀**
