
import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import { getPlace } from '../../../actions/place';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import PlaceActions from './PlaceActions'
import isAdmin from '../utils/isAdmin';


const Places = ({setSelectedLink, link}) =>{
    
  const {
    state: { place , currentUser},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (place.length === 0) getPlace(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'images',
        headerName: 'Photo',
        width: 70,
        renderCell: (params) => (
          <Avatar src={params.row.images[0]} variant="rounded" />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: 'price',
        headerName: 'Cost',
        width: 70,
        renderCell: (params) => 'R$' + params.row.price,
      },
      { field: 'title', headerName: 'Title', width: 170 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'lng', headerName: 'Longitude', width: 110 },
      { field: 'lat', headerName: 'Latitude', width: 110 },

      {
        field: 'uName',
        headerName: 'Adicionado por',
        width: 80,
        renderCell: (params) => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto} />
          </Tooltip>
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Criado Em',
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
      },
      { field: '_id', hide: true },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 150,
        renderCell: (params) => <PlaceActions {...{ params }} />,
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Gerenciar Locais
      </Typography>
      <DataGrid
        columns={columns}
        //Verifica se o usuario é Admin e mostra todos locais caso ele seja.
        //Caso o usuario nao seja admin faz um filtro mostrando somente os locais adicionados por este usuario.
        rows={isAdmin(currentUser)? place: place.filter(place=>place.uid === currentUser.id)}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Places;



