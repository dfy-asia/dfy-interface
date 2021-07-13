import React from 'react'
import styled from 'styled-components'
import { MdTimelapse } from 'react-icons/md'
import TimeAgo from 'timeago-react'
import TokenAndPrice from './TokenAndPrice'
import { Token } from '../../../constants/nft/items'

const CardDiv = styled.div`
  max-width: 256px;
`

const CardImageWrapper = styled.div`
  width: 256px;
  height: 268px;
  overflow: hidden;
`

const CardImage = styled.img`
  object-fit: contain;
  opacity: 1;
`

export interface CardProps {
  src: string
  alt: string
  price: number
  acceptToken: Token
  title: string
  auther: string
  createDate: number
  className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Card = ({
  src,
  alt,
  price,
  acceptToken,
  title,
  auther,
  className = '',
  createDate
}: CardProps) => {
  return (
    <CardDiv className={`border border-gray-200 ${className}`}>
      <CardImageWrapper>
        <CardImage alt={alt} src={src} />
      </CardImageWrapper>
      <div className="p-3">
        <div className="flex justify-between">
          <div style={{ minWidth: '20%', maxWidth: '70%' }} className="flex-1">
            <div
              style={{ fontSize: '14px' }} className="text-gray-400"
            >
              {auther}
            </div>
            <div className="truncate flex-1">
              {title}
            </div>
          </div>
          { price !== 0 && <div className="text-right">
            <div style={{ fontSize: '14px' }} className="text-gray-400">Price</div>
            <TokenAndPrice
              price={price}
              tokenAddress={acceptToken.address}
              tokenImageSrc={acceptToken.tokenImage}
              tokenSymbol={acceptToken.symbol}
              size="sm"
              truncateNumber={true}
            />
          </div>}
        </div>
        <div className="mt-5 text-right text-gray-400">
          <MdTimelapse className="inline-block mr-1" /><span style={{ fontSize: '14px' }}><TimeAgo datetime={createDate} /></span>
        </div>
      </div>
    </CardDiv>
  )
}

export default Card