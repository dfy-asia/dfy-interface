import { collections, items } from '../../constants/nft'


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useItemFilter = (collectionAddress?: string) => {

  const collectionsData = Object.values(collections)
  const resultFilter = items.filter(item => collectionAddress && collectionAddress !== '' ? item.collection.contractAddress === collectionAddress : true)

  const fetchItem = (address: string, id: number) => {
    return items.find((item) => item.collection.contractAddress === address && item.id === id)
  }

  return {
    collections: collectionsData,
    nfts: resultFilter,
    fetchItem
  }
}

