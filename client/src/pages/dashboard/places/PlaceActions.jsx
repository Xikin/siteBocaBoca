import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { useValue } from '../../../context/ContextProvider';
import { clearPlace, deletePlace } from '../../../actions/place';
import { useNavigate } from 'react-router-dom'

const PlaceActions = ({ params }) => {
  const { _id, lng, lat, price, title, description, images, uid } = params.row
  const {
    dispatch,
    state: { currentUser, updatedPlace, addedImages, images:newImages },
  } = useValue();

  const navigate = useNavigate()
  const handleEdit = () => {
    if (updatedPlace) {
      clearPlace(dispatch, currentUser, addedImages, updatedPlace);
    } else {
      clearPlace(dispatch, currentUser, newImages);
    }

    dispatch({ type: 'UPDATE_LOCATION', payload: { lng, lat } })
    dispatch({ type: 'UPDATE_DETAILS', payload: { price, title, description } })
    dispatch({ type: 'UPDATE_IMAGES', payload: images })
    dispatch({ type: 'UPDATE_UPDATED_PLACE', payload: { _id, uid } })
    dispatch({ type: 'UPDATE_SECTION', payload: 2 })
    navigate('/')
  }
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
        <IconButton onClick={handleEdit}>
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