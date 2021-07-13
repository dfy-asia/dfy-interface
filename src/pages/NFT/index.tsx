import React from 'react'
import { Helmet } from 'react-helmet'
import { BackgroundDiv, MenuItem, WrapContent, Card } from './components'
import { useItemFilter } from './useItemFilter'
import ItemPage from './ItemPage'
import { Link } from 'react-router-dom'

export {
  ItemPage
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NFT = () => {

  const { collections, nfts } = useItemFilter('')

  return (<>
    {' '}
    <Helmet>
      <title>NFT | DFY</title>
    </Helmet>
    <BackgroundDiv>
      <div className="flex flex-wrap">
        <div className="px-5 pt-10 bg-gray-100">
          <div className="flex flex-col">
            {Object.values(collections).map((collection) =><MenuItem
              key={collection.contractAddress} className="hover:bg-gray-200 cursor-pointer"
            >
              <div className="inline-block mr-5 align-middle h-9 w-9 rounded-full overflow-hidden">
                <img src={collection.titleImage} alt="" />
              </div>
              <span className="inline-block align-middle">{collection.name}</span>
            </MenuItem>)}
          </div>
        </div>
        <div className="flex-grow">
          <div className="p-3">
            <div className="flex flex-wrap">
              <div>
                <div className="pt-2">
                  {nfts.length} result{nfts.length > 1 ? 's': ''}
                </div>
              </div>
              {/* <div className="text-right flex-grow">
                <select>
                  <option>Recently Minted</option>
                  <option>Recently Listed</option>
                </select>
              </div> */}
            </div>
          </div>
          <WrapContent className="pl-3 pr-1">
            <div className="grid gap-4 grid-cols-4">
              {nfts.map((nft, index) => <Link
                key={index}
                to={`/nft/${nft.collection.contractAddress}/${nft.id}`}>
                <Card
                  className="cursor-pointer"
                  item={nft}
                />
              </Link>)}
            </div>
          </WrapContent>
        </div>
      </div>
    </BackgroundDiv>
  </>)
}

export default NFT