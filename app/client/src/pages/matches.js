import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { MatchListTable } from '../components/match/matches-table';
import { DashboardLayout } from '../components/dashboard-layout';
import { matches } from '../__mocks__/matches';

const Matches = (data) => (
  <>
    <Head>
      <title>
        Customers | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ mt: 3 }}>
          <MatchListTable matches={matches} data={data}/>
        </Box>
      </Container>
    </Box>
  </>
);

Matches.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

//export async function getServerSideProps() {
  // Fetch data from external API
  //const res = await fetch(`http://localhost:3001/match`)
  //const data = await res.json()

  //console.log(data)

  // Pass data to the page via props
  //return { props: { data } }
//}

export default Matches;
