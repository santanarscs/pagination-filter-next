import styled from "styled-components";
import { FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../providers/cart'
import Link from "next/link";
const Container = styled.div`
  width: 100%;
  height: 50px;
  background: ${({theme}) => theme.colors.gray1};
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
  a {
    text-decoration: none;
    text-transform: uppercase;
    color: ${({theme}) => theme.colors.text};
    position: relative;
    & + a {
      margin-left: 10px;
    }
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
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
    &:hover {
      svg {
        color: ${({theme}) => theme.colors.primary};
      }
    }
  }
`

const Navbar: React.FC = () => {
  const { items } = useCart();
  return (
    <Container>
      <Content>
        <Link href="/cart">
            <a>
              {items.length > 0 && <span>{items.length}</span>}
              <FiShoppingBag size={20}/>
            </a>
          </Link>
      </Content>
    </Container>
  )
}

export default Navbar;
