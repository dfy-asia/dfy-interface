import styled from 'styled-components'
import Card from './Card'
import TokenAndPrice from './TokenAndPrice'

export {
  Card,
  TokenAndPrice
}

export const BackgroundDiv = styled.div`
  margin-top: -40px;
  margin-bottom: -80px;
  padding-bottom: 80px;
  min-width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const MenuItem = styled.div`
  min-width: 190px;
  padding: 10px;
`

export const WrapContent = styled.div`
  height: calc(100vh - 64px - 82px);
  overflow-y: scroll;

  @media only screen and (max-width: 600px) {
    height: calc(100vh - 300px);
    padding-bottom: 50px;
  }
`

export const WrapContentAccount = styled.div`
  height: calc(100vh - 270px);
  overflow-y: scroll;
`