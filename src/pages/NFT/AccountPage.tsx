import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { BackgroundDiv, MenuItem, WrapContentAccount, Card } from './components'
import { useItemFilter } from './useItemFilter'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
import { FaImages, FaHandPaper } from 'react-icons/fa'
import { RiHistoryLine } from 'react-icons/ri'
import { BsTagFill } from 'react-icons/bs'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AccountPage = ({
  match: {
      params: { 
        address,
        tab
      }
  }}: RouteComponentProps<{ address: string, tab: string }>) => {

  const history = useHistory()
  const tabs = ['collection', 'list', 'offer', 'activity']
  if (!tabs.includes(tab)) {
    history.push(`/nft/account/${address}/collection`)
  }

  const [collectionSelected, setCollectionSelected] = useState<any>()

  const { collections, nfts } = useItemFilter(collectionSelected?.contractAddress ?? '')

  return (<>
    {' '}
    <Helmet>
      <title>NFT | DFY</title>
    </Helmet>
    <BackgroundDiv style={{
      minHeight: '400px'
    }}>
      <div style={{ minHeight: '110px' }} className="text-center pt-5">
        <div style={{ height: '65px', width: '65px' }} className="inline-block mb-3 bg-gradient-to-r from-green-thick to-green-thin rounded-full"></div>
        <div className="text-h3 font-bold">{address.substring(2, 7)}</div>
        <ul id="tabs" className="inline-flex w-full pt-2 ">
          <li className={`px-4 py-3 font-semibold text-green-thick ${tab === 'collection' && 'border-b-4'} border-green-thick rounded-t`}>
            <Link to={`/nft/account/${address}/collection`}><FaImages className="inline-block mr-3 align-middle" />Collection</Link></li>
          <li className={`px-4 py-3 font-semibold text-green-thick rounded-t ${tab === 'activity' && 'border-b-4'} border-green-thick`}>
            <Link to={`/nft/account/${address}/activity`}><RiHistoryLine className="inline-block mr-3 align-middle" />Activity</Link></li>
          <li className={`px-4 py-3 font-semibold text-green-thick rounded-t ${tab === 'list' && 'border-b-4'} border-green-thick`}>
            <Link to={`/nft/account/${address}/list`}><BsTagFill className="inline-block mr-3 align-middle" />List</Link></li>
          <li className={`px-4 py-3 font-semibold text-green-thick rounded-t ${tab === 'offer' && 'border-b-4'} border-green-thick`}>
            <Link to={`/nft/account/${address}/offer`}><FaHandPaper className="inline-block mr-3 align-middle" />Offer</Link></li>
        </ul>
      </div>
      <div className="flex flex-wrap">
        <div className="px-5 pt-5 bg-gray-100">
          <div className="flex flex-col">
            {Object.values(collections).map((collection) =><MenuItem
              key={collection.contractAddress} className={`hover:bg-gray-300 cursor-pointer ${collection.contractAddress === collectionSelected?.contractAddress ? 'bg-gray-200' : ''}`}
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
        <div className="flex-grow">
          <WrapContentAccount className="pl-5 pt-5 pr-1 pb-10">
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
          </WrapContentAccount>
        </div>
      </div>
    </BackgroundDiv>
  </>)
}

export default AccountPage