import React from 'react'
import styled from 'styled-components'
import { MdTimelapse } from 'react-icons/md'
import TimeAgo from 'timeago-react'
import TokenAndPrice from './TokenAndPrice'
import { NFTItem } from '../../../constants/nft/items'

const CardDiv = styled.div`
  background-color: white;
`

const CardImageWrapper = styled.div`
  overflow: hidden;
`

const CardImage = styled.img`
  object-fit: contain;
  opacity: 1;
`

export interface CardProps {
  item: NFTItem
  className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Card = ({
  item,
  className = ''
}: CardProps) => {
  return (
    <CardDiv className={`border border-gray-200 ${className} rounded-md overflow-hidden`}>
      <CardImageWrapper>
        <CardImage alt={item.title} src={item.contentLink} />
      </CardImageWrapper>
      <div className="p-3">
        <div className="flex justify-between">
          <div style={{ minWidth: '20%', maxWidth: '70%' }} className="flex-1">
            <div
              style={{ fontSize: '14px' }} className="text-gray-400"
            >
              {item.collection.name}
            </div>
            <div className="truncate flex-1">
              {item.title}
            </div>
          </div>
          { (item.listers && item.listers.length > 0) && <div className="text-right">
            <div style={{ fontSize: '14px' }} className="text-gray-400">Price</div>
            <TokenAndPrice
              price={item.listers[0].price}
              tokenAddress={item.listers[0].acceptToken.address}
              tokenImageSrc={item.listers[0].acceptToken.tokenImage}
              tokenSymbol={item.listers[0].acceptToken.symbol}
              size="sm"
              truncateNumber={true}
            />
          </div>}
        </div>
        <div className="mt-5 text-right text-gray-400">
          <MdTimelapse className="inline-block mr-1" /><span style={{ fontSize: '14px' }}><TimeAgo datetime={item.mintedAt} /></span>
        </div>
      </div>
    </CardDiv>
  )
}

export default Card