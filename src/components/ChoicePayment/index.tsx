/* eslint-disable @typescript-eslint/camelcase */
import styled from "styled-components";
import { useState } from "react";
import Cards from 'react-credit-cards';
const Container = styled.div`
  display: flex;
  ol {
    list-style: none;
    margin-right: 10px;
    li {
      padding: 10px 0;
      cursor: pointer;
    }
  }
  ul {
    flex: 1;
    list-style: none;
    background: #f4f4f4;
    padding: 10px;
    li{
      padding: 10px 0;
      p {
        line-height: 32px;
      }
    }
  }

`
const CreditCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const FormCreditCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  input {
    height: 35px;
    border-radius: 5px;
    border: 1px solid ${({theme}) => theme.colors.gray1};
    background: ${({theme}) => theme.colors.white};
    padding: 10px;
    width: 100%;
    margin-bottom: 15px;
  }
  > div {
    display: flex;
    flex-direction: column;
  }
`

const ChoicePayment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('CreditCard')
  const handleChangeTab = (label: string) => {
    setActiveTab(label)
  }
  const [card, setCard] = useState({
    card_holder_name: '',
    card_number: '',
    card_expiration_date: '',
    card_cvv: '',
    id: '',
  });

  function handleChangeCard(e) {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value, id: '' });
  }

  return (
    <Container>
      <ol>
        <li onClick={() => handleChangeTab('CreditCard')}>Cartao de crédito</li>
        <li onClick={() => handleChangeTab('Boleto')}>Boleto bancario</li>
      </ol>
      <ul>
        {activeTab === 'CreditCard' && (
          <li>
          <CreditCardContainer>
            <FormCreditCard>
            <label htmlFor="card_holder_name">Nome Completo</label>
            <input
              id="card_holder_name"
              name="card_holder_name"
              type="text"
              onChange={handleChangeCard}
            />
            <label htmlFor="card_number">Número do cartão</label>
            <input
              id="card_number"
              name="card_number"
              type="text"
              onChange={handleChangeCard}
            />
            <div>
              <label htmlFor="card_expiration_date">Vencimento</label>
              <input
                id="card_expiration_date"
                name="card_expiration_date"
                type="text"
                onChange={handleChangeCard}
              />
            </div>
            <div>
            <label htmlFor="card_cvv">CVC</label>
              <input
                id="card_cvv"
                name="card_cvv"
                type="text"
                onChange={handleChangeCard}
              />
            </div>
          </FormCreditCard>
          <div className="credit-card">
            <Cards
              number={card.card_number}
              name={card.card_holder_name}
              expiry={card.card_expiration_date}
              cvc={card.card_cvv}
              focused="number"
            />
          </div>
          </CreditCardContainer>
          </li>
        )}
        {activeTab === 'Boleto' && (
          <li>
            <p>O Boleto bancário será exibido após a confirmação
              da compra e poderá ser impresso para pagamento em qualquer
              agência bancária, ou ter o número anotado para pagamento pelo
              telefone ou internet.
              Valor total: R$ 168,12
            </p>
          </li>
        )}

      </ul>
    </Container>
  )
}

export default ChoicePayment;
