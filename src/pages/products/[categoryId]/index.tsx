import { useRouter } from "next/router";
import useProducts from "../../../hooks/products";
import styled from "styled-components";
import { formatPrice } from "../../../utils/formatPrice";
import Link from "next/link";
import Pagination from "../../../components/Pagination";
import Navbar from "../../../components/Nav";
import api from "../../../services/api";
import { GetServerSideProps } from "next";
import Footer from "../../../components/Footer";
import NewsLetter from "../../../components/NewsLetter";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  width: 1100px;
  height: 100vh;
  padding:30px 0;
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
    strong{
      font-size: 14px;
      line-height: 24px;
      color: ${({theme}) => theme.colors.gray1};
    }
    span {
      font-size: 16px;
      font-weight: bold;
      line-height: 32px;
      margin: 10px 0;
    }
  }
`
const ImageContainer = styled.div`
  position: relative;
  height: 260px;
  width: 100%;

  img {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    transition: .5s ease;
    backface-visibility: hidden;
    object-fit: cover;
    border-radius: 5px;
  }
  > div {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.white};
    height: 50px;
    width:160px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
  }
  &:hover img {
    opacity: 0.3;
  }
  &:hover > div {
    opacity: 1
  }
  a {
    font-size: 14px;
    text-transform: uppercase;
    text-decoration: none;
    color: ${({theme}) => theme.colors.white};
  }
`;

interface Category {
  id: string;
  name: string;
}

interface ProductProps {
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


const Products: React.FC<ProductProps> = ({categories}) => {
  const { query } = useRouter();
  const { products, isError, isLoading, totalCount, totalPages} = useProducts(query)
  if(isError) {
    return (
      <Container>
        <Navbar categories={categories}/>
        <Content>
          <h1>Algo de errado não esta certo</h1>
        </Content>
      </Container>
    )
  }
  if(isLoading) {
    return (
      <Container>
        <Navbar categories={categories}/>
        <Content>
          <h1>Carregando</h1>
        </Content>
        <NewsLetter />
        <Footer categories={categories} />
      </Container>
    )
  }

  return (
    <Container>
      <Navbar categories={categories}/>
      <Content>
        <h1>Lista de produtos </h1>
        <ProductsList>
          {products?.map(product => (
            <li key={product.id}>
              <ImageContainer>
                <img src={`http://localhost:3333/files/${product.principal_image}`} alt={product.name}/>
                <div>
                  <Link href="/product/id" as={`/product/${product.id}`}>
                    <a >ver detalhes</a>
                  </Link>
                </div>
              </ImageContainer>
              <strong>{product.name}</strong>
              <span>{formatPrice(product.price)}</span>
            </li>
          ))}
        </ProductsList>
        <Pagination totalPages={totalPages} totalCount={totalCount}/>
      </Content>
      <Footer categories={categories} />
    </Container>
  )
}
export default Products;
