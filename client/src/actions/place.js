import fetchData from './utils/fetchData';
import deleteImages from './utils/deleteImages';

const url = process.env.REACT_APP_SERVER_URL + '/place';

export const createPlace = async (places, currentUser, dispatch) => {
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
    clearPlace(dispatch, currentUser);
    dispatch({ type: 'UPDATE_SECTION', payload: 0 });
    dispatch({ type: 'UPDATE_ESTABLISHMENT', payload: result });
  };

  dispatch({ type: 'END_LOADING' });
};

export const getPlace = async (dispatch) => {
  const result = await fetchData({ url, method: 'GET' }, dispatch)
  if (result) {
    dispatch({ type: 'UPDATE_PLACE', payload: result })
  }
};

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
    deleteImages(establishment.images, establishment.uid);
  }

  dispatch({ type: 'END_LOADING' });
};

export const updatePlace = async (place, currentUser, dispatch, updatedPlace, deletedImages) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: `${url}/${updatedPlace._id}`, method: 'PATCH', body: place, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'O Local foi atualizado com sucesso',
      },
    });

    clearPlace(dispatch, currentUser, deletedImages, updatedPlace);
    dispatch({ type: 'UPDATE_SECTION', payload: 0 });
    dispatch({ type: 'UPDATE_ESTABLISHMENT', payload: result })
  }

  dispatch({ type: 'END_LOADING' });
};

export const clearPlace = (dispatch, currentUser, images = [], updatedPlace = null) => {
  dispatch({ type: 'RESET_PLACE' })

    localStorage.removeItem(currentUser.id);
  //Remove the information of the deleted images from the local storage
  if (updatedPlace) {
    deleteImages(images, updatedPlace.uid)
  } else {
    deleteImages(images, currentUser.id)
  }
};

export const storePlace = (
  location,
  details,
  images,
  updatedPlace,
  deletedImages,
  addedImages,
  userId,
) => {
  if (
    location.lng ||
    location.lat ||
    details.price ||
    details.title ||
    details.description ||
    images.lenght ||
    details.ratings ||
    details.money
    ) {
    localStorage.setItem(
      userId, 
      JSON.stringify({ 
        location, 
        details, 
        images, 
        updatedPlace, 
        deletedImages, 
        addedImages, 
        userId 
      })
    );
    return true;
  } else {
    return false;
  }
}