import * as React from 'react';
import { AccordionItem } from './AccordionItem/AccordionItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getAllDates } from '@/services/getAllDates';



export default function BasicAccordion() {
    const [weeks, setWeeks] = useState<Date[]>([])
    const [reserved, setReserved] = useState<any>([])
    const day: Date = new Date()

    console.log(new Date(day.setDate(day.getDate() + 10)));



    useEffect(() => {
        const arrayOfDates: Date[] = [];

        for (let i = 0; i < 10; i++) {
            const day: Date = new Date()

            let result = new Date(day.setDate(day.getDate() + i));

            arrayOfDates.push(result)
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
    }, [])


    return (
        <>
            {weeks.map((date) => (<AccordionItem key={date.toString()} date={date} workingDays={reserved} />))}
        </>
    );
};
