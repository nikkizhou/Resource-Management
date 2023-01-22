import React,{useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


interface Props {
  disabledDates: Date[],
  updatePeriode: Function,
  value: any,
  onChange:any
}

function DatePickerC({disabledDates, updatePeriode, value,onChange}:Props) {
  const [startDate, setStartDate] = useState<Date|null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  console.log(value,'value line 15');
  

  const isWeekday = (date:Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  // const onChange = (dates:any) => {
  //   const [start, end]= dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  return (
    <DatePicker
      selected={startDate}
      onChange={e => {
        
        onChange(startDate);
      }}
      startDate={startDate}
      endDate={endDate}

      placeholderText='Velg en periode...'
    />
  );
}

//      selectsRange

export default DatePickerC
