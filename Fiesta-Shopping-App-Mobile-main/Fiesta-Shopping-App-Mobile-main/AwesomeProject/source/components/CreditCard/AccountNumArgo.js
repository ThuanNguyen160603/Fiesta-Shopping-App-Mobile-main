function cutStringIntoEqualParts(message, numParts) {
    const length = message.length;
    const minPartLength = Math.floor(length / numParts);
    const parts = [];
  
    let startIndex = 0;
  
    for (let i = 0; i < numParts; i++) {
      const partLength = i < length % numParts ? minPartLength + 1 : minPartLength;
      const endIndex = startIndex + partLength;
      parts.push(message.slice(startIndex, endIndex));
      startIndex = endIndex;
    }
    return parts.join(' ');
  }
  export default cutStringIntoEqualParts;