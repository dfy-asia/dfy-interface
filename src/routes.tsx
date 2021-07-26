import { ChainId } from 'dfy-sdk'
import React from 'react'
import { Redirect, Route, RouteComponentProps, useLocation, Switch } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import Connect from './kashi/pages/Connect'
import AddLiquidity from './pages/AddLiquidity'
import {
    RedirectDuplicateTokenIds,
    RedirectOldAddLiquidityPathStructure,
    RedirectToAddLiquidity
} from './pages/AddLiquidity/redirects'
import LaunchPad from './pages/LaunchPad'
import LaunchPadPage from './pages/LaunchPad/LaunchPadPage'
// import BentoBalances from './pages/LaunchPad/Balances'
import Migrate from './pages/Migrate'
import Pool from './pages/Pool'
import PoolFinder from './pages/PoolFinder'
import RemoveLiquidity from './pages/RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './pages/RemoveLiquidity/redirects'
import Trade from './pages/Trade'
import Swap from './pages/Swap'
import {
    RedirectHashRoutes,
    RedirectPathToSwapOnly,
    RedirectToSwap
} from './pages/Swap/redirects'
import Yield from './pages/Yield'
import Transactions from './pages/Transactions'
import NFT, { ItemPage, AccountPage, WelcomePage } from './pages/NFT'
import SwapRate from './pages/SwapRate'

const LaunchPadAllowChaidId: ChainId[] = [
    ChainId.BSC_TESTNET,
    ChainId.BSC
]

function Routes(): JSX.Element {
    const { chainId } = useActiveWeb3React()
    return (
        <Switch>
            <PublicRoute exact path="/connect" component={Connect} />
            {/* BentoApps */}

            <Route exact strict path="/nft" component={WelcomePage} />
            <Route exact strict path="/nft/list" component={NFT} />
            <Redirect exact strict from="/nft/account/:address" to="/nft/account/:address/collection" />
            <Route exact strict path="/nft/account/:address/:tab" component={AccountPage} />
            <Route exact strict path="/nft/:address/:id" component={ItemPage} />
            <Route exact strict path="/swap-rate" component={SwapRate} />

            <Route exact strict path="/launchpad" component={LaunchPad} />
            {chainId && LaunchPadAllowChaidId.includes(chainId)
                && <Route strict path="/launchpad/:address" component={LaunchPadPage} />
            }
            {/* <Route exact strict path="/bento" component={Bento} /> */}
            {/* <WalletRoute exact strict path="/bento/balances" component={BentoBalances} /> */}

            {/* Kashi */}
            {/* <Route
                exact
                strict
                path="/bento/kashi"
                render={props => <Redirect to="/bento/kashi/borrow" {...props} />}
            />
            <WalletRoute exact strict path="/bento/kashi/lend" component={LendMarkets} />
            <WalletRoute exact strict path="/bento/kashi/borrow" component={BorrowMarkets} />
            <WalletRoute exact strict path="/bento/kashi/create" component={CreateMarkets} />
            <WalletRoute exact strict path="/bento/kashi/lend/:pairAddress" component={LendPair} />
            <WalletRoute exact strict path="/bento/kashi/borrow/:pairAddress" component={BorrowPair} /> */}

            {/* {(chainId === ChainId.BKC || chainId === ChainId.BSC || chainId === ChainId.MATIC) && (
                <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
            )} */}
            {(chainId === ChainId.BSC_TESTNET)
                && <Route exact strict path="/yield" component={Yield} />}
            {/* {chainId === ChainId.MAINNET && (
                <Route exact strict path="/yield/debug/:address" component={MasterChefV1Debug} />
            )} */}
            {/* {chainId === ChainId.MAINNET && <Route exact strict path="/vesting" component={Vesting} />} */}

            {/* Migrate */}
            {(chainId === ChainId.BKC || chainId === ChainId.BSC || chainId === ChainId.MATIC) && (
                <Route exact strict path="/migrate" component={Migrate} />
            )}

            {/* SushiBar Staking */}
            {/* {chainId === ChainId.MAINNET && <Route exact strict path="/sushibar" component={SushiBar} />} */}
            {/* {chainId === ChainId.MAINNET && (
                <Route exact strict path="/sushibar/transactions" component={SushiBarTransactions} />
            )} */}
            {/* {chainId === ChainId.MAINNET && <Route exact strict path="/sushibar/tips" component={SushiBarTips} />} */}
            {/* {chainId === ChainId.MAINNET && <Route exact strict path="/stake" component={SushiBar} />} */}
            {/* Tools */}
            {/* {chainId === ChainId.MAINNET && <Route exact strict path="/tools" component={Tools} />} */}
            {/* {chainId === ChainId.MAINNET && <Route exact strict path="/saave" component={Saave} />} */}

            {/* Pages */}
            <Route exact strict path="/tradingview" component={Trade} />
            <Route exact strict path="/trade" component={Swap} />
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/pool" component={Pool} />
            <Route exact strict path="/transactions" component={Transactions} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            {/* Redirects for app routes */}
            <Route
                exact
                strict
                path="/token/:address"
                render={({
                    match: {
                        params: { address }
                    }
                }) => <Redirect to={`/swap/${address}`} />}
            />
            <Route
                exact
                strict
                path="/pair/:address"
                render={({
                    match: {
                        params: { address }
                    }
                }) => <Redirect to={`/pool`} />}
            />

            {/* Redirects for Legacy Hash Router paths */}
            <Route exact strict path="/" component={RedirectHashRoutes} />

            {/* Catch all */}
            <Route component={RedirectPathToSwapOnly} />
        </Switch>
    )
}

export default Routes

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PublicRoute = ({ component: Component, children, ...rest }: any) => {
    const { account } = useActiveWeb3React()
    const location = useLocation<any>()
    return (
        <>
            <Route
                {...rest}
                render={(props: RouteComponentProps) =>
                    account ? (
                        <Redirect
                            to={{
                                pathname: location.state ? location.state.from.pathname : '/'
                            }}
                        />
                    ) : Component ? (
                        <Component {...props} />
                    ) : (
                        children
                    )
                }
            />
        </>
    )
}

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const WalletRoute = ({ component: Component, children, ...rest }: any) => {
    const { account } = useActiveWeb3React()
    return (
        <>
            <Route
                {...rest}
                render={({ location, props, match }: any) => {
                    return account ? (
                        Component ? (
                            <Component {...props} {...rest} match={match} />
                        ) : (
                            children
                        )
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/connect',
                                state: { from: location }
                            }}
                        />
                    )
                }}
            />
        </>
    )
}
