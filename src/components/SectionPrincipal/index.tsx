import { Container } from './styles'
import Link from 'next/link'

interface Props {
  title: string;
  link: string
}

const SectionPrincipal: React.FC<Props> = ({title, link}) => {
  return (
    <Container>
     <div>
      <h1>{title}</h1>
        <Link href="/products/categoryId" as={link}>
          <a>Ver tudo</a>
        </Link>
     </div>
    </Container>
  )
}

export default SectionPrincipal;
