import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({theme}) => theme.colors.primary};
`;

export const Home = (): JSX.Element => (
  <Title>Teste</Title>
)

export default Home
