const express = require('express');
const verifyProof = require('../utils/verifyProof');
const merkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());
const MERKLE_ROOT = new merkleTree(niceList).getRoot()
// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix


app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  //const body = req.body;
  const name = req.body.name;
  const proof = req.body.proof;
  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT)
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
