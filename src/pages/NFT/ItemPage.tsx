import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { BackgroundDiv, TokenAndPrice } from './components'
import styled from 'styled-components'
import { BsTagFill } from 'react-icons/bs'
import { AiFillFile } from 'react-icons/ai'
import { BiBookContent, BiTransfer } from 'react-icons/bi'
import { FaList, FaWrench, FaHandPaper } from 'react-icons/fa'
import { RiShareBoxFill } from 'react-icons/ri'
import { useItemFilter } from './useItemFilter'
import TimeAgo from 'timeago-react'

const ImageWrapper = styled.div`
  max-height: 399px;
  max-width: 399px;

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`

const CardImage = styled.img`
  object-fit: contain;
  opacity: 1;
`

const Button = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  color: #fff;
`

const showAddress = (addr?: string) => {
  if (!addr) return ''
  return addr.substring(0, 5) + '...' + addr.substring(addr.length - 5, addr.length)
}

const showIconStatus = (name: string) => {
  if (name.toLowerCase() === 'create') {
    return <FaWrench className="inline-block mr-1" />
  } else if (name.toLowerCase() === 'transfer') {
    return <BiTransfer className="inline-block mr-1" />
  }
  return <BsTagFill className="inline-block mr-1" />
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ItemPage = ({
  match: {
      params: { 
        address,
        id
      }
  }}: RouteComponentProps<{ address: string, id: string }>) => {

  const { fetchItem } = useItemFilter()
  const nftContent = fetchItem(address, Number(id))

  return (<>
    {' '}
    <Helmet>
      <title>NFT | DFY</title>
    </Helmet>
    <BackgroundDiv className="overflow-y-scroll pt-10 px-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-5">
          <div
            style={{
              maxWidth: '399px'
            }}
          >
            <ImageWrapper className="border border-gray-200 rounded-md overflow-hidden mx-auto mb-5">
              <CardImage alt={nftContent?.title} src={nftContent?.contentLink} /> 
            </ImageWrapper>

            <div className="block lg:hidden md:hidden">
              <div className="text-green-thick">{nftContent?.collection.name}</div>
              <div className="text-h1 mb-5">{nftContent?.title}</div>
            </div>

            <div className="border border-gray-200 w-full">
              <div className="border-b border-gray-200 p-3 font-bold truncate">
                <BiBookContent className="inline-block mr-2" /> About {nftContent?.title}
              </div>
              <div className="bg-gray-100">
                <div className="p-5">
                  <div className="mb-5">
                    <div className="inline-block mr-5 align-middle h-9 w-9 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                    <span className="text-gray-500">Created by</span> <Link className="text-green-thick" to={`/nft/account/${nftContent?.mintBy}`}>{nftContent?.mintBy.substring(2, 7)}</Link>
                  </div>
                  <p>
                    {nftContent?.description}
                  </p>
                </div>
              </div>
              <div className="border-b border-t border-gray-200 p-3 font-bold">
                <FaList className="inline-block mr-2" /> Chain Info
              </div>
              <div className="bg-gray-100">
                <div className="p-5">
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td>Contract Address</td>
                        <td className="text-right">
                          <Link className="text-green-thick" to="#">
                            {showAddress(nftContent?.collection.contractAddress)}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Token ID</td>
                        <td className="text-right">{nftContent?.id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
          <div className="flex-1 flex-grow">
            <div className="hidden lg:block md:block">
              <div className="text-green-thick">{nftContent?.collection.name}</div>
              <div className="text-h1 mb-5">{nftContent?.title}</div>
            </div>

            {(nftContent?.listers && nftContent?.listers.length > 0) && <div className="border border-gray-200 p-5 w-full mb-5 bg-gray-100">
              <div className="text-caption2 text-gray-400 mb-3">Current price</div>
              <TokenAndPrice
                price={nftContent?.listers[0].price ?? 0}
                tokenAddress={nftContent?.acceptToken.address ?? ''}
                tokenImageSrc={nftContent?.acceptToken.tokenImage}
                tokenSymbol={nftContent?.acceptToken.symbol ?? ''}
                size="lg"
                className="mb-3"
              />
              <div>
                <Button className="bg-green-thick">Buy Now</Button>
              </div>
            </div>}

            <div className="border border-gray-200 w-full mb-5">
              <div className="border-b border-gray-200 p-3 font-bold">
                <BsTagFill className="inline-block mr-2" /> Listings
              </div>
              <div className="bg-gray-100">
                {(nftContent?.listers && nftContent?.listers.length > 0) && <table width="100%">
                  <thead className="border-b border-gray-200 bg-white">
                    <tr>
                      <td className="w-1/2 p-3">From</td>
                      <td className="w-1/2 p-3">Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    { nftContent?.listers.map((item, index) => <tr key={index}>
                      <td className="w-1/2 p-3">
                        <div className="inline-block mr-3 align-middle h-9 w-9 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                        <Link className="text-green-thick" to={`/nft/account/${item.ListByAddress}`}>{item.ListByAddress.substring(2, 7)}</Link>
                      </td>
                      <td className="w-1/2 p-3">
                        <TokenAndPrice
                          price={item.price ?? 0}
                          tokenAddress={nftContent?.acceptToken.address ?? ''}
                          tokenImageSrc={nftContent?.acceptToken.tokenImage}
                          tokenSymbol={nftContent?.acceptToken.symbol ?? ''}
                          size="sm"
                          className="inline-block mr-6"
                        />
                        <button
                          className="border border-green-thick text-green-thick bg-white font-bold px-8 py-1"
                        >
                          Buy
                        </button>
                      </td>
                    </tr>)}
                  </tbody>
                </table>}
                {((nftContent?.listers && nftContent?.listers.length === 0) || !nftContent?.listers) && <div className="text-center p-10">
                  <AiFillFile className="block mx-auto"/>
                  No listings yet
                </div>}
              </div>
            </div>

            <div className="border border-gray-200 w-full mb-5">
              <div className="border-b border-gray-200 p-3 font-bold">
                <FaHandPaper className="inline-block mr-2" /> Offers
              </div>
              <div className="bg-gray-100">
              {(nftContent?.offers && nftContent?.offers.length > 0) && <table width="100%">
                  <thead className="border-b border-gray-200 bg-white">
                    <tr>
                      <td className="w-1/2 p-3">From</td>
                      <td className="w-1/2 p-3">Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    { nftContent?.offers.map((item, index) => <tr key={index}>
                      <td className="w-1/2 p-3">
                        <div className="inline-block mr-3 align-middle h-9 w-9 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                        <Link className="text-green-thick" to={`/nft/account/${item.offersByAddress}`}>{item.offersByAddress.substring(2, 7)}</Link>
                      </td>
                      <td className="w-1/2 p-3">
                        <TokenAndPrice
                          price={item.amount ?? 0}
                          tokenAddress={nftContent?.acceptToken.address ?? ''}
                          tokenImageSrc={nftContent?.acceptToken.tokenImage}
                          tokenSymbol={nftContent?.acceptToken.symbol ?? ''}
                          size="sm"
                          className="inline-block mr-6"
                        />
                      </td>
                    </tr>)}
                  </tbody>
                </table>}
                {((nftContent?.offers && nftContent?.offers.length === 0) || !nftContent?.listers) && <div className="text-center p-10">
                  <AiFillFile className="block mx-auto"/>
                  No offers yet
                </div>}
                <div className="border-t border-gray-200 p-3">
                  <button
                    className="border border-green-thick text-green-thick bg-white font-bold px-8 py-1"
                  >
                    Make Offer
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="border border-gray-200 w-full mt-5 mb-5">
          <div className="bg-gray-100">
            <table width="100%">
              <thead className="border-b border-gray-200 bg-white">
                <tr>
                  <td className="p-3">Event</td>
                  <td className="p-3">Price</td>
                  <td className="p-3">From</td>
                  <td className="p-3">To</td>
                  <td className="p-3">Date</td>
                </tr>
              </thead>
              <tbody>
                { nftContent?.events.map((item, index) => <tr key={index}>
                  <td className="p-3">
                    {showIconStatus(item.actionName)} <span className="align-middle">{item.actionName}</span>
                  </td>
                  <td className="p-3">
                    { item.price > 0 && <TokenAndPrice
                      price={item.price}
                      tokenAddress={nftContent?.acceptToken.address ?? ''}
                      tokenImageSrc={nftContent?.acceptToken.tokenImage}
                      tokenSymbol={nftContent?.acceptToken.symbol ?? ''}
                      size="sm"
                    />}
                  </td>
                  <td className="p-3">
                    <div className="inline-block mr-2 align-middle h-5 w-5 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                    <Link className="text-green-thick" to={`/nft/account/${item.from}`}>{item.from.substring(2, 7)}</Link>
                  </td>
                  <td className="p-3">
                    <div className="inline-block mr-2 align-middle h-5 w-5 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                    <Link className="text-green-thick" to={`/nft/account/${item.to}`}>{item.to.substring(2, 7)}</Link>
                  </td>
                  <td className="p-3">
                    <Link className="text-green-thick hover:underline" to="#"><TimeAgo datetime={item.actedAt} /> <RiShareBoxFill className="inline-block" /></Link>
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BackgroundDiv>
  </>)
}

export default ItemPage
