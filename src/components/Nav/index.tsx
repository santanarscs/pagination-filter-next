import { FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../providers/cart'
import Link from "next/link";
import { Container, Content, Menu, MenuContent } from './styles'
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
          <img src="../logo.png" alt="Boutique"/>
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
