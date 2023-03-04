import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/user";

export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  //resultado da requisição pelo cadastro normal
  const result = await fetchData(
    { url: url + "./register", body: user },
    dispatch
  );

  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Sua conta foi criada com sucesso!!",
      },
    });
  }

  //Enviar a requisição com o fetch

  dispatch({ type: "END_LOADING" });
};





export const login = async (user, dispatch) => {
    dispatch({ type: "START_LOADING" });
  
    //resultado da requisição pelo cadastro normal
    const result = await fetchData(
      { url: url + "./login", body: user },
      dispatch
    );
  
    if (result) {
      dispatch({ type: "UPDATE_USER", payload: result });
      dispatch({ type: "CLOSE_LOGIN" });
      
    }
  
    //Enviar a requisição com o fetch
  
    dispatch({ type: "END_LOADING" });
  };
  