import React from 'react'
import styled from 'styled-components'
import { MdTimelapse } from 'react-icons/md'

const CardDiv = styled.div``

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
  title: string
  auther: string
  createDate?: number
  className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Card = ({
  src,
  alt,
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
        <div style={{ fontSize: '14px' }} className="text-gray-400">{auther}</div>
        <div>{title}</div>
        <div className="mt-5 text-right text-gray-400">
          <MdTimelapse className="inline-block mr-1" /><span style={{ fontSize: '14px' }}>2 days ago</span>
        </div>
      </div>
    </CardDiv>
  )
}

export default Card