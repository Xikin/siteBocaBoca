//Componente de salvar o as ações que podem ser tomadas pelos usuarios 
 //A cada edição o botão fica ativo o estado padrão é disabled
 //O estado é mudado no server na parte do user 
 import { Box, CircularProgress, Fab } from '@mui/material';
 import { useEffect, useState } from 'react';
 import { Check, Save } from '@mui/icons-material';
 import { green } from '@mui/material/colors';
 import { updateStatus } from '../../../actions/user';
 import { useValue } from '../../../context/ContextProvider';

 const UsersActions = ({ params, rowId, setRowId }) => {
  const { dispatch } = useValue();

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async () => {
    setLoading(true); //Ao clicar no botão para salvar as regras inicia o loading 
 
    const { role, active, _id } = params.row;//parametros que será enviado para o servidor 
    const result = await updateStatus({ role, active }, _id, dispatch);
    // Se tiver um objeto no resultado o resultado será setado como true
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);//A função setSuccess muda o botão de salvar na Row dos usuários administrados no Dashboard.
  }, [rowId]);//Da um reset no botão de salvar ao modificar a row do usuário novamente.

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UsersActions;
