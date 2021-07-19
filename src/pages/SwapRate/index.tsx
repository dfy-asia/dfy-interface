import { Helmet } from 'react-helmet'
import React, { useEffect, useCallback, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import styled from 'styled-components'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'

import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import { useCurrency } from 'hooks/Tokens'
import { CgArrowsExchangeAltV } from 'react-icons/cg'
import { useConfig } from './config'
import { Currency, ETHER } from 'dfy-sdk'

import ItemRateShow from './ItemRateShow'

const BackgroundMain = styled.div`
    margin-top: -40px;
    margin-bottom: -80px;
    padding-bottom: 80px;
    overflow-y: scroll;
`

function SwapRate(): JSX.Element {
    const { i18n } = useLingui()

    const { chainId } = useActiveWeb3React()

    const factoryAddresses = useConfig(chainId)

    const [inputValue, setInputValue] = useState('')
    const [outputValue, setOutputValue] = useState('')

    const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers()
    
    const {
        [Field.INPUT]: { currencyId: inputCurrencyId},
        [Field.OUTPUT]: { currencyId: outputCurrencyId }
    } = useSwapState()

    const inputCurrency = useCurrency(inputCurrencyId)
    const outputCurrency = useCurrency(outputCurrencyId)

    const currencies: { [field in Field]?: Currency } = {
        [Field.INPUT]: inputCurrency ?? undefined,
        [Field.OUTPUT]: outputCurrency ?? undefined
    }

    const handleTypeInput = useCallback(
        (value: string) => {
            onUserInput(Field.INPUT, value)
            setInputValue(value)
        },
        [onUserInput]
    )

    const handleTypeOutput = useCallback(
        (value: string) => {
            onUserInput(Field.OUTPUT, value)
            setOutputValue(value)
        },
        [onUserInput]
    )

    const handleInputSelect = useCallback(
        inputCurrency => {
            onCurrencySelection(Field.INPUT, inputCurrency)
        },
        [onCurrencySelection]
    )

    const handleOutputSelect = useCallback(outputCurrency => onCurrencySelection(Field.OUTPUT, outputCurrency), [
        onCurrencySelection
    ])

    return (
        <>
            {' '}
            <Helmet>
                <title>Swap Rate | DFY</title>
            </Helmet>
            <BackgroundMain className="w-screen">
                <div className="relative flex flex-col items-center">
                    {/* <img alt="" src={BentoBoxLogo} className="object-scale-down w-40 md:w-60 h-auto" /> */}

                    <div className="container mx-auto max-w-3xl">
                        <div className="font-bold text-center text-4xl my-10">
                            {i18n._(t`Swap Rate`)}
                        </div>
                    </div>
                </div>

                <div className="navbar-bg-green-thick-to-thin shadow-swap-blue-glow w-full max-w-2xl rounded mx-auto">
                    <div className="p-4">
                        <div>
                            <div>
                                <CurrencyInputPanel
                                    label={
                                        i18n._(t`Swap From:`)
                                    }
                                    value={inputValue}
                                    showMaxButton={true}
                                    currency={currencies[Field.INPUT]}
                                    onUserInput={handleTypeInput}
                                    onMax={() => {
                                        console.log('max')
                                    }}
                                    onCurrencySelect={handleInputSelect}
                                    otherCurrency={currencies[Field.OUTPUT]}
                                    id="swap-currency-input"
                                />
                            </div>
                            <div
                                className="my-5"
                            >
                                <CgArrowsExchangeAltV
                                    className="mx-auto text-white cursor-pointer"
                                    size="64"
                                    onClick={() => {
                                        onSwitchTokens()
                                    }}
                                />
                            </div>
                            <div>
                                <CurrencyInputPanel
                                    label={
                                        i18n._(t`Swap To:`)
                                    }
                                    hideInput
                                    value={outputValue}
                                    showMaxButton={false}
                                    currency={currencies[Field.OUTPUT]}
                                    onUserInput={handleTypeOutput}
                                    onCurrencySelect={handleOutputSelect}
                                    otherCurrency={currencies[Field.INPUT]}
                                    id="swap-currency-output"
                                />
                            </div> 
                        </div>                 
                    </div>
                    <div className="px-4 pb-4">
                        {inputValue !== '' && factoryAddresses.map((item, index) => {
                            return <div key={index}>
                                <ItemRateShow
                                    name={item.exchangeName}
                                    inputCurrencyId={inputCurrencyId}
                                    outputCurrencyId={outputCurrencyId}
                                    inputValue={inputValue}
                                    factoryAddress={item.factoryAddress}
                                />
                            </div>
                        })}
                    </div>
                </div>

            </BackgroundMain>
        </>
    )
}

export default SwapRate
