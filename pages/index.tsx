import BasicAccordion from "@/components/Accordion/Accordion"
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{
      width: {
        sm: '320px',
        md: '600px',
        lg: '900px',
        xl: '1420px'
      },
      m: '0 auto',
    }}>
      <BasicAccordion />
    </Box>
  )
}
