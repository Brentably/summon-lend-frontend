import {ethers} from 'ethers'
import getContracts from '../helpers/getContracts'
import IConnection from '../types/types'

async function retrieve(tokenAddress: string, tokenId: string, connection: IConnection, updateNFTStatus: Function) {

updateNFTStatus(tokenAddress, tokenId, "retrieving")
const {walletAddress, chainID, signer} = connection
const [ManagerABI, ManagerAddress] = getContracts(chainID)

const SummonManager = new ethers.Contract(ManagerABI, ManagerAddress, signer)


// const encodedToken = await SummonManager.getEncodedToken(tokenAddress, tokenId)
try {
let tx = await SummonManager.withdrawTokenFromSummon(tokenAddress, tokenId)
console.log(tx)
let tx_r = await tx.wait()
console.log(tx_r)
tx_r.status = 1 ? updateNFTStatus(tokenAddress, tokenId, "retrieved") : updateNFTStatus(tokenAddress, tokenId, "failed :(")
} catch {
  console.log('something something error something')
  updateNFTStatus(tokenAddress, tokenId, "lended")
}

console.log("WOOOHOOO NFT retrieved")

}

export default retrieve
