import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { green, yellow } from "@mui/material/colors";

interface AccordionProps {
    date: Date
    workingDays: [any]
}

export const AccordionItem: React.FC<AccordionProps> = ({ date, workingDays }) => {
    const currentDate = date.toString().substring(4, 16)
    const reserved = workingDays.filter(x => {
        const reservedDate = new Date(x.date).toString().substring(4, 16)

        return currentDate == reservedDate
    })


    return (
        <Accordion>
            <AccordionSummary
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
                <Box display="flex">
                    <Box>
                        {
                            reserved.length
                                ? reserved.map(reserv => <Typography >{reserv.date.slice(11, 16) + ' ' + reserv.name + ' ' + reserv.services}</Typography>)
                                : <Typography>There is no reservations</Typography>
                        }

                    </Box>
                    <Button variant="contained" color="error" sx={{ ml: 'auto', height: '3rem',alignSelf:'end' }}>Day OFF</Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}