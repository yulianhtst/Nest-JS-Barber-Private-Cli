import * as React from 'react';
import { AccordionItem } from './AccordionItem/AccordionItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function BasicAccordion() {
  const [weeks, setWeeks] = useState<Date[]>([])

  useEffect(() => {
    const arrayOfDates: Date[] = [];
    const day: Date = new Date()

    for (let i = 0; i < 10; i++) {
      let result = day.setDate(day.getDate() + i);
      arrayOfDates.push(new Date(result))
    }

    setWeeks(arrayOfDates)
  }, [])


  console.log(weeks);
  return (
    <>
      {weeks.map((date, index) => (<AccordionItem date={date} />))}
    </>
  );
}