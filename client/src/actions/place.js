import fetchData from './utils/fetchData';
import deleteImages from './utils/deleteImages';

const url = process.env.REACT_APP_SERVER_URL + '/place';

export const createPlace = async (places, currentUser, dispatch, setPage) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url, body: places, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'O local foi adicionado com Sucesso!!!',
      },
    });
    dispatch({ type: 'RESET_PLACE' });
    setPage(0);
    dispatch({type:'UPDATE_ESTABLISHMENT',payload:result})
  }

  dispatch({ type: 'END_LOADING' });
};

export const getPlace = async (dispatch) => {
  const result = await fetchData({ url, method: 'GET' }, dispatch)
  if (result) {
    dispatch({ type: 'UPDATE_PLACE', payload: result })
  }
}

export const deletePlace = async (establishment, currentUser, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: `${url}/${establishment._id}`, method: 'DELETE', token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'O Local foi excluido com sucesso',
      },
    });

    dispatch({ type: 'DELETE_ESTABLISHMENT', payload: result._id });
    deleteImages(establishment.images, currentUser.id);
  }

  dispatch({ type: 'END_LOADING' });
};