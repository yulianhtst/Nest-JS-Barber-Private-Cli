import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionProps {
    date: Date
}

export const AccordionItem: React.FC<AccordionProps> = ({ date }) => {
    const currentDate=date.toString().substring(4,16)

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{currentDate}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box display="flex">
                    <Box>
                        <Typography >Запазен час:</Typography>
                        <Typography >Запазен час:</Typography>
                        <Typography >Запазен час:</Typography>
                        <Typography >Запазен час:</Typography>
                        <Typography >Запазен час:</Typography>
                        <Typography >Запазен час:</Typography>
                    </Box>
                    <Button variant="contained" color="error" sx={{ ml: 'auto' }}>Day OFF</Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}