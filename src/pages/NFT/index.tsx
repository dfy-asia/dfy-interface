import React from 'react'
import { Helmet } from 'react-helmet'
import { BackgroundDiv, MenuItem, WrapContent, Card } from './components'
import { useItemFilter } from './useItemFilter'
import ItemPage from './ItemPage'

export {
  ItemPage
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NFT = () => {

  const { authers, nfts } = useItemFilter('')

  return (<>
    {' '}
    <Helmet>
      <title>NFT | DFY</title>
    </Helmet>
    <BackgroundDiv>
      <div className="flex flex-wrap">
        <div className="px-5 pt-10 bg-gray-100">
          <div className="flex flex-col">
            {Object.values(authers).map((auther) =><MenuItem
              key={auther.address} className="hover:bg-gray-200 cursor-pointer"
            >
              <img className="inline-block mr-5 align-middle h-9 w-9 rounded-full" src={auther.profileImage} alt="" />
              <span className="inline-block align-middle">{auther.name}</span>
            </MenuItem>)}
          </div>
        </div>
        <div className="flex-grow">
          <div className="p-3">
            <div className="flex flex-wrap">
              <div>
                <div className="pt-2">
                  {nfts.length} result{nfts.length > 0 ? 's': ''}
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
              {nfts.map((nft, index) => <Card
                className="cursor-pointer"
                key={index}
                alt={nft.title}
                src={nft.imageLink}
                title={nft.title}
                auther={nft.autherName}
                createDate={nft.createDate}
              />)}
            </div>
          </WrapContent>
        </div>
      </div>
    </BackgroundDiv>
  </>)
}

export default NFT