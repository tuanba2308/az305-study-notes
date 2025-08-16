# AZ-305 Study Notes AI-Powered Auto-Organization System

This repository contains an advanced automated system that intelligently reorganizes your AZ-305 certification study notes using AI-powered content analysis every time you push changes to the `az305.md` file.

## 🤖 AI-Enhanced Automated Features

The system now includes **AI-powered content organization** that goes beyond simple sorting:

### ✅ **Smart Content Organization**
- **AI-Powered Section Placement**: Uses Anthropic Claude 3.5 Sonnet or OpenAI GPT-4 to intelligently move content to appropriate sections
- **Azure Service Taxonomy Understanding**: AI knows where Azure services belong (e.g., Azure Backup → Business Continuity)
- **Context-Aware Categorization**: Understands service relationships and dependencies
- **Intelligent Content Analysis**: Analyzes content meaning, not just keywords

### ✅ **Multi-AI Provider Support**
- **Primary**: Anthropic Claude 3.5 Sonnet API (`claude-3-5-sonnet-20241022`)
- **Fallback**: OpenAI GPT-4 Turbo API
- **Graceful Degradation**: Works without AI keys using local processing
- **Automatic Provider Selection**: Tries Anthropic first, falls back to OpenAI

### ✅ **Enhanced Processing Pipeline**

**Step 1**: Duplicate Removal  
**Step 2**: 🤖 **AI-Powered Intelligent Reorganization** ← **NEW!**  
**Step 3**: Alphabetical Sorting  
**Step 4**: Advanced Markdown Formatting  
**Step 5**: Timestamp Update

### ✅ **Traditional Features (Enhanced)**
- **Duplicate removal**: Removes duplicate entries and links
- **Alphabetical sorting**: Sorts bullet points within sections  
- **Markdown formatting**: Advanced formatting with proper spacing
- **Table of Contents**: Auto-updates based on current headings
- **Backup creation**: Creates timestamped backups before changes

## 📁 File Structure

```
.github/
├── workflows/
│   └── auto-reorganize.yml     # GitHub Actions workflow
└── scripts/
    ├── reorganize-notes.js     # Main reorganization logic
    └── format-markdown.js      # Markdown formatting fixes
az305.md                        # Your study notes (main file)
backups/                        # Automatic backups
```

## 🚀 How It Works

1. **Trigger**: When you push changes to `az305.md` or any `.md` file
2. **Processing**: 
   - Creates a backup of your current file
   - Removes duplicate entries
   - Sorts bullet points alphabetically
   - Fixes markdown formatting issues
   - Updates timestamps
3. **Commit**: Automatically commits the organized version back to your repository

## 📝 Usage Instructions

### Adding New Content

Simply add your new study notes anywhere in the `az305.md` file:

```markdown
## Identity & Security

- New Azure AD feature
- Some security best practice
- Azure Key Vault usage

## Data Storage

- Azure Cosmos DB pricing
- Blob storage tiers
```

### The system will automatically:
- Move content to the correct sections
- Sort items alphabetically
- Remove any duplicates
- Fix formatting issues
- Update the Table of Contents

### Manual Local Testing

You can test the reorganization locally before pushing:

```bash
# Run reorganization
node .github/scripts/reorganize-notes.js

# Run formatting fixes
node .github/scripts/format-markdown.js
```

## 🔧 Customization

### Modifying Sections

To add or modify sections, edit the main headers in `az305.md`:

```markdown
## Your New Section

Content here will be automatically organized.
```

### Adjusting Sorting

The sorting logic can be modified in `.github/scripts/reorganize-notes.js`:
- Change the `sortBulletPoints()` function for different sorting criteria
- Modify `removeDuplicates()` for different duplicate detection logic

## 📊 Workflow Status

The GitHub Actions workflow provides detailed status information:
- ✅ Backup created
- ✅ Changes detected/processed
- ✅ Reorganization tasks completed
- ✅ Files committed and pushed

## 🛠️ Troubleshooting

### Workflow Not Running
- Check that the workflow file is in `.github/workflows/`
- Verify you're pushing to the `main` or `master` branch
- Ensure the `az305.md` file exists

### Formatting Issues
- The system automatically fixes common markdown linting issues
- Manual formatting fixes can be applied by running the local scripts

### Backup Recovery
- Backups are stored in the `backups/` directory with timestamps
- To restore: `cp backups/az305_backup_YYYYMMDD_HHMMSS.md az305.md`

## 📈 Benefits

- **Consistency**: Maintains consistent formatting across all notes
- **Organization**: Keeps content properly sectioned and sorted
- **Time-saving**: No manual reorganization needed
- **Version control**: Full history of changes with detailed commit messages
- **Backup safety**: Automatic backups before any changes

---

**Happy studying for your AZ-305 certification! 🎯**
