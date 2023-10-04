import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { green, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { postDayOff } from "@/services/postDayOff";
import { deleteDate } from "@/services/deleteDate";
import { bookedDates } from "@/services/getBookedDates";
import { API_URL } from "@/constants";
import useSWR from "swr";

interface AccordionProps {
    date: Date
    bookedDays: [any]
}

const fetcher = async () => {
    const response = await fetch(API_URL + 'dates/1')
    const data = await response.json()
    return data
}

export const AccordionItem: React.FC<AccordionProps> = ({ date, bookedDays }) => {
    const { data: databaseDates, error, isValidating, mutate } = useSWR('dates', fetcher)

    const [reserved, setReserved] = useState<any>([])
    const [dayoff, setDayoff] = useState(false)
    const currentDate = date.toString().substring(4, 16)

    useEffect(() => {
        setReserved(
            bookedDays.filter(x => {
                const reservedDate = new Date(x.date).toString().substring(4, 16)
                return currentDate === reservedDate
            }))
    }, [bookedDays, currentDate])




    const onAccordionOpenClickHandler = async () => {
        const allBookedDates = await bookedDates()

        const reservedDates = allBookedDates.filter((x: any) => {
            const reservedDate = new Date(x.date).toString().substring(4, 16)

            return currentDate === reservedDate
        })

        setReserved(reservedDates)
    }

    const onButtonClickHandler = async () => {

        const sentDate = { date: new Date(date) }
        const restDay = await postDayOff(sentDate)

        let count = 0
        const d = databaseDates.find(x => {
            const dbDate = x.date.slice(0, 10)
            const accordionItemDate = new Date(date).toISOString().slice(0, 10)
            count++
            return dbDate === accordionItemDate
        })
        mutate()

        restDay.error ? setDayoff(true) : setDayoff(false)

        console.log(count, 'Брой почивни дати');
        console.log(d, 'Резултата от търсенето в масива с почивни дни');
        console.log(restDay, 'Създаване на дата ');
    }

    return (
        <Accordion>
            <AccordionSummary
                onClick={onAccordionOpenClickHandler}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    ...(reserved.length <= 6 && { backgroundColor: '#ff1100' }),
                    ...(reserved.length <= 4 && { backgroundColor: '#fbff00' }),
                    ...(reserved.length <= 2 && { backgroundColor: '#4bee00' }),
                    ...(reserved.length == 0 && { backgroundColor: 'white' }),
                }}
            >
                <Typography >{currentDate}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box display="flex" gap="1rem" flexWrap='wrap'>
                    {
                        Boolean(reserved.length) &&
                        <>
                            <Box display="flex" flexDirection="column">
                                <Typography fontWeight="bold">Name:</Typography>
                                <Typography fontWeight="bold">Number:</Typography>
                                <Typography fontWeight="bold">Time:</Typography>
                                <Typography fontWeight="bold">Services</Typography>
                            </Box>
                            <hr />
                        </>
                    }
                    {
                        Boolean(reserved.length)
                            ? reserved.map((reserv: any) =>
                                <>
                                    <Box display="flex" flexDirection="column">
                                        <Typography>{reserv.name}</Typography>
                                        <Typography>{reserv.number}</Typography>
                                        <Typography>{reserv.date.slice(11, 16)}</Typography>
                                        <Typography>{reserv.services}</Typography>
                                    </Box>
                                    <hr />
                                </>
                            )
                            : <Typography>There is no reservations</Typography>

                    }

                    < Button onClick={onButtonClickHandler} variant="contained" sx={{ bgcolor: dayoff ? 'grey' : 'red', ml: 'auto', height: '3rem', alignSelf: 'end' }}>Day OFF</Button>
                </Box>
            </AccordionDetails>
        </Accordion >

    )
}