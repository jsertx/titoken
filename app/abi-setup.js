const fs = require("fs");
const contractAbiFilePath = "../abi/__contracts_Ballot_sol_Ballot.abi";

if(!fs.existsSync(contractAbiFilePath)){
    console.log("abi file not found at", contractAbiFilePath)
    console.log("please run 'npm run build:abi' at the root of the project")
    process.exit();
}

const abi = fs.readFileSync(contractAbiFilePath)
fs.writeFileSync("./lib/contract/abi.js", `export default ${abi}`);