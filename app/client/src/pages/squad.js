import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { SquadPlayerList } from '../components/squad/player-list';
import { DashboardLayout } from '../components/dashboard-layout';
import { squad } from '../__mocks__/squad';
import { getHost } from '../utils/get-host'

const Squad = (data) => (
  <>
    <Head>
      <title>
        Squad
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
          <SquadPlayerList players={squad} data={data}/>
        </Box>
      </Container>
    </Box>
  </>
);

Squad.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export async function getServerSideProps() {
  // Fetch data from external API
  //console.log(getHost())
  const res = await fetch(getHost() + '/squad/players')
  const data = await res.json()

  //console.log(data)

  // Pass data to the page via props
  return { props: { data } }
}

export default Squad;
