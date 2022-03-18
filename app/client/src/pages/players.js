import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AllPlayerList } from '../components/player/all-player-list';
import { PlayerTableToolbar } from '../components/player/player-table-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { players } from '../__mocks__/players';

const Players = (data) => (
  <>
    <Head>
      <title>
        All Club Players
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
        <PlayerTableToolbar title={'Players'} buttonTitle={'Add Player'}/>
        <Box sx={{ mt: 3 }}>
          <AllPlayerList players={players} data={data}/>
        </Box>
      </Container>
    </Box>
  </>
);

Players.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3001/player`)
  const data = await res.json()

  console.log(data)

  // Pass data to the page via props
  return { props: { data } }
}

export default Players;
