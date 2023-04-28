import fetchData from './utils/fetchData';


//Componente responsável pela chamada e repassamento dos dados  nas ações especificadas no reducer.
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
  }

  dispatch({ type: 'END_LOADING' });
};

export const getPlace = async (dispatch) => {
  const result = await fetchData({ url, method: 'GET' }, dispatch)
  if (result) {
    dispatch({ type: 'UPDATE_PLACE', payload: result })
  }
}