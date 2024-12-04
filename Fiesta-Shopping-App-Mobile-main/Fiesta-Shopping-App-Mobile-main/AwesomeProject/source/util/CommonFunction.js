/**
 * 
 * @param {string} text 
 * @param {number} maxLineLength 
 * @param {number} maxLines 
 * @returns {string} 
 */
export function formatText(text, maxLineLength = 30, maxLines = 3) {
    const words = text.split(' ');
    let formattedText = '';
    let currentLine = '';
    
    for (const word of words) {
        if (currentLine.length + word.length + 1 <= maxLineLength) {
            currentLine += (currentLine.length > 0 ? ' ' : '') + word;
        } else {
            formattedText += currentLine + '\n';
            currentLine = word;
        }
    }
    
    formattedText += currentLine;
    
    const lines = formattedText.split('\n');
    if (lines.length > maxLines) {
        formattedText = lines.slice(0, maxLines).join('\n') + '...';
    }
    
    return formattedText;
}