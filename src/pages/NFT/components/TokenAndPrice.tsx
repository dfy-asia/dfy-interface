import React from 'react'
import { IoMdHelpCircleOutline } from 'react-icons/io'

export interface TokenAndPriceProps {
  style?: any
  price: number
  tokenAddress: string,
  tokenSymbol: string,
  tokenImageSrc?: string,
  size?: 'sm' | 'md' | 'lg',
  className?: string,
  truncateNumber?: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TokenAndPrice = ({
  style,
  price,
  tokenAddress,
  tokenSymbol,
  tokenImageSrc,
  size = 'md',
  className,
  truncateNumber
}: TokenAndPriceProps) => {

  let sizeImage = 'w-8 h-8'
  let sizeText = 'text-xl'
  let iconTokenSize = 38

  if (size === 'sm') {
    sizeImage="w-6 h-6"
    sizeText = 'text-caption2'
    iconTokenSize = 28
  } else if (size === 'lg') {
    sizeImage="w-10 h-10"
    sizeText = 'text-h2'
    iconTokenSize = 48
  }

  let tn = {}

  if (truncateNumber) {
    tn = {minWidth: '10%', maxWidth: '45%'}
  }

  return (<>
    <div
      style={style}
      className={`${className} ${sizeText}`}
    >
      {tokenImageSrc && tokenImageSrc !== '' && <img className={`rounded-full inline-block mr-3 ${sizeImage}`} src={tokenImageSrc} alt={tokenSymbol}/>}
      {!tokenImageSrc && <IoMdHelpCircleOutline className="inline-block mr-3 align-middle" size={iconTokenSize} />} 
      <div style={tn} className="inline-block align-middle truncate">{price}</div>
    </div>
  </>)
}

export default TokenAndPrice