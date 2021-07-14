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
  },
  '0x626939e224FbD56F5DE5b244dC04f8a1cEF40613': {
    titleImage: 'https://cdn.pixabay.com/photo/2021/05/12/20/42/doge-6249264_960_720.png',
    name: 'Elon Doge',
    contractAddress: '0x626939e224FbD56F5DE5b244dC04f8a1cEF40613',
    tokenName: 'Elon Doge NFT',
    tokenSymbol: 'EDBFT'
  },
  '0x280d3ed4ff477B9f88AB60596af8C72B798d993B': {
    titleImage: 'https://cdn.pixabay.com/photo/2021/03/09/20/52/elon-musk-6082845_960_720.png',
    name: 'Elon God',
    contractAddress: '0x280d3ed4ff477B9f88AB60596af8C72B798d993B',
    tokenName: 'Elon God NFT',
    tokenSymbol: 'EDBFT'
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
  },
  {
    id: 3,
    collection: collections['0x626939e224FbD56F5DE5b244dC04f8a1cEF40613'],
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
  },
  {
    id: 4,
    collection: collections['0x626939e224FbD56F5DE5b244dC04f8a1cEF40613'],
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
  },
  {
    id: 5,
    collection: collections['0x626939e224FbD56F5DE5b244dC04f8a1cEF40613'],
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
    offers: [
      {
        offersByAddress: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
        amount: 200
      }
    ],
    events: [{
      actionName: 'Created',
      price: 0,
      from: '0x0000000000000000000000000000000000000000',
      to: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
      actedAt: 0
    }]
  }
]