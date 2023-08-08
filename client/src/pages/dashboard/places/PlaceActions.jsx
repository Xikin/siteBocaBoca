import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { useValue } from '../../../context/ContextProvider';
import { deletePlace } from '../../../actions/place';

const PlaceActions = ({ params }) => {
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  return (
    <Box>
      <Tooltip title="Ver detalhes dos Locais">
        <IconButton
          onClick={() => dispatch({ type: 'UPDATE_ESTABLISHMENT', payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar este Local">
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Excluir esse local">
        <IconButton
          onClick={() => deletePlace(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PlaceActions;