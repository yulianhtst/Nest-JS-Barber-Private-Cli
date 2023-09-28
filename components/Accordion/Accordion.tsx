import * as React from 'react';
import { AccordionItem } from './AccordionItem/AccordionItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getAllDates } from '@/services/getAllDates';



export default function BasicAccordion() {
  const [weeks, setWeeks] = useState<Date[]>([])
  const [reserved, setReserved] = useState<any>([])

  useEffect(() => {
    const arrayOfDates: Date[] = [];
    const day: Date = new Date()

    for (let i = 0; i < 10; i++) {
      let result = day.setDate(day.getDate() + i);
      arrayOfDates.push(new Date(result))
    }

    setWeeks(arrayOfDates)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllDates();
        setReserved(res)
      } catch (error) {
        console.error(error);
      }
    }
    )()
    console.log({
      reserved,
      weeks
    });
  }, [])

  
  return (
    <>
      {weeks.map((date) => (<AccordionItem key={date.toString()} date={date} workingDays={reserved} />))}
    </>
  );
};
