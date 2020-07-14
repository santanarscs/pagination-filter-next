import styled from "styled-components";
import { FiLock, FiTruck, FiCreditCard, FiUser } from "react-icons/fi";
import Link from "next/link";
import ChoicePayment from "../components/ChoicePayment";

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
const InformationDetail = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-right: 20px;
`;

const CardInformation = styled.div`
  margin: 10px 0;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
`;

const HeaderDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f4f4f4;
  padding:  6px 16px;
  color: #555;
  > div {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      border-radius: 50%;
      padding: 6px 10px;
      margin-right: 6px;
      font-weight: bold;
      background: #fff;
    }
    h3 {
      font-weight: bold;
      font-size: 16px;
    }
  }
`;
const PersonDetail = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  span {
    line-height: 32px;
  }
`;
const DeliveryDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  span {
    line-height: 32px;
  }
  small {
    margin-left: auto;
    align-self:center;
  }
  button {
    height: 35px;
    border-radius: 5px;
    border: none;
    padding: 0 10px;
    background: #e6e6e6;
  }
`;
const PaymentDetail = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const DetailOrder = styled.div`
  width: 300px;
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
`;

const Payment: React.FC = () => {
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
        <h1>Finalizar Compra</h1>
        <Link href="/checkout">
          <a>Voltar para o carrinho</a>
        </Link>
        <Row>
          <InformationDetail>
            <CardInformation style={{flex: '1 1 calc(25% - 10px)', marginRight: 20}}>
              <HeaderDetail>
                <div>
                  <span>1</span>
                  <h3>Dados Pessoais</h3>
                </div>
                <FiUser size={25} />
              </HeaderDetail>
              <PersonDetail>
                <span>raphaelstn@gmail.com</span>
                <span>Nome: Raphael Santana</span>
                <span>Telefone: (61) 98262-2228</span>
              </PersonDetail>
            </CardInformation>
            <CardInformation style={{flex: '1 1 50%'}}>
                <HeaderDetail>
                  <div>
                    <span>2</span>
                    <h3>Entrega</h3>
                  </div>
                  <FiTruck size={25} />
                </HeaderDetail>
                <DeliveryDetail>
                  <Row>
                    <div style={{width: "50%"}}>
                      <span>Quadra QI 23 Lote 14, 307 Bloco B</span>
                      <span>Guará II - Brasília DF</span>
                      <span>71060639</span>
                    </div>
                    <small>R$ 19,12</small>
                  </Row>
                  <button>Alterar opções de entrega</button>
              </DeliveryDetail>
            </CardInformation>
            <CardInformation style={{flex: '1 1 100%'}}>
              <HeaderDetail>
                <div>
                  <span>3</span>
                  <h3>Pagament</h3>
                </div>
                <FiCreditCard size={25} />
              </HeaderDetail>
              <PaymentDetail>
               <ChoicePayment />
              </PaymentDetail>
            </CardInformation>
          </InformationDetail>
          <DetailOrder>
            <ul>
              <li>
                <h2>Resumo do pedido</h2>
              </li>
              <li>
                <div>Item do pedido</div>
              </li>
              <li>
                <Row>
                  <h2>Subtotal</h2>
                  <span>R$ 49,90</span>
                </Row>
              </li>

              <li>
                <Row>
                  <h2>Total</h2>
                  <span>R$ 49,90</span>
                </Row>
              </li>
            </ul>
            <button>Finalizar compra</button>
          </DetailOrder>
        </Row>
      </Content>
    </Container>
  )
}

export default Payment;
