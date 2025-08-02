# AZ-305 Study Notes Auto-Organization System

This repository contains an automated system that reorganizes your AZ-305 certification study notes every time you push changes to the `az305.md` file.

## 🤖 Automated Features

The system automatically performs the following tasks when you commit changes to `az305.md`:

### ✅ Content Organization
- **Section-based organization**: Moves content to appropriate sections (Identity & Security, Data Storage, Business Continuity, Infrastructure Design, Monitoring & Governance, References & Links)
- **Alphabetical sorting**: Sorts bullet points alphabetically within each section
- **Duplicate removal**: Removes duplicate entries and links
- **Table of Contents**: Auto-updates the ToC based on current headings

### ✅ Markdown Formatting
- **Consistent styling**: Enforces `##` for main headings, `###` for subheadings, `-` for bullet points
- **Proper spacing**: Adds blank lines around headings and lists for better readability
- **Link formatting**: Maintains proper markdown link formatting
- **Code formatting**: Preserves inline code formatting for commands and technical terms

### ✅ File Management
- **Backup creation**: Creates timestamped backups before making changes
- **Version control**: Commits changes with detailed commit messages
- **Timestamp updates**: Updates the "Last updated" comment with current date

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
