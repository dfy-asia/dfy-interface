import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { BackgroundDiv, TokenAndPrice } from './components'
import styled from 'styled-components'
import { BsTagFill } from 'react-icons/bs'
import { AiFillFile } from 'react-icons/ai'
import { BiBookContent } from 'react-icons/bi'
import { FaList } from 'react-icons/fa'
import { RiShareBoxFill } from 'react-icons/ri'

const ImageWrapper = styled.div`
  height: 399px;
  width: 399px;
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ItemPage = ({
  match: {
      params: { address }
  }}: RouteComponentProps<{ address: string }>) => {

  return (<>
    {' '}
    <Helmet>
      <title>NFT | DFY</title>
    </Helmet>
    <BackgroundDiv className="overflow-y-scroll">
      <div className="container mx-auto pt-5">
        <div className="flex flex-wrap gap-5">
          <div
            style={{
              width: '399px'
            }}
          >
            <ImageWrapper className="border border-gray-200 rounded-md overflow-hidden mx-auto mb-5">
              <CardImage alt="" src="/images/nft/testtest.jpg" /> 
            </ImageWrapper>

            <div className="border border-gray-200 w-full">
              <div className="border-b border-gray-200 p-3 font-bold">
                <BiBookContent className="inline-block mr-2" /> About Maye Musk Galaxy
              </div>
              <div className="bg-gray-100">
                <div className="p-5">
                  <div className="mb-5">
                    <div className="inline-block mr-5 align-middle h-9 w-9 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                    <span className="text-gray-500">Created by</span> <Link to="#">F6DB9</Link>
                  </div>
                  <p>
                    Klay Birb is the first card in my Crypto Birbs set based off Klatyn.
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
                        <td className="text-right">0x5bc94e...704e44f</td>
                      </tr>
                      <tr>
                        <td>Token ID</td>
                        <td className="text-right">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
          <div className="flex-1">
            <div className="text-green-thick">Musk&Doge</div>
            <div className="text-h1 mb-5">Maye Musk Galaxy</div>

            <div className="border border-gray-200 p-5 w-full mb-5 bg-gray-100">
              <div className="text-caption2 text-gray-400 mb-3">Current price</div>
              <TokenAndPrice
                price={1}
                tokenAddress=""
                tokenImageSrc=""
                tokenSymbol="BUSD"
                size="lg"
                className="mb-3"
              />
              <div>
                <Button className="bg-green-thick">Buy Now</Button>
              </div>
            </div>

            <div className="border border-gray-200 w-full mb-5">
              <div className="border-b border-gray-200 p-3 font-bold">
                <BsTagFill className="inline-block mr-2" /> Listings
              </div>
              <div className="bg-gray-100">
                <table width="100%">
                  <thead className="border-b border-gray-200 bg-white">
                    <tr>
                      <td className="w-1/2 p-3">From</td>
                      <td className="w-1/2 p-3">Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="w-1/2 p-3">
                        <div className="inline-block mr-3 align-middle h-9 w-9 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                        <Link className="text-green-thick" to="#">F6DB9</Link>
                      </td>
                      <td className="w-1/2 p-3">
                        <TokenAndPrice
                          price={1}
                          tokenAddress=""
                          tokenImageSrc=""
                          tokenSymbol="BUSD"
                          size="sm"
                          className="inline-block mr-6"
                        />
                        <button
                          className="border border-green-thick text-green-thick bg-white font-bold px-8 py-1"
                        >
                          Buy
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-gray-200 w-full mb-5">
              <div className="border-b border-gray-200 p-3 font-bold">
                <BsTagFill className="inline-block mr-2" /> Offers
              </div>
              <div className="bg-gray-100">
                <div className="text-center p-10">
                  <AiFillFile className="block mx-auto"/>
                  No offers yet
                </div>
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
                <tr>
                  <td className="p-3">
                    <BsTagFill className="inline-block mr-2" /> List
                  </td>
                  <td className="p-3">
                    <TokenAndPrice
                      price={1}
                      tokenAddress=""
                      tokenImageSrc="/images/tokens/busd-square.jpg"
                      tokenSymbol="BUSD"
                      size="sm"
                    />
                  </td>
                  <td className="p-3">
                    <div className="inline-block mr-2 align-middle h-5 w-5 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                    <Link className="text-green-thick" to="#">F6DB9</Link>
                  </td>
                  <td className="p-3">
                    <div className="inline-block mr-2 align-middle h-5 w-5 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
                    <Link className="text-green-thick" to="#">F6DB9</Link>
                  </td>
                  <td className="p-3">
                    <Link className="text-green-thick" to="#">a day ago <RiShareBoxFill className="inline-block" /></Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BackgroundDiv>
  </>)
}

export default ItemPage
