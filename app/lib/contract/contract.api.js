import { ethers } from 'ethers';
import hex2ascii from 'hex2ascii';

export class ContractAPI {
  constructor({ address, abi, network }) {
    this.provider = new ethers.providers.EtherscanProvider(network, process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY);
    this.contract = new ethers.Contract(address, abi, this.provider);
  }

  async getSigner() {
   await ethereum.request({method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  }

  getWinnerName() {
    return this.contract.winnerName()
      .then(value => hex2ascii(value))
  }

  getProposals() {
    return this.contract.getProposals()
      .then(([names, votes]) => {
        const list = [];
        names.forEach((name, i)=>{
          list.push({
            name: hex2ascii(name),
            voteCount: votes[i].toNumber()
          })
        })
        return list;
      })
  }

  async getChairperson(){
    return this.contract.chairperson()
  }

  async giveRightToVote(ethAddress, signer){
    const contractWithSigner = await this.contract.connect(signer)
    return contractWithSigner.giveRightToVote(ethAddress);
  }


  async vote(participant, signer) {
    const contractWithSigner = await this.contract.connect(signer)
    return contractWithSigner.vote(participant);
  }

}

