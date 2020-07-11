import styled from "styled-components";
import { FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../providers/cart'
const Container = styled.div`
  width: 100%;
  height: 40px;
  background: ${({theme}) => theme.colors.gray2};
  display: flex;
  align-items: center;
`
const Content = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 1100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    background: none;
    border: none;
    color: ${({theme}) => theme.colors.text};
    position: relative;
    svg {
      color: ${({theme}) => theme.colors.text};;
      transition: color .2s;
    }
    span {
      position: absolute;
      top: -10px;
      right: -8px;
      background: ${({theme}) => theme.colors.primary};;
      color: ${({theme}) => theme.colors.white};
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
    }
    &:hover {
      svg {
        color: ${({theme}) => theme.colors.primary};
      }
    }
  }
`

const Navbar: React.FC = () => {
  const { items, openCart } = useCart();
  return (
    <Container>
      <Content>
        <button onClick={openCart}>
          {items.length > 0 && <span>{items.length}</span>}
          <FiShoppingBag size={20}/>
        </button>
      </Content>
    </Container>
  )
}

export default Navbar;
