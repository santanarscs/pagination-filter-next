import styled from 'styled-components';
import { useCart } from '../providers/cart';
import { FiTrash, FiLock, FiMinus, FiPlus } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';
import Link from 'next/link';
import { useCallback } from 'react';
import Router  from 'next/router';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Navbar = styled.header`
  width: 100%;
  background: ${({theme}) => theme.colors.gray2};
  color: ${({theme}) => theme.colors.text};
  height: 70px;
  display: flex;
  align-items: center;
`
const NavbarContent = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    margin-left: auto;
    svg {
      margin-right: 15px;
    }
  }
`;
const Content = styled.div`
  width: 1100px;
  padding: 30px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 24px;
  }
  > a {
    margin-bottom: 40px;
    color: ${({theme}) => theme.colors.gray1};
  }
`
const Row = styled.div`
  display: flex;
  > span {
    margin-left: auto;
  }
`
const TableProducts = styled.table`
  margin-right: 20px;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-collapse: collapse;
  text-align: left;
  tr th {
    font-size: 16px;
    font-weight: bold;
    padding: 20px;
    background: ${({theme}) => theme.colors.gray2};
  }
  tr td {
    padding: 20px;
    border-bottom: 1px solid #e6e6e6;
    > div {
      display: flex;
      align-items: center;
      > button {
        width: 20px;
        height: 20px;
        color: ${({theme}) => theme.colors.white};
        background: ${({theme}) => theme.colors.primary};
        font-weight:bold;
        border: none;
        border-radius: 5px;
      }
      span {
        padding: 0 10px;
      }
      img {
        height: 45px;
        width: 45px;
        object-fit: cover;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    > button {
      border: 0;
      background: transparent;
      svg {
        color: ${({theme}) => theme.colors.gray1};
      }
    }
  }
`;
const CheckoutDetail = styled.div`
  width: 500px;
  margin-left: auto;
  ul{
    list-style:none;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    li {
      padding: 16px;
      h2{
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
      }
      select {
        margin-top: 20px;
        width: 100%;
        height: 35px;
        background: transparent;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid ${({theme}) => theme.colors.gray1};
      }
    }
    li + li {
      border-top: 1px solid #d9d9d9;
    }
  }
  > button {
    margin-top: 20px;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background: ${({theme}) => theme.colors.green};
    color: ${({theme}) => theme.colors.white};
  }
`
const CuponContainer = styled.div`
  display: flex;
  margin-top: 20px;
  input {
    height: 35px;
    border-radius: 5px;
    border: 1px solid ${({theme}) => theme.colors.gray1};
    background: transparent;
    padding: 10px;
    width: 100%;
    margin-right: 10px;
  }
  button {
    height: 35px;
    border-radius: 5px;
    border: none;
    padding: 0 10px;
    background: #e6e6e6;
  }
`

const Checkout: React.FC = () => {
  const { items, total, updateAmount, removeFromCart } = useCart()
  const handlePayment = useCallback(() => {
    Router.push({
      pathname: '/payment'
    })
  }, [])
  return (
    <Container>
      <Navbar>
        <NavbarContent>
          <h2>Minha loja</h2>
          <div>
            <FiLock size={30} />
            <span>Compra 100% segura</span>
          </div>
        </NavbarContent>

      </Navbar>
      <Content>
        <h1>Meu carrinho</h1>
        <Link href="/">
          <a>Escolher mais produtos</a>
        </Link>
        <Row>
          <TableProducts>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div>
                      <img src={`http://localhost:3333/files/${item.principal_image}`} alt={item.name}/>
                      {item.name}
                    </div>
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td>
                    <div>
                      <button onClick={() => updateAmount(item.id, item.quantity - 1 )}><FiMinus size={10}/></button>
                        <span>{item.quantity}</span>
                      <button onClick={() => updateAmount(item.id, item.quantity + 1 )}><FiPlus size={10}/></button>
                    </div>
                  </td>
                  <td>{formatPrice(item.quantity * item.price)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>
                      <FiTrash size={25}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableProducts>
          <CheckoutDetail>
            <ul>
              <li>
                <h2>Cupom de desconto</h2>
                <CuponContainer>
                  <input type="text" name="cupom_desconto"/>
                  <button>Adicionar</button>
                </CuponContainer>
              </li>
              <li>
                <Row>
                  <h2>Subtotal</h2>
                  <span>{formatPrice(total)}</span>
                </Row>
              </li>
              <li>
                <Row>
                  <h2>Total</h2>
                  <span>{formatPrice(total)}</span>
                </Row>
              </li>
            </ul>
            <button onClick={handlePayment}>Fechar pedido</button>
          </CheckoutDetail>
        </Row>
      </Content>
    </Container>
  )
}

export default Checkout;
