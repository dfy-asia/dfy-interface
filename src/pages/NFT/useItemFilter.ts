import { authers, items } from '../../constants/nft'


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useItemFilter = (autherAddress: string) => {

  const authersData = Object.values(authers)

  const resultFilter = items.filter(item => autherAddress && autherAddress !== '' ? item.autherAddress === autherAddress : true)

  return {
    authers: authersData,
    nfts: resultFilter
  }
}

