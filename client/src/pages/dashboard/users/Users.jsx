import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import { getUsers } from '../../../actions/user';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import  UsersActions from './UsersActions';

const Users = ({ setSelectedLink, link }) => {
  const {
    state: { users },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5)//Faz o dimensionamento da grid
  const [rowId, setRowId] = useState(null);//Verifica qual o usuário selecionado na row

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getUsers(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'photoURL',
        headerName: 'Avatar',
        width: 60,
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'Name', width: 170 },
      { field: 'email', headerName: 'Email', width: 200 },
      {
        field: 'role',
        headerName: 'Role',
        width: 100,
        type: 'singleSelect',
        valueOptions: ['basico', 'editor', 'admin'],
        editable: true,
      },
      {
        field: 'active',
        headerName: 'Active',
        width: 100,
        type: 'boolean',
        editable: true,
      },
      {
        field: 'criadoEm',
        headerName: 'Criado Em',
        width: 200,
        renderCell: (params) =>
          moment(params.row.criadoEm).format('YYYY-MM-DD HH:MM:SS'),
      },
      { field: '_id', headerName: 'Id', width: 220 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />//Passando os parametros necessarios para a verificação das ações que os usuários podem tomar.
        ),
      },
    ],
    [rowId]
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
        Usuários Administrados
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}//Verificando se é o primerio item visivel na grid de usuários 

        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
        onCellEditStart={params => setRowId(params.id)}
      />
    </Box>
  );
};

export default Users;