import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { BackgroundDiv } from './components'

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
    <BackgroundDiv>
    </BackgroundDiv>
  </>)
}

export default ItemPage
