import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 40px;
  background: ${({theme}) => theme.colors.gray2};
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
`
export const Content = styled.div`
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
export const Menu = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`
export const MenuContent = styled.div`
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
