import styled from 'styled-components'
import { useCallback } from 'react';
import Router, { useRouter } from 'next/dist/client/router';

import useProducts from '../hooks/products'
import Pagination from '../components/Pagination';
import Search from '../components/Search';

const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Content = styled.div`
  width: 1100px;
  padding:30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 20px;
  }
`
const ProductsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  margin: 30px 0;
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 295px;
    img {
      height: 260px;
      width: 100%;
      border-radius: 5px;
    }
    strong{
      font-size: 14px;
      font-weight:bold;
      line-height: 32px;
      letter-spacing: 0.2rem;
    }
    small {
      font-size: 16px;
      font-weight: bold;
    }
    button {
      width: 100%;
      background: ${({theme}) => theme.colors.primary};
      color: ${({theme}) => theme.colors.text};
      border: none;
      height: 50px;
      border-radius: 5px;
      text-transform: uppercase;
      font-weight: bold;
      transition: background .3s;
      &:hover {
        background: #1DAB77;
      }
    }
  }
`

interface Product {
  id: string;
  name: string;
  price: number;
  stars: number;
  type: string[];
  tags: string[];
  image: string;
  description: string
}

interface HomeProps {
  products: Product[]
}

export const Home: React.FC<HomeProps> = (): JSX.Element => {
  const { query } = useRouter();
  const { products, isError, isLoading, totalCount, totalPages} = useProducts(query)

  const handleSearch = useCallback((term: string) => {
    Router.push({
      pathname: '/',
      query: { term }
    },
    undefined,
    { shallow: true }
    )
  }, [])

  if(isError) {
    return (
      <Container>
        <Content>
          <h1>Algo de errado não esta certo</h1>
        </Content>
      </Container>
    )
  }
  if(isLoading) {
    return (
      <Container>
        <Content>
          <h1>Carregando</h1>
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <Content>
        <h1>Lista de produtos </h1> 
        <Search placeholder="Buscar em produtos" handleSearch={handleSearch}/>
        <ProductsList>
          {products?.map(product => (
            <li key={product.id}>
              <img src={product.image} alt={product.name}/> 
              <strong>{product.name}</strong>
              <button>Detalhes</button>
            </li>
          ))}
        </ProductsList>
        <Pagination totalPages={totalPages} totalCount={totalCount}/>
      </Content>
    </Container>
  )
}

export default Home
