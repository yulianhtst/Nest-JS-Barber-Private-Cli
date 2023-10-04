import BasicAccordion from "@/components/Accordion/Accordion"
import { API_URL } from "@/constants";
import { Box } from '@mui/material';

export async function getStaticProps() {

  const [datesResponse, date1Response] = await Promise.all([
    fetch(API_URL + "dates"),
    fetch(API_URL + 'dates/1')
  ]);

  const [datesJson, date1Json] = await Promise.all([
    datesResponse.json(),
    date1Response.json()
  ]);

  const generatedDates = datesJson.map((x) => new Date(x).toString());

  return {
    props: { generatedDates, databaseDates: date1Json }
  };
}

export default function Home({ generatedDates, databaseDates }) {
  console.log(generatedDates);
  console.log(databaseDates);


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
      <BasicAccordion tenGeneratedDates={generatedDates} databaseDates={databaseDates} />
    </Box>
  )
}
