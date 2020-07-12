import styled from 'styled-components'

import Navbar from '../components/Nav';
import { GetServerSideProps } from 'next';
import api from '../services/api';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  width: 1100px;
  padding:30px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 20px;
  }
`

interface Category {
  id: string;
  name: string;
}

interface HomeProps {
  categories: Category[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get('categories')
  return {
    props:{
      categories: response.data
    }
  }
}

export const Home: React.FC<HomeProps> = ({categories}): JSX.Element => {
  return (
    <Container>
      <Navbar categories={categories} />
      <Content>
    <h1>Página inicial da loja</h1>
      </Content>
    </Container>
  )
}

export default Home
