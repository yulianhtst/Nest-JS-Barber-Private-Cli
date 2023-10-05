import * as React from 'react';
import { AccordionItem } from './AccordionItem/AccordionItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { bookedDates } from '@/services/getBookedDates';

interface AccordionProps {
    tenGeneratedDates: string[];
}

export default function BasicAccordion({ tenGeneratedDates }) {
    const [booked, setBooked] = useState<any>([])


    useEffect(() => {
        (async () => {
            try {
                const res = await bookedDates();
                const mappedRes = res.map(d => Object.assign(d, { date: new Date(d.date).toString().substring(4, 16) }))
                setBooked(mappedRes)
            } catch (error) {
                console.error(error);
            }
        }
        )()
    }, [])


    return (
        <>
            {tenGeneratedDates.map((date: string) => (<AccordionItem key={date.toString()} date={date} bookedDays={booked} />))}
        </>
    );
};
