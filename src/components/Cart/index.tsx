import styled from "styled-components";
import {  useCallback } from "react";
import { FiX, FiTrash } from "react-icons/fi";
import { useCart } from "../../providers/cart";


const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 500px;
  background: ${({theme}) => theme.colors.text};
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  ul {
    list-style: none;
    color: ${({theme}) => theme.colors.white};
    margin: 30px 0;
    li {
      display: flex;
      img {
        width: 170px;
        height: 100px;
        object-fit: cover;
        border-radius: 5px;
      }
      > div {
        margin-left: 15px;
        display: flex;
        flex-direction:column;
      }
      > button {
        margin-left: auto;
        border: 0;
        background: transparent;
        color: ${({theme}) => theme.colors.white};
      }
    }
  }
`;
const ButtonGroup = styled.div`
  margin-top: 15px;
  button {
    width: 20px;
    height: 20px;
    color: ${({theme}) => theme.colors.white};
    background: ${({theme}) => theme.colors.primary};
    font-weight:bold;
    border: none;
    border-radius: 5px;
  }
  span {
    padding: 0 10px ;
  }
  strong {
    margin-left: 20px;
  }
`;
const HeaderContent = styled.div`
  color: ${({theme}) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 20px 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.white};
  h1 {
    text-transform: uppercase;
    font-size: 24px;
    letter-spacing: 0.1rem;
  }
  button {
    border: none;
    background: none;
    svg {
      color: ${({theme}) => theme.colors.white};
    }
  }
`
const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({theme}) => theme.colors.white};
  border-top: 1px solid ${({theme}) => theme.colors.white};
  padding: 20px 0;
  margin-bottom: 10px;
  margin-top: auto;
  h1{
    text-transform: uppercase;
    font-size: 24px;
    letter-spacing: 0.1rem;
  }
`;
const SubmitButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  letter-spacing: 0.1rem;
  border-radius: 5px;
  width: 100%;
  background: ${({theme}) => theme.colors.green};
  color: ${({theme}) => theme.colors.white};
  text-transform: uppercase;
  font-weight: bold;
  height: 60px;
`;

interface CartProps {
  closeCart?: (isOpen: boolean) => void;
}

const Cart: React.FC<CartProps> = ({closeCart}) => {
  const { items } = useCart()
  const handleCloseCart = useCallback(() => {
    closeCart(false)
  }, [])

  return (
    <Container>
      <Content>
        <HeaderContent>
          <h1>Carrinho</h1>
          <button onClick={handleCloseCart}><FiX size={30} /></button>
        </HeaderContent>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <img src={`http://localhost:3333/files/${item.principal_image}`} alt={item.name}/>
              <div>
                <strong>{item.name}</strong>
                <ButtonGroup>
                  <button>-</button><span>1</span><button>+</button><strong>{item.price}</strong>
                </ButtonGroup>
              </div>
              <button>
                <FiTrash size={25}/>
              </button>
            </li>
          ))}
        </ul>
        <FooterContent>
          <h1>Subtotal</h1>
          <span>R$ 350,00</span>
        </FooterContent>
        <SubmitButton>Finalizar Compra</SubmitButton>
      </Content>
    </Container>
  )
}

export default Cart;
