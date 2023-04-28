import { Lock } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Container } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';

const AccessMessage = () => {
  const { dispatch } = useValue();
  return (
    <Container sx={{ py: 5 }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Acesso Proibido!</AlertTitle>
        Por favor faça o Login ou se Registre para ter acesso a esta pagina.
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          startIcon={<Lock />}
          onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
        >
          Entrar
        </Button>
      </Alert>
    </Container>
  );
};

export default AccessMessage;