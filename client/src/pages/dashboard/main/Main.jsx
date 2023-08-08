import { Group, MapsHomeWork } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { getPlace } from '../../../actions/place';
import { getUsers } from '../../../actions/user';
import { useValue } from '../../../context/ContextProvider';
import moment from 'moment';
import PiePlacesCost from './PiePlacesCost';
import AreaPlaceUsers from './AreaPlacesUsers';
const Main = ({ setSelectedLink, link }) => {
  const {
    state: { place, users },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    if (place.length === 0) getPlace(dispatch);
    if (users.length === 0) getUsers(dispatch);
  }, []);
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Usuários Totais</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Estabelecimentos adicionados</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{place.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
        <Box>
          <Typography>Usuários Adicionados Recentemente</Typography>
          <List>
            {users.slice(0, 5).map((user, i) => (
              <Box key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={`Time Created: ${moment(user?.createdAt).format(
                      'YYYY-MM-DD H:mm:ss'
                    )}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Locais adicionados Recentemente</Typography>
          <List>
            {place.slice(0, 4).map((place, i) => (
              <Box key={place._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={place?.title}
                      src={place?.images[0]}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={place?.title}
                    secondary={`Added: ${moment(place?.createdAt).fromNow()}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p:2, gridColumn:'1/3' }}>
        <PiePlacesCost/>
      </Paper>
      <Paper elevation={3} sx={{p:2, gridColumn:'1/3' }}>
        <AreaPlaceUsers/>
      </Paper>
    </Box>
  );
};

export default Main;