import { Container, Content} from './styles'

const NewsLetter: React.FC = () => {
  return (
    <Container>
      <Content>
        <h3>Receba novidades da nossa boutique</h3>
        <form>
          <input type="text" placeholder="Seu nome" />
          <input type="email" placeholder="Seu e-email"/>
          <button>Enviar</button>
        </form>
      </Content>
    </Container>
  )
}

export default NewsLetter;
