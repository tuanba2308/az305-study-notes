#!/usr/bin/env node

const fs = require('fs');

function fixMarkdownLinting() {
    const filePath = 'az305.md';
    
    if (!fs.existsSync(filePath)) {
        console.log('az305.md file not found');
        return;
    }

    console.log('Fixing markdown formatting issues...');
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix markdown formatting issues
    content = fixMarkdownFormatting(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('Markdown formatting fixed!');
}

function fixMarkdownFormatting(content) {
    let lines = content.split('\n');
    let formatted = [];
    
    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i];
        const nextLine = lines[i + 1] || '';
        const prevLine = lines[i - 1] || '';
        
        // Handle headings - MD022: Headings should be surrounded by blank lines
        if (currentLine.match(/^#{1,6}\s/)) {
            // Add blank line before heading if previous line isn't empty
            if (i > 0 && prevLine.trim() !== '' && !prevLine.match(/^#{1,6}\s/)) {
                formatted.push('');
            }
            
            formatted.push(currentLine);
            
            // Add blank line after heading if next line isn't empty and isn't another heading
            if (nextLine.trim() !== '' && !nextLine.match(/^#{1,6}\s/) && !nextLine.match(/^\s*$/)) {
                formatted.push('');
            }
        }
        // Handle lists - MD032: Lists should be surrounded by blank lines
        else if (currentLine.match(/^[-*]\s/)) {
            // Add blank line before list if previous line isn't empty and isn't a list item
            if (i > 0 && prevLine.trim() !== '' && !prevLine.match(/^[-*]\s/) && !formatted[formatted.length - 1].match(/^\s*$/)) {
                formatted.push('');
            }
            
            formatted.push(currentLine);
            
            // Add blank line after list if next line isn't empty and isn't a list item
            if (nextLine.trim() !== '' && !nextLine.match(/^[-*]\s/) && i === lines.length - 1 || 
                (i < lines.length - 1 && !nextLine.match(/^[-*]\s/) && nextLine.trim() !== '')) {
                // Check if we're at the end of a list
                let isEndOfList = true;
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].match(/^[-*]\s/)) {
                        isEndOfList = false;
                        break;
                    }
                    if (lines[j].trim() !== '') {
                        break;
                    }
                }
                if (isEndOfList && nextLine.trim() !== '') {
                    formatted.push(currentLine);
                    formatted.push('');
                    continue;
                }
            }
        }
        else {
            formatted.push(currentLine);
        }
    }
    
    // Remove excessive blank lines (more than 2 consecutive)
    let cleaned = [];
    let blankLineCount = 0;
    
    for (const line of formatted) {
        if (line.trim() === '') {
            blankLineCount++;
            if (blankLineCount <= 2) {
                cleaned.push(line);
            }
        } else {
            blankLineCount = 0;
            cleaned.push(line);
        }
    }
    
    return cleaned.join('\n');
}

// Run the formatter
if (require.main === module) {
    fixMarkdownLinting();
}

module.exports = { fixMarkdownLinting };
