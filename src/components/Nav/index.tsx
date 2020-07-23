import styled from "styled-components";
import { FiShoppingBag, FiCloud } from 'react-icons/fi'
import { useCart } from '../../providers/cart'
import Link from "next/link";
const Container = styled.div`
  width: 100%;
  height: 40px;
  background: ${({theme}) => theme.colors.gray2};
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
`
const Content = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 1100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    margin-top: 10px;
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
const Menu = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
`
const MenuContent = styled.div`
  height: 100%;
  margin: 0 auto;
  width: 1100px;
  display: flex;
  align-items: center;
  span {
    margin-right: 16px;
    svg {
      color: ${({theme}) => theme.colors.primary};
    }
  }
  ul {
    list-style: none;
    display: flex;
    li a {
      text-decoration:none;
      color: ${({theme}) => theme.colors.text};
      text-transform: uppercase;
      padding: 0 8px;
      font-size: 13px;
      cursor: pointer;
      font-weight: bold;
    }
  }
`

interface Category {
  id: string;
  name: string;
}

interface NavbarProps {
  categories: Category[]
}

const Navbar: React.FC<NavbarProps> = ({categories}) => {
  const { items, openCart } = useCart();
  return (
    <>
    <Container>
      <Content>

        <button onClick={openCart}>
          {items.length > 0 && <span>{items.length}</span>}
          <FiShoppingBag size={20}/>
        </button>
      </Content>
    </Container>
    <Menu>
      <MenuContent>
        <span>
          <img src="./logo.png" alt="Boutique"/>
        </span>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {categories?.map(category => (
            <li key={category.id}>
              <Link href="/products/categoryId" as={`/products/${category.id}`}>
                <a>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </MenuContent>
    </Menu>
    </>
  )
}

export default Navbar;
