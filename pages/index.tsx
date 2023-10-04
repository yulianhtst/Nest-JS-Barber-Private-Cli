import BasicAccordion from "@/components/Accordion/Accordion"
import { API_URL } from "@/constants";
import { Box } from '@mui/material';

export async function getServerSideProps() {

  const datesResponse = await fetch(API_URL + "dates")

  const datesJson = await datesResponse.json()

  const generatedDates = datesJson.map((x) => new Date(x).toString());

  return {
    props: { generatedDates }
  };
}

export default function Home({ generatedDates }) {


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
      <BasicAccordion tenGeneratedDates={generatedDates} />
    </Box>
  )
}
