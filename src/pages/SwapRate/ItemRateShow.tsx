import React, { useEffect, useState } from 'react'
import { fetchPairData } from './utils'
import { Route, TokenAmount, Trade, TradeType, Currency, WETH, ChainId } from 'dfy-sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { utils } from 'ethers'
import { useTokenCheckWrap } from './utils'
import TradeSummary from './TradeSummary'

interface Props {
  name: string,
  inputCurrencyId?: string,
  outputCurrencyId?: string,
  inputValue: string,
  factoryAddress: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ItemRateShow = ({
  name,
  inputCurrencyId,
  outputCurrencyId,
  inputValue,
  factoryAddress
}: Props) => {

  const { chainId, library } = useActiveWeb3React()

  const tokenInput = useTokenCheckWrap(inputCurrencyId, chainId)
  const tokenOutput = useTokenCheckWrap(outputCurrencyId, chainId)

  const [price, setPrice] = useState('0')
  const [trade, setTrade] = useState<Trade>()

  useEffect(() => {
    const fetch = async () => {
      console.log('tokenInput', inputCurrencyId)
      if (!tokenInput || !tokenOutput) return
      
      const pair = await fetchPairData(tokenInput, tokenOutput, library, factoryAddress)
      console.log('pair', pair)

      if (!pair) return
      const route = new Route([pair], tokenInput)
      const amountIn = utils.parseEther(inputValue !== '' ? inputValue : '0')
      if (amountIn.gt(0)) {
          const trade = new Trade(route, new TokenAmount(tokenInput, amountIn.toString()), TradeType.EXACT_INPUT)
          setPrice(trade.outputAmount.toExact())
          setTrade(trade)
      }
    }
    fetch()
  }, [library, inputCurrencyId, outputCurrencyId, chainId, inputValue, factoryAddress, tokenInput, tokenOutput])

  return <>
    {price !== '0' && <div className="p-4 rounded border border-dark-800 mt-4">
      <div className="text-white text-xl">{name}</div>
      <div className="text-white text-2xl py-4 font-bold">{price}</div>
      {trade && <TradeSummary trade={trade} allowedSlippage={0}/>}
    </div>}
  </>

}

export default ItemRateShow