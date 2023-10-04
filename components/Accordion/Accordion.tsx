import * as React from 'react';
import { AccordionItem } from './AccordionItem/AccordionItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { bookedDates } from '@/services/getBookedDates';



export default function BasicAccordion({ tenGeneratedDates }) {
    const [booked, setBooked] = useState<any>([])


    useEffect(() => {
        (async () => {
            try {
                const res = await bookedDates();
                setBooked(res)
            } catch (error) {
                console.error(error);
            }
        }
        )()
    }, [])


    return (
        <>
            {tenGeneratedDates.map((date) => (<AccordionItem key={date.toString()} date={date} bookedDays={booked} />))}
        </>
    );
};
