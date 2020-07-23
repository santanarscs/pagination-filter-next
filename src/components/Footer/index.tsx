import { Container, CopyContainer, Content} from './styles'
import Link from 'next/link'

interface Category {
  id: string;
  name: string;
}
interface Props  {
  categories: Category[];
}

const Footer: React.FC<Props> = ({categories}) => {
  return (
    <Container>
      <Content>
        <div>
          <h3>Produtos</h3>
          <ul>
            {categories.map(category => (
              <li key={category.id}>
                <Link href="/products/categoryId" as={`/products/${category.id}`}>
                  <a href="">{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Sobre</h3>
          <ul>
            <li>A marca</li>
            <li>Contato</li>
          </ul>
        </div>
        <div>
          <h3>Acesso Rápido</h3>
          <ul>
            <li>Minha conta</li>
            <li>Meus pedidos</li>
            <li>FAQ</li>
          </ul>
        </div>
      </Content>
      <CopyContainer>
        <p>@ 2020 BOUTIQUE | BOUTIQUE CESTAS S.A. CNPJ: 99.000.999/0001-19 </p>
      </CopyContainer>
    </Container>
  )
}

export default Footer;
