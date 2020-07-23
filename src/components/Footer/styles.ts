import styled from 'styled-components';

export const Container = styled.footer`
  background: #f4f4f4;
  border-top: 1px solid ${({theme}) => theme.colors.gray1};
`;

export const Content = styled.div`
  width: 1100px;
  margin: 40px auto;
  text-transform: uppercase;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  div {
    h3 {
      font-size: 16px;
      font-weight: bold;
    }
    ul {
      list-style: none;
      margin-top: 20px;
      font-size: 14px;
      li {
        margin: 20px 0;
        a {
          text-decoration: none;
          color: ${({theme}) => theme.colors.text};
        }
      }
    }
  }

`
export const CopyContainer = styled.div`
  background: ${({theme}) => theme.colors.gray1};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.colors.white};
  font-size: 14px;
`
