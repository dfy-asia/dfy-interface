import React, { useContext } from 'react'
import { useLingui } from '@lingui/react'
import { AutoColumn } from 'components/Column'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Row'

import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import FormattedPriceImpact from 'components/swap/FormattedPriceImpact'
import { t } from '@lingui/macro'
import { Field } from 'state/swap/actions'
import { Trade, TradeType } from 'dfy-sdk'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { i18n } = useLingui()

  const { chainId } = useActiveWeb3React()
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
      <>
          <AutoColumn>
              <RowBetween>
                  <RowFixed>
                      <div className="text-secondary text-sm">
                          {isExactIn ? i18n._(t`Minimum received`) : i18n._(t`Maximum sold`)}
                      </div>
                      <QuestionHelper
                          text={i18n._(
                              t`Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.`
                          )}
                      />
                  </RowFixed>
                  <RowFixed>
                      <div className="text-sm font-bold text-white">
                          {isExactIn
                              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(
                                    4
                                )} ${trade.outputAmount.currency.getSymbol(chainId)}` ?? '-'
                              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(
                                    4
                                )} ${trade.inputAmount.currency.getSymbol(chainId)}` ?? '-'}
                      </div>
                  </RowFixed>
              </RowBetween>
              <RowBetween>
                  <RowFixed>
                      <div className="text-secondary text-sm">{i18n._(t`Price Impact`)}</div>
                      <QuestionHelper
                          text={i18n._(
                              t`The difference between the market price and estimated price due to trade size.`
                          )}
                      />
                  </RowFixed>
                  <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
              </RowBetween>

              <RowBetween>
                  <RowFixed>
                      <div className="text-secondary text-sm">{i18n._(t`Liquidity Provider Fee`)}</div>
                      <QuestionHelper
                          text={i18n._(
                              t`A portion of each trade goes to liquidity providers as a protocol incentive.`
                          )}
                      />
                  </RowFixed>
                  <div className="text-sm font-bold text-white">
                      {realizedLPFee
                          ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.getSymbol(chainId)}`
                          : '-'}
                  </div>
              </RowBetween>
          </AutoColumn>
      </>
  )
}

export default TradeSummary