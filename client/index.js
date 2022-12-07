const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList)

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const name = process.argv.slice(2).join(" ")
  console.log(name)
  if (typeof process.argv[3] !== "string") {
    console.log("Please enter valid name")
        process.exit()
      } 
let index = niceList.findIndex(x => x === name)
if (index < 0){
  console.log("The name isn't in the list")
  process.exit()
} 
 let proof = merkleTree.getProof(index)
  
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
   
    name,
    proof
  });

  console.log({ gift });
}

main();