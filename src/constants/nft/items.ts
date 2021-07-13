export interface Token {
  address: string,
  name: string,
  symbol: string,
  tokenImage?: string
}

export interface Offer {
  offersByAddress: string,
  amount: number
}

export interface Lister {
  ListByAddress: string
  price: number
}

export interface Collection {
  name: string,
  contractAddress: string,
  tokenName: string,
  tokenSymbol: string,
  titleImage?: string
}

export interface Event {
  actionName: string,
  price: number,
  from: string,
  to: string,
  actedAt: number
}

export interface NFTItem {
  id: number
  collection: Collection
  title: string
  description: string
  contentLink: string
  mintBy: string
  mintedAt: number
  acceptToken: Token,
  offers?: Offer[],
  listers?: Lister[],
  events: Event[]
}

export const collections: { [key: string]: Collection } = {
  '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a': {
    titleImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg',
    name: 'Elon Musk',
    contractAddress: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
    tokenName: 'Elon Musk NFT',
    tokenSymbol: 'EMBFT'
  }
}

export const items: NFTItem[] = [
  {
    id: 1,
    collection: collections['0x7CE094Bea0e0adF53641310DB1193028D7F7b19a'],
    title: 'Shiba love love test',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dui ac ex elementum malesuada quis sed lectus.',
    contentLink: '/images/nft/testtest.jpg',
    mintBy: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
    mintedAt: 0,
    acceptToken: {
      address: '',
      name: 'BUSD Token',
      symbol: 'BUSD',
      tokenImage: '/images/tokens/busd-square.jpg'
    },
    events: [{
      actionName: 'Created',
      price: 0,
      from: '0x0000000000000000000000000000000000000000',
      to: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
      actedAt: 0
    }]
  },
  {
    id: 2,
    collection: collections['0x7CE094Bea0e0adF53641310DB1193028D7F7b19a'],
    title: 'Shiba love love test',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dui ac ex elementum malesuada quis sed lectus.',
    contentLink: '/images/nft/testtest.jpg',
    mintBy: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
    mintedAt: 0,
    acceptToken: {
      address: '',
      name: 'BUSD Token',
      symbol: 'BUSD',
      tokenImage: '/images/tokens/busd-square.jpg'
    },
    listers: [{
      ListByAddress: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
      price: 10
    }],
    events: [{
      actionName: 'Created',
      price: 0,
      from: '0x0000000000000000000000000000000000000000',
      to: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
      actedAt: 0
    }]
  }
]