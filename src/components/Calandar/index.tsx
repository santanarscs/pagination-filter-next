import { useMemo } from 'react';
import DayPicker from 'react-day-picker';
import { Container } from './styles'

const Calendar: React.FC = () => {
  const disabledDays = useMemo(() => {
    return new Date()
  },[])
  return (
    <Container>
      <DayPicker
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        fromMonth={new Date()}
        disabledDays={[{before: disabledDays}]}
        modifiers={{
          available: { daysOfWeek: [1, 2, 3, 4, 5] },
        }}
        // onMonthChange={handleMonthChange}
        // selectedDays={selectedDate}
        // onDayClick={handleDateChange}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]}
      />
    </Container>
  )
}
export default Calendar;
