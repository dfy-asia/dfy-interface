import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from './components'
import { useItemFilter } from './useItemFilter'
import { FaFacebook, FaTelegram } from 'react-icons/fa'
import { AiFillTwitterCircle } from 'react-icons/ai'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"

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

const ArtBg = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%,rgba(255,255,255,1) 100%),
    url('/images/art-bg.jpg') no-repeat top center;
  background-size: cover;
`

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const WelcomePage = () => {

  const { collections, nfts } = useItemFilter('')

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
                { nfts.length > 0 &&  
                <Link
                  to={`/nft/${nfts[0].collection.contractAddress}/${nfts[0].id}`}
                >
                  <div style={{ maxWidth: '420px' }} className="rounded-md overflow-hidden mx-auto shadow-md hover:shadow-2xl transition-shadow">
                    <div>
                      <img alt="" src={nfts[0].contentLink} />
                    </div>
                    <div className="bg-white">
                      <div className="py-3 pl-2">
                        <div className="inline-block align-middle px-5">
                          <div className="inline-block h-9 w-9 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                        </div>
                        <div className="inline-block align-middle">
                          <div className="font-bold">{nfts[0].title}</div>
                          <div className="text-green-thick">
                            {nfts[0].collection.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>}
              </div>
            </div>
          </div>
          <div className="text-center text-h4 font-bold mb-5">
            Exclusive OpenNFT drops
          </div>
          <div className="px-10 mb-20">
            <Carousel
              className="w-full"
              infinite
              autoPlay
              arrows
              responsive={responsive}>
              {nfts.map((nft, index) => <Link
                key={index}
                className="mx-1 inline-block"
                to={`/nft/${nft.collection.contractAddress}/${nft.id}`}>
                <Card
                  className="cursor-pointer"
                  item={nft}
                />
              </Link>)}
            </Carousel>
          </div>
          <div className="text-center text-h4 font-bold mb-5">
            Collections
          </div>
          <div className="px-10 mb-20">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
              {collections.map((collection, index) => <Link
                  key={index}
                  className="w-full inline-block bg-white"
                  to={`/nft/account/${collection.contractAddress}/collection}`}
                >
                  <ArtBg className="rounded-md overflow-hidden border border-gray-200 mx-1 hover:shadow-2xl">
                    <div
                      style={{ width: '120px', height: '120px' }}
                      className="rounded-full overflow-hidden mx-auto m-5 ring-4 ring-white"
                    >
                      <img alt="" src={collection.titleImage} />
                    </div>
                    <div className="text-center pb-3 pl-2">
                      <div className="text-h4">{collection.name}</div>
                    </div>
                  </ArtBg>
                </Link>)}
            </div>
          </div>
          <footer className="min-h-20 mt-10 px-10 pt-10 pb-20 bg-green-thick">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <div className="text-white">
                <div className="text-h2 font-bold mb-3">
                  OpenNFT
                </div>
                <div style={{
                  maxWidth: '450px'
                }}>
                  The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital assets.
                </div>
              </div>
              <div className="text-white text-center mt-10">
                <FaFacebook className="inline-block" size="42" />
                <FaTelegram className="inline-block ml-5" size="42" />
                <AiFillTwitterCircle className="inline-block ml-5" size="46" />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </BackgroundMain>
  </>)
}

export default WelcomePage