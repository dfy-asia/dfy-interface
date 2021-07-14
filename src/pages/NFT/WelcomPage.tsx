import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BackgroundMain = styled.div`
    margin-top: -40px;
    margin-bottom: -80px;
    padding-bottom: 80px;
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
`

const BackgroundHero = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%,rgba(255,255,255,1) 100%),
    url('/images/sea-bg.jpg') no-repeat top center;
  background-size: cover;
`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const WelcomePage = () => {

  return (<>
    {' '}
    <Helmet>
      <title>NFT | DFY</title>
    </Helmet>
    <BackgroundMain>
      <div className="relative">
        <BackgroundHero></BackgroundHero>
        <div className="absolute top-0 w-full">
          <div className="flex flex-wrap mb-20">
            <div className="flex-1">
              <div style={{ paddingTop: '125px' }} className="px-10">
                <div className="text-5xl mb-10">Discover, collect, and sell extraordinary NFTs</div>
                <div className="text-xl mb-10">on the world&#39;s first &amp; largest NFT marketplace</div>
                <Link to="/nft/list"><button className="px-10 py-3 bg-green-thick rounded-lg mr-10 text-white font-bold">Explore</button></Link>
                {/* <button className="px-10 py-3 border border-green-thick rounded-lg mr-10">Create</button> */}
              </div>
            </div>
            <div className="flex-1">
              <div className="px-10 pt-10">
                <div style={{ maxWidth: '420px' }} className="rounded-md overflow-hidden mx-auto shadow-md hover:shadow-2xl transition-shadow">
                  <div>
                    <img alt="" src="/images/nft/testtest.jpg" />
                  </div>
                  <div className="bg-white">
                    <div className="py-3 pl-2">
                      <div className="inline-block align-middle px-5">
                        <div className="inline-block h-9 w-9 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                      </div>
                      <div className="inline-block align-middle">
                        <div className="font-bold">Doge and child</div>
                        <div>Elon Doge</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-h3 font-bold mb-5">
            Exclusive OpenNFT drops
          </div>
        </div>
      </div>
    </BackgroundMain>
  </>)
}

export default WelcomePage