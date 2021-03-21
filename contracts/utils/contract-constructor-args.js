const [nodePath, script, ...proposals] = process.argv

const toHex = (str) => {
    let result = '';
    for (let i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return `0x${result.padStart(64, 0)}`;
}

const contractArg = JSON.stringify(proposals.map(toHex))

console.log(contractArg)