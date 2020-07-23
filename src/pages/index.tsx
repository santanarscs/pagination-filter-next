import styled from 'styled-components'

import Navbar from '../components/Nav';
import { GetServerSideProps } from 'next';
import api from '../services/api';
import SectionPrincipal from '../components/SectionPrincipal';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

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
      {categories.map(category => (
        <SectionPrincipal
          key={category.id}
          title={category.name}
          link={`/products/${category.id}`}
        />
      ))}
      <NewsLetter />
      <Footer categories={categories} />
    </Container>
  )
}

export default Home
