import { useState } from 'react'
import { Card } from 'kashi/components'
import { Helmet } from 'react-helmet'
import React, { useEffect } from 'react'
import Web3Status from 'components/Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { useLingui } from '@lingui/react'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { Input as NumericalInput } from 'components/NumericalInput'
import Button from 'components/Button'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { useLaunchpadContract } from '../../hooks/useContract'
import { BigNumber } from 'ethers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import styled from 'styled-components'
import { useLaunchToken } from './useLaunchToken'
import { useTokenContract } from 'hooks/useContract'
import { AiOutlineArrowDown, AiOutlineCopy } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { FaCoins } from 'react-icons/fa'
import { shortenAddress } from '../../utils'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import { Token } from 'dfy-sdk'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { launchTokenListByChainId, LaunchTokenList } from './config/launch-token-list'
import Loader from 'components/Loader'
 
const BackgroundMain = styled.div`
    margin-top: -40px;
    margin-bottom: -80px;
    padding-bottom: 80px;
    height: 100vh;
    overflow-y: scroll;
`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function LaunchPadPage({
    match: {
        params: {address}
    }}: RouteComponentProps<{ address: string }>)
{

    const history = useHistory()

    const { i18n } = useLingui()

    const { account, chainId } = useActiveWeb3React()
    const [isCopied, staticCopy] = useCopyClipboard()
    const [isMerchant, setIsMerchant] = useState(false)

    const [launchDetail, setLaunchDetail] = useState<LaunchTokenList>()
    
    const launchPadContract = useLaunchpadContract(address ? address : '')

    const [forBuyingTokenAddress, setForBuyingTokenAddress] = useState('')
    const [forBuyingTokenName, forBuyingTokenSymbol, forBuyingTokenDecimals] = useLaunchToken(forBuyingTokenAddress, account)
    const forBuyingCurrencyAmount = useCurrencyBalance(account ?? undefined, forBuyingTokenAddress !== '' ? new Token(chainId ?? 0, forBuyingTokenAddress, forBuyingTokenDecimals, forBuyingTokenSymbol, forBuyingTokenName) : undefined)
    
    const [startTokenBalance, setStartTokenBalance] = useState('')
    const [tokenRate, setTokenRate] = useState(BigNumber.from(0))
    const [isCommiting, setIsCommiting] = useState(false)
    const [tokenBalance, setTokenBalanec] = useState(BigNumber.from(0))
    const [warningMsg, setWarningMsg] = useState('')

    const [launchPadRemain, setLaunchPadRemain] = useState('')
    const [launchPadIncomeBalance, setLaunchPadIncomeBalance] = useState('')

    const [launchpadTokenAddress, setLauchpadToken] = useState('')
    const [luachPadTokenName, luachPadTokenSymbol, luachPadDecimals] = useLaunchToken(launchpadTokenAddress, account)
    const launchCurrencyAmount = useCurrencyBalance(account ?? undefined, launchpadTokenAddress !== '' ? new Token(chainId ?? 0, launchpadTokenAddress, luachPadDecimals, luachPadTokenSymbol, luachPadTokenName) : undefined)

    const [approvalState, approve] = useApproveCallback(forBuyingCurrencyAmount, launchPadContract?.address)
    const addTransaction = useTransactionAdder()

    const startTokenToDestinationTokenCalculate = (val: string) => {
        const forBuyingToken = val.toBigNumber(decimals)
        if (forBuyingToken.lte('100000000000000000')) {
            setWarningMsg('Amount must be greater then 0.1')
        } else {
            setWarningMsg('')
        }
        setTokenBalanec(forBuyingToken.mul(tokenRate))
        setStartTokenBalance(val)
    }

    const onMax = () => {
        startTokenToDestinationTokenCalculate(
            forBuyingCurrencyAmount ? forBuyingCurrencyAmount.toExact() : ''
        )
    }

    const [tokenMerchantBalance, setTokenMerchantBalance] = useState('')

    const onMaxMerchant = () => {
        setTokenMerchantBalance(launchCurrencyAmount ? launchCurrencyAmount.toExact() : '')
    }

    const merchantLaunchpadTokenContract = useTokenContract(launchpadTokenAddress, true)

    const decimals = forBuyingTokenDecimals ? forBuyingTokenDecimals : 18

    useEffect(() => {
        if (!chainId) return
        const checkLaunchDetail = launchTokenListByChainId[chainId][address]
        if (!address || (address && address === '')
            || !checkLaunchDetail
            || (checkLaunchDetail && !checkLaunchDetail.available))
        {
            history.push('/launchpad')
            return
        }
        setLaunchDetail(checkLaunchDetail)
        const getSwapDetial = async () => {
            const addressA = await launchPadContract?.functions.tokenA()
            if (addressA) {
                setForBuyingTokenAddress(addressA[0])
            }
            const addressB = await launchPadContract?.functions.tokenB()
            if (addressB) {
                setLauchpadToken(addressB[0])
            }
            const rate = await launchPadContract?.functions.rate()
            if (rate) {
                setTokenRate(rate[0])
            }
        }
        getSwapDetial()
    }, [launchPadContract, tokenBalance, decimals, address, history, chainId])

    useEffect(() => {
        const fetchLaunchTokenRemain = async () => {
            try {
                const luanchpadRemain = await launchPadContract?.functions.bBalance()
                if (luanchpadRemain) {
                    setLaunchPadRemain(luanchpadRemain[0].toFixed(decimals))
                }
                const launchPadIncomeBalance = await launchPadContract?.functions.aBalance()
                if (launchPadIncomeBalance) {
                    setLaunchPadIncomeBalance(launchPadIncomeBalance[0].toFixed(decimals))
                }
                const isMerchantValue = await launchPadContract?.functions.isMerchant(account)
                if (isMerchantValue) {
                    setIsMerchant(isMerchantValue[0])
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchLaunchTokenRemain()
    }, [account, decimals, launchCurrencyAmount, launchPadContract])

    return (
        <>
            {' '}
            <Helmet>
                <title>Launchpad | DFY</title>
            </Helmet>
            <BackgroundMain className="navbar-bg-green-thick-to-thin w-screen">

                <div className="relative flex flex-col items-center">
                    {/* <img alt="" src={BentoBoxLogo} className="object-scale-down w-40 md:w-60 h-auto" /> */}

                    <div className="container mx-auto max-w-3xl">
                        <div className="font-bold text-center text-4xl text-white my-20">
                            {i18n._(t`Launchpad`)}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto sm:px-6 max-w-5xl  rounded border border-white">
                    <div className="grid gap-4 sm:gap-12 grid-flow-auto grid-cols-2">
                        <Card className="flex items-center justify-center col-span-2 md:col-span-1 text-white">
                            {launchDetail && launchDetail.imageTokenUrl && <div className="text-center mb-10">
                                <img alt="launchpad" src={launchDetail.imageTokenUrl} className="inline-block h-20 w-20 rounded-full ring-2 ring-white" />
                            </div>}
                            <p className="text-h3 mb-5">Proposal Details</p>
                            <div dangerouslySetInnerHTML={{__html: launchDetail ? launchDetail.proposalContent : ''}} />
                        </Card>
                        <Card className="col-span-2 md:col-span-1 w-full shadow-pink-glow hover:shadow-pink-glow-hovered">
                            <div className="relative w-full">
                                {luachPadTokenName && luachPadTokenSymbol && launchpadTokenAddress ? <div>
                                    <div className="flex mb-10 ">
                                        <div className="pr-5 text-white text-center border-r border-white">
                                            <p className="text-h1 font-bold">{luachPadTokenSymbol}</p>
                                            <p>{luachPadTokenName}</p>
                                        </div>
                                        <div className="text-white ml-5">
                                            <p>Address:</p>
                                            { launchpadTokenAddress && launchpadTokenAddress !== '' ? shortenAddress(launchpadTokenAddress).toLocaleUpperCase() : '' }
                                            <Button
                                                className="ml-3 active:outline-none"
                                                onClick={() => {
                                                    staticCopy(launchpadTokenAddress)
                                                }}
                                            >
                                                <AiOutlineCopy className="inline" /> 
                                            </Button>    
                                            <span className="ml-5">{isCopied && <span>Copied!</span>}</span>
                                        </div>
                                    </div>
                                    <Card className="border border-white mb-10">
                                        <p className="text-white mb-3">Remain:</p> 
                                        <p className="text-center text-white text-h2">
                                        { launchPadRemain } {luachPadTokenSymbol}
                                        </p>
                                    </Card> 
                                </div> : <div className="w-2 mx-auto mb-10">
                                    <Loader stroke="white" />
                                </div>}
                                {account ? (
                                    <div>
                                        <div className="text-white text-right text-caption2">
                                            Balance: {forBuyingCurrencyAmount ? forBuyingCurrencyAmount?.toSignificant(6) : 0} {forBuyingTokenSymbol}
                                        </div>
                                        <div className="flex items-center rounded bg-white space-x-3 p-3 w-full">
                                            <Button
                                                onClick={onMax}
                                                size="small"
                                                className="bg-transparent hover:bg-primary hover:text-white border border-high-emphesis rounded-full text-gray-500 text-xs font-medium whitespace-nowrap"
                                            >
                                                {i18n._(t`Max`)}
                                            </Button>
                                            <NumericalInput
                                                disabled={isCommiting}
                                                className="token-amount-input text-right"
                                                value={startTokenBalance}
                                                onUserInput={val => {
                                                    startTokenToDestinationTokenCalculate(val)
                                                }}
                                            />
                                            <span className="ml-2">{forBuyingTokenSymbol}</span>
                                        </div>
                                        <p className={`${ warningMsg === '' ? 'invisible' : 'visible' } text-red text-sm`}>Warning: {warningMsg}</p>
                                        <div className="text-white w-full text-center relative mt-2">
                                            <AiOutlineArrowDown className="mx-auto" size="24" />
                                        </div>
                                        <div className="text-white text-right text-caption2 mt-4">
                                            Balance: {launchCurrencyAmount ? launchCurrencyAmount.toSignificant(6) : 0} {luachPadTokenSymbol}
                                        </div>
                                        <div className="flex items-center rounded bg-white space-x-3 p-3 w-full mb-10">
                                            <NumericalInput
                                                disabled={isCommiting}
                                                className="token-amount-input text-right"
                                                value={tokenBalance.toFixed(decimals)}
                                                onUserInput={val => {
                                                    const launchToken = val.toBigNumber(decimals)
                                                    const converted = launchToken.div(tokenRate)
                                                    setStartTokenBalance(converted.toFixed(decimals))
                                                    setTokenBalanec(launchToken)
                                                }}
                                            />
                                            <span className="ml-2">{luachPadTokenSymbol}</span>
                                        </div>
                                        { ApprovalState.UNKNOWN === approvalState && <div className="w-2 mx-auto">
                                            <Loader stroke="white" />
                                        </div>}
                                        { (ApprovalState.NOT_APPROVED === approvalState || ApprovalState.PENDING === approvalState) && (
                                            <Button
                                                disabled={ApprovalState.PENDING === approvalState}
                                                onClick={approve}
                                                className="w-full border-gradient py-2 font-bold text-center text-high-emphesis disabled:cursor-not-allowed"
                                            >
                                                { ApprovalState.PENDING === approvalState ? i18n._(t`Approving`) : i18n._(t`Approve`)}
                                            </Button>
                                        ) }
                                        { ApprovalState.APPROVED === approvalState && (
                                            <Button
                                                color="gradient3"
                                                disabled={isCommiting || warningMsg !== '' || startTokenBalance === ''}
                                                onClick={async () => {
                                                    try {
                                                        setIsCommiting(true)
                                                        const response = await launchPadContract?.functions.swap(startTokenBalance.toBigNumber(decimals))
                                                        addTransaction(response, {
                                                            summary: 'Launch commited!'
                                                        })
                                                        setStartTokenBalance('')
                                                        setTokenBalanec(BigNumber.from(0))
                                                        setIsCommiting(false)
                                                    } catch (err) {
                                                        console.error(err)
                                                        setIsCommiting(false)
                                                    }
                                                }}
                                                className="w-full border border-white py-2 font-bold text-center text-white disabled:cursor-not-allowed"
                                            >
                                                {i18n._(t`COMMIT`)}
                                            </Button>
                                        ) }
                                    </div>
                                ) : (
                                    <Web3Status />
                                )}
                            </div>
                        </Card>
                    </div>
                </div>

                {isMerchant && <div>
                    <div className="font-bold text-center text-4xl text-white mt-20">
                        {i18n._(t`Merchant`)}
                    </div>                 
                    <div className="container mx-auto sm:px-6 max-w-5xl mt-10 rounded border border-white">
                        <div className="grid gap-1 grid-flow-auto grid-cols-2">
                            <Card className="col-span-2 md:col-span-1">
                                <Card className="border border-white mb-10 w-full">
                                    <p className="text-white mb-3">
                                        <FaCoins className="inline-block mr-2" />
                                        Remain ({luachPadTokenName}):
                                    </p> 
                                    <p className="text-center text-white text-h2">
                                    { launchPadRemain } {luachPadTokenSymbol}
                                    </p>
                                    <div className="text-right mt-3">
                                        <Button
                                            disabled={launchPadRemain === '0'}
                                            onClick={async () => {
                                                const response = await launchPadContract?.functions.ownerReclaimB()
                                                addTransaction(response, {
                                                    summary: 'Claimed!'
                                                })
                                            }}
                                            size="small"
                                            className={`bg-transparent disabled:cursor-not-allowed ${launchPadRemain !== '0' ? 'hover:bg-primary hover:text-white': ''} border border-gray-300 rounded-full text-gray-300 text-xs font-medium whitespace-nowrap`}
                                        >
                                            {i18n._(t`Claim back`)}
                                        </Button>
                                    </div>
                                </Card>
                                <p className="text-white">Deposite {luachPadTokenName} ({luachPadTokenSymbol})</p>
                                <div className="text-white text-right text-caption2 mt-4">
                                    Balance: {launchCurrencyAmount ? launchCurrencyAmount.toSignificant(6) : 0} {luachPadTokenSymbol}
                                </div>
                                <div className="flex items-center rounded bg-white space-x-3 p-3 w-full mb-10">
                                    <Button
                                        onClick={onMaxMerchant}
                                        size="small"
                                        className="bg-transparent hover:bg-primary hover:text-white border border-high-emphesis rounded-full text-gray-500 text-xs font-medium whitespace-nowrap"
                                    >
                                        {i18n._(t`Max`)}
                                    </Button>
                                    <NumericalInput
                                        className="token-amount-input text-right"
                                        value={tokenMerchantBalance}
                                        onUserInput={val => {
                                            setTokenMerchantBalance(val)
                                        }}
                                    />
                                    <span className="ml-2">{luachPadTokenSymbol}</span>
                                </div>
                                <Button
                                    disabled={tokenMerchantBalance === ''}
                                    color="blueTextWhite"
                                    onClick={async () => {
                                        const response = await merchantLaunchpadTokenContract?.functions.transfer(address, tokenMerchantBalance.toBigNumber(decimals))
                                        addTransaction(response, {
                                            summary: 'Deposite'
                                        })
                                        setTokenMerchantBalance('')
                                    }
                                    }
                                    className="w-full border border-white py-2 font-bold text-center text-white disabled:cursor-not-allowed"
                                >
                                    {i18n._(t`Deposite`)}
                                </Button>
                            </Card>
                            <Card className="col-span-2 md:col-span-1">
                                <Card className="border border-white mb-10 w-full">
                                    <p className="text-white mb-3"><BsGraphUp className="inline-block mr-1" /> Income ({forBuyingTokenName}) :</p> 
                                    <p className="text-center text-white text-h2">
                                    { launchPadIncomeBalance } {forBuyingTokenSymbol}
                                    </p>
                                </Card>
                                <Button
                                    color="gradient3"
                                    disabled={launchPadIncomeBalance === '0'}
                                    onClick={async () => {
                                        const response = await launchPadContract?.functions.ownerReclaimA()
                                        addTransaction(response, {
                                            summary: 'Claimed!'
                                        })
                                    }
                                    }
                                    className="w-full border border-white py-2 font-bold text-center text-white disabled:cursor-not-allowed"
                                >
                                    {i18n._(t`Claim ${forBuyingTokenName}`)}
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>}
            </BackgroundMain>
        </>
    )
}

export default LaunchPadPage
