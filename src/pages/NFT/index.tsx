import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { BackgroundDiv, MenuItem, WrapContent, Card } from './components'
import { useItemFilter } from './useItemFilter'
import ItemPage from './ItemPage'
import AccountPage from './AccountPage'
import WelcomePage from './WelcomPage'
import { Link } from 'react-router-dom'
import { CgMenuGridO } from 'react-icons/cg'

export {
  ItemPage,
  AccountPage,
  WelcomePage
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NFT = () => {

  const [openCollectionMenu, setOpenCollectionMenu] = useState(false)

  const [collectionSelected, setCollectionSelected] = useState<any>()

  const { collections, nfts } = useItemFilter(collectionSelected?.contractAddress ?? '')

  return (<>
    {' '}
    <Helmet>
      <title>NFT | DFY</title>
    </Helmet>
    <BackgroundDiv>
      <div className="flex flex-wrap bg-gray-100">
        <div className="px-5 pt-10 pb-5 flex-grow lg:flex-grow-0">
          <div className="block lg:hidden">
            <div className="w-full">
              <MenuItem
                onClick={() => {
                  setOpenCollectionMenu(!openCollectionMenu)
                }}
              >
                <CgMenuGridO className="inline-block align-middle" /> <span className="align-middle">Collection</span>
              </MenuItem>
              {openCollectionMenu && <div>
                {Object.values(collections).map((collection) =><MenuItem
                  key={collection.contractAddress}
                  className={`hover:bg-gray-300 cursor-pointer ${collection.contractAddress === collectionSelected?.contractAddress ? 'bg-gray-200' : ''}`}
                  onClick={() => {
                    setCollectionSelected(collection)
                  }}
                >
                  <div className="inline-block mr-5 align-middle h-9 w-9 rounded-full overflow-hidden">
                    <img src={collection.titleImage} alt="" />
                  </div>
                  <span className="inline-block align-middle">{collection.name}</span>
                </MenuItem>)}
              </div> }
            </div>
          </div>
          <div className="hidden lg:block">
            {Object.values(collections).map((collection) =><MenuItem
              key={collection.contractAddress}
              className={`hover:bg-gray-300 cursor-pointer ${collection.contractAddress === collectionSelected?.contractAddress ? 'bg-gray-200' : ''}`}
              onClick={() => {
                setCollectionSelected(collection)
              }}
            >
              <div className="inline-block mr-5 align-middle h-9 w-9 rounded-full overflow-hidden">
                <img src={collection.titleImage} alt="" />
              </div>
              <span className="inline-block align-middle">{collection.name}</span>
            </MenuItem>)}
          </div>
        </div>
        <div className="flex-grow flex-1 bg-gray-50">
          <div className="px-3 py-5">
            <div className="flex flex-wrap">
              <div>
                {collectionSelected && <div className="pt-3">
                  <div className="inline-block mr-5 align-middle h-20 w-20 overflow-hidden">
                    <img src={collectionSelected.titleImage} alt="" />
                  </div>
                  <div className="inline-block">
                    <div className="text-h3 font-bold">{collectionSelected.name}</div>
                    <div>{collectionSelected.tokenName}</div>
                  </div>
                </div>}
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
          <WrapContent className="px-3">
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
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