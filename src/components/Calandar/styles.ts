import styled from "styled-components";
import { shade } from 'polished'
export const Container = styled.div`
  margin: 10px 0;
.DayPicker {
    background: ${({theme}) => theme.colors.gray2};
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${({theme}) => theme.colors.gray1};
    border-radius: 5px;
    color: ${({theme}) => theme.colors.white};
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: ${({theme}) => theme.colors.primary} !important;
    border-radius: 5px;
    color: ${({theme}) => theme.colors.text} !important;
  }
`
