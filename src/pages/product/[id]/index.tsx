import styled from "styled-components"
import { GetServerSideProps } from "next";
import api from "../../../services/api";
import { formatPrice } from "../../../utils/formatPrice";

const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Content = styled.div`
  width: 1100px;
  padding:30px;
  margin: 0 auto;
  display: flex;
  /* flex-direction: column; */
  
`
const ProductInformation = styled.div`
  margin-left: 40px;
  h2 {
    font-size: 18px;
    line-height: 32px;
  }
  > div{
    margin: 40px 0;
    span {
      font-size: 12px;
    }
    h1 {
      font-size:32px;
      letter-spacing: 0.2rem;
      font-weight: bold;
    }
    strong {
      font-weight: bold;
      font-size: 16px;
      line-height: 32px;
    }
    p {
      color: ${({theme})=> theme.colors.gray1};
      line-height: 29px;
    }
  }
  button {
    border: none;
    border-radius: 5px;
    background: ${({theme})=> theme.colors.green};
    color: ${({theme})=> theme.colors.white};
    width: 20px;
    height: 60px;
    width: 100%;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  button {
    border: none;
    border-radius: 5px;
    background: ${({theme})=> theme.colors.primary};
    color: ${({theme})=> theme.colors.white};
    width: 20px;
    height: 20px;
  }
  span {
    padding: 0 10px;
  }
`
const ImageContainer = styled.div`
  width: 700px;
  img {
    width: 500px;
    height: 500px;
    border-radius: 5px;
    object-fit: cover;
  }

`;
interface Product {
  id: string;
  name: string;
  price: number;
  stars: number;
  type: string[];
  tags: string[];
  principal_image: string;
  description: string
}

interface ProductProps {
  product: Product
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { id } = params;
  const response = await api.get(`products/${id}`)
  return {
    props: {
      product: response.data
    }
  }
} 

const Product: React.FC<ProductProps> = ({product}) => {
  return (
    <Container>
      <Content>
        <ImageContainer>
        <img src={`http://localhost:3333/files/${product.principal_image}`} alt={product.name}/>
        </ImageContainer>
        <ProductInformation>
          <h2>{product.name}</h2>  
          <div>
            <span>Valor:</span>
            <h1>{formatPrice(product.price)}</h1>
            <ButtonGroup>
              <button>-</button> <span>1</span><button>+</button>
            </ButtonGroup>
          </div>
          <button>ADICIONAR AO CARRINHO</button>
          <div>
            <strong>Detalhes</strong>
            <p>Descrição: {product.description}</p>
          </div>
        </ProductInformation>
      </Content>
    </Container>
  )
}
export default Product