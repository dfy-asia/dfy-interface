export interface Token {
  address: string,
  name: string,
  symbol: string,
  tokenImage?: string
}

export interface NFTItem {
  id: number
  createBy: string
  autherName: string
  autherAddress: string
  title: string
  imageLink: string
  createDate: number
  price: number,
  acceptToken: Token
}

export const authers = {
  '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a': {
    address: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
    name: 'Elon Musk',
    profileImage: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
}

export const items: NFTItem[] = [
  {
    id: 1,
    createBy: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
    autherName: 'Elon Musk',
    autherAddress: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
    title: 'Shiba love love test',
    imageLink: '/images/nft/testtest.jpg',
    createDate: 0,
    price: 0,
    acceptToken: {
      address: '',
      name: '',
      symbol: ''
    }
  },
  {
    id: 2,
    createBy: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
    autherName: 'Elon Musk',
    autherAddress: '0x7CE094Bea0e0adF53641310DB1193028D7F7b19a',
    title: 'Shiba love love test',
    imageLink: '/images/nft/testtest.jpg',
    createDate: 0,
    price: 10,
    acceptToken: {
      address: '',
      name: 'BUSD Token',
      symbol: 'BUSD',
      tokenImage: '/images/tokens/busd-square.jpg'
    }
  }
]