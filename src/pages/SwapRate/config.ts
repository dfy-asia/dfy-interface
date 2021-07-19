import { ChainId } from "dfy-sdk"

interface ExchangeDetail {
  factoryAddress: string,
  exchangeName: string,
  url: string,
  logo?: string
}

const BSC_EXCHANGE: ExchangeDetail[] = [
  {
    factoryAddress: '0x008ac4a6cCB5455387F685528f85C8e3a00bE8a3',
    exchangeName: 'MAR',
    url: 'https://mar.exchange/swap',
    logo: 'https://mar.exchange/static/media/logo.d83c14dc.svg'
  },
  {
    factoryAddress: '0xca143ce32fe78f1f7019d7d551a6402fc5350c73',
    exchangeName: 'PancakeSwap',
    url: 'https://exchange.pancakeswap.finance/#/swap',
    logo: '/images/pancake_logo.png'
  }
]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useConfig = (chainId?: ChainId) => {
  if (chainId === ChainId.BSC) return BSC_EXCHANGE
  return BSC_EXCHANGE
}