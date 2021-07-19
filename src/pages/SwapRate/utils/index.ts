import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json'
import IPancakePair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import invariant from 'tiny-invariant'
import { Token, TokenAmount, Pair, WETH, ChainId } from 'dfy-sdk'
import { constants } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { useToken } from 'hooks/Tokens'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchPairData = async (
  tokenA: Token,
  tokenB: Token,
  provider: Provider | undefined,
  factoryAddress: string
) => {
  invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID')
  const tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
  const contract = new Contract(factoryAddress, IUniswapV2Factory.abi, provider)
  const pairAddress = await contract.getPair(tokens[0].address, tokens[1].address)
  if (pairAddress === constants.AddressZero) return undefined
  const [reserves0, reserves1] = await new Contract(pairAddress, IPancakePair.abi, provider).getReserves()
  const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
  return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]))
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTokenCheckWrap = (address?: string, chainId?: ChainId) => {
  const token = useToken(address)

  if (address === 'ETH' && chainId) return WETH[chainId]
  return token
}

