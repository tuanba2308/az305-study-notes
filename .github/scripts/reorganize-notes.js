#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Main reorganization function
function reorganizeAZ305Notes() {
    const filePath = 'az305.md';
    
    if (!fs.existsSync(filePath)) {
        console.log('az305.md file not found');
        return;
    }

    console.log('Reorganizing AZ-305 notes...');
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove duplicate lines
    content = removeDuplicates(content);
    
    // Sort bullet points alphabetically
    content = sortBulletPoints(content);
    
    // Fix markdown formatting
    content = fixMarkdownFormatting(content);
    
    // Update timestamp
    content = updateTimestamp(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('AZ-305 notes reorganized successfully!');
}

function removeDuplicates(content) {
    const lines = content.split('\n');
    const seen = new Map();
    const uniqueLines = [];
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Skip empty lines and markdown comments for duplicate check
        if (trimmedLine === '' || trimmedLine.startsWith('<!--') || trimmedLine.startsWith('#')) {
            uniqueLines.push(line);
            continue;
        }
        
        // For bullet points, check for duplicates
        if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
            const cleanLine = trimmedLine.replace(/^[-*]\s*/, '').toLowerCase().trim();
            const linkMatch = cleanLine.match(/\[(.*?)\]/);
            const key = linkMatch ? linkMatch[1].toLowerCase() : cleanLine;
            
            if (!seen.has(key) && cleanLine.length > 0) {
                seen.set(key, line);
                uniqueLines.push(line);
            }
        } else {
            uniqueLines.push(line);
        }
    }
    
    return uniqueLines.join('\n');
}

function sortBulletPoints(content) {
    const sections = content.split(/(?=^##\s)/m);
    
    return sections.map(section => {
        const lines = section.split('\n');
        let result = [];
        let currentList = [];
        let inList = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.match(/^[-*]\s/)) {
                currentList.push(line);
                inList = true;
            } else {
                if (inList && currentList.length > 0) {
                    // Sort the current list alphabetically
                    currentList.sort((a, b) => {
                        const aText = a.replace(/^[-*]\s*/, '').toLowerCase();
                        const bText = b.replace(/^[-*]\s*/, '').toLowerCase();
                        
                        // Handle links - sort by link text, not URL
                        const aLinkMatch = aText.match(/\[(.*?)\]/);
                        const bLinkMatch = bText.match(/\[(.*?)\]/);
                        
                        const aSort = aLinkMatch ? aLinkMatch[1] : aText;
                        const bSort = bLinkMatch ? bLinkMatch[1] : bText;
                        
                        return aSort.localeCompare(bSort);
                    });
                    result.push(...currentList);
                    currentList = [];
                    inList = false;
                }
                result.push(line);
            }
        }
        
        // Handle any remaining list items
        if (currentList.length > 0) {
            currentList.sort((a, b) => {
                const aText = a.replace(/^[-*]\s*/, '').toLowerCase();
                const bText = b.replace(/^[-*]\s*/, '').toLowerCase();
                
                const aLinkMatch = aText.match(/\[(.*?)\]/);
                const bLinkMatch = bText.match(/\[(.*?)\]/);
                
                const aSort = aLinkMatch ? aLinkMatch[1] : aText;
                const bSort = bLinkMatch ? bLinkMatch[1] : bText;
                
                return aSort.localeCompare(bSort);
            });
            result.push(...currentList);
        }
        
        return result.join('\n');
    }).join('');
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
            if (nextLine.trim() !== '' && !nextLine.match(/^#{1,6}\s/)) {
                formatted.push('');
            }
        }
        // Handle lists - MD032: Lists should be surrounded by blank lines
        else if (currentLine.match(/^[-*]\s/)) {
            // Add blank line before first list item
            if (i > 0 && prevLine.trim() !== '' && !prevLine.match(/^[-*]\s/) && 
                (formatted.length === 0 || formatted[formatted.length - 1].trim() !== '')) {
                formatted.push('');
            }
            
            formatted.push(currentLine);
            
            // Add blank line after last list item
            if (nextLine.trim() !== '' && !nextLine.match(/^[-*]\s/)) {
                formatted.push('');
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

function updateTimestamp(content) {
    const timestamp = new Date().toISOString().split('T')[0];
    const updatedContent = content.replace(
        /<!-- Last updated: .* -->/,
        `<!-- Last updated: Auto-updated on ${timestamp} -->`
    );
    
    return updatedContent;
}

// Run the reorganization
if (require.main === module) {
    reorganizeAZ305Notes();
}

module.exports = { reorganizeAZ305Notes };
