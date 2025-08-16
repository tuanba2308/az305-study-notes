#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import fetch for Node.js (fallback for older versions)
let fetch;
try {
    fetch = globalThis.fetch || require('node-fetch');
} catch (error) {
    console.log('⚠️  fetch not available. AI processing will be skipped.');
}

// AI-powered content organization function using multiple AI providers
async function processWithAI(content) {
    try {
        console.log('🤖 Sending content to AI for intelligent reorganization...');
        
        // Check if fetch is available
        if (!fetch) {
            console.log('⚠️  Fetch API not available. Skipping AI processing step.');
            return content;
        }
        
        // Try Anthropic Claude first, then fallback to OpenAI
        const anthropicKey = process.env.ANTHROPIC_API_KEY;
        const openaiKey = process.env.OPENAI_API_KEY;
        
        if (anthropicKey) {
            console.log('🔮 Using Anthropic Claude API for content reorganization...');
            return await processWithClaude(content, anthropicKey);
        } else if (openaiKey) {
            console.log('🧠 Using OpenAI API for content reorganization...');
            return await processWithOpenAI(content, openaiKey);
        } else {
            console.log('⚠️  No AI API keys found. Skipping AI processing step.');
            console.log('   Set ANTHROPIC_API_KEY or OPENAI_API_KEY environment variable to enable AI processing.');
            return content;
        }
        
    } catch (error) {
        console.log('❌ AI processing failed:', error.message);
        console.log('   Continuing with original content...');
        return content;
    }
}

// Process content using Anthropic Claude API (latest syntax)
async function processWithClaude(content, apiKey) {
    try {
        const prompt = createAIPrompt(content);
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022', // Latest Claude 3.5 Sonnet model
                max_tokens: 4000,
                temperature: 0.1,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Claude API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.content && data.content[0] && data.content[0].text) {
            console.log('✅ Claude AI processing completed successfully');
            return data.content[0].text;
        } else {
            throw new Error('Invalid response format from Claude API');
        }
        
    } catch (error) {
        console.log('❌ Claude API Error:', error.message);
        throw error;
    }
}

// Process content using OpenAI API (fallback)
async function processWithOpenAI(content, apiKey) {
    try {
        const prompt = createAIPrompt(content);
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert Azure solutions architect and technical writer specializing in AZ-305 certification content organization.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 4000,
                temperature: 0.1
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            console.log('✅ OpenAI processing completed successfully');
            return data.choices[0].message.content;
        } else {
            throw new Error('Invalid response format from OpenAI API');
        }
        
    } catch (error) {
        console.log('❌ OpenAI API Error:', error.message);
        throw error;
    }
}

// Create enhanced AI prompt for content reorganization
function createAIPrompt(content) {
    return `You are an expert Azure solutions architect helping to organize AZ-305 certification study notes.

TASK: Intelligently reorganize the following markdown content by moving items to their most appropriate sections.

AVAILABLE SECTIONS:
- **Identity & Security**: Azure AD, RBAC, Conditional Access, MFA, security features, compliance, governance, Key Vault
- **Data Storage**: Storage accounts, Blob storage, databases (SQL, Cosmos DB), backup solutions, data management, file services
- **Business Continuity**: Backup strategies, disaster recovery, high availability, Site Recovery, availability zones/sets
- **Infrastructure Design**: Compute services (VMs, App Service, AKS, containers), networking (VNet, VPN, Load Balancer), scaling
- **Monitoring & Governance**: Azure Monitor, Application Insights, policies, cost management, governance, Log Analytics
- **References & Links**: Documentation, external resources, study materials, certification guides

INTELLIGENT REORGANIZATION RULES:
1. **Smart categorization**: Move misplaced items to their most logical sections based on Azure service taxonomy
2. **Context awareness**: Consider service relationships (e.g., Azure Backup → Business Continuity)
3. **Preserve structure**: Maintain exact markdown formatting, bullet points, links, and hierarchy
4. **No content modification**: Do NOT change, add, or remove any existing text content
5. **Section integrity**: Keep related items grouped within their new correct sections
6. **Uncertainty handling**: If placement is ambiguous, leave in current section

SPECIAL HANDLING:
- Move Azure services to their primary function category
- Group related technologies together
- Maintain subsection organization within main sections
- Preserve all links, formatting, and metadata

CONTENT TO REORGANIZE:
${content}

Return the reorganized content with improved section placement while maintaining exact formatting:`;
}

// Main reorganization function
async function reorganizeAZ305Notes() {
    const filePath = 'az305.md';
    
    if (!fs.existsSync(filePath)) {
        console.log('az305.md file not found');
        return;
    }

    console.log('Reorganizing AZ-305 notes...');
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Step 1: Remove duplicate lines
    console.log('Step 1: Removing duplicates...');
    content = removeDuplicates(content);
    
    // Step 2: AI-powered content organization
    console.log('Step 2: AI-powered content organization...');
    content = await processWithAI(content);
    
    // Step 3: Sort bullet points alphabetically
    console.log('Step 3: Sorting bullet points alphabetically...');
    content = sortBulletPoints(content);
    
    // Step 4: Fix markdown formatting
    console.log('Step 4: Fixing markdown formatting...');
    content = fixMarkdownFormatting(content);
    
    // Step 5: Update timestamp
    console.log('Step 5: Updating timestamp...');
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
    reorganizeAZ305Notes()
        .then(() => console.log('Script completed successfully'))
        .catch(error => {
            console.error('Script failed:', error);
            process.exit(1);
        });
}

module.exports = { reorganizeAZ305Notes };
