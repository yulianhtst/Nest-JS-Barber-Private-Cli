import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { postDayOff } from "@/services/postDayOff";
import { deleteDate } from "@/services/deleteDate";
import { bookedDates } from "@/services/getBookedDates";
import { API_URL } from "@/constants";
import useSWR from "swr";


const fetcher = async () => {
    const response = await fetch(API_URL + 'dates/1')
    const data = await response.json()
    return data
}

export const AccordionItem = ({ date, bookedDays }) => {
    const { data: databaseDates, error, isValidating, mutate } = useSWR('dates', fetcher)


    console.log(date);

    const [reserved, setReserved] = useState<any>([])
    const [dayoff, setDayoff] = useState<boolean>(false)
    const [dayId, setDayId] = useState<string | null>(null)

    useEffect(() => {
        setReserved(
            bookedDays.filter((day: { date: string }) => {

                return date === day.date
            }))
    }, [bookedDays, date])

    const onAccordionOpenClickHandler = async () => {
        const allBookedDates = await bookedDates()

        const reservedDates = allBookedDates.filter((bookedDate: { date: string }) => {
            const reservedDate = new Date(bookedDate.date).toString().substring(4, 16)

            return date === reservedDate
        })

        setReserved(reservedDates)
    }

    useEffect(() => {
        const foundDate = databaseDates?.find((day: { date: string }) => {
            const dbDate = day.date.slice(0, 10)
            const accordionItemDate = new Date(date).toISOString().slice(0, 10)
            return dbDate === accordionItemDate
        })
        if (foundDate) {
            setDayId(foundDate._id)
            setDayoff(true)
        } else {
            setDayoff(false)
            return;
        }
    }, [databaseDates])

    const onButtonClickHandler = async () => {

        const sentDate = { date: new Date(date) }
        const restDay = await postDayOff(sentDate)

        if (restDay._id) {
            setDayId(restDay._id)
        }

        if (!restDay._id) {
            deleteDate(dayId)
        }

        mutate()
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
                <Typography >{date}</Typography>
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

                    < Button onClick={onButtonClickHandler} variant="contained" sx={{ bgcolor: dayoff ? 'grey' : 'red', ml: 'auto', height: '3rem', alignSelf: 'end', "&:hover": { bgcolor: dayoff ? 'red' : 'grey' } }}>Day OFF</Button>
                </Box>
            </AccordionDetails>
        </Accordion >

    )
}