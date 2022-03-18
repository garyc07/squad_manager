import * as React from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { AddPlayerModal } from './add-player-modal'




export const PlayerTableToolbar = (props) => {

  const [openModel, setOpenModel] = React.useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          All Players
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleOpenModel}
          >
            Add Player
          </Button>
          <AddPlayerModal open={openModel} handleClose={handleCloseModel}/>
        </Box>
      </Box>
    </Box>
  )
}
