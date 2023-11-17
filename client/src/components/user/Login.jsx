import { Close, Send } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { login, register } from "../../actions/user";
import { useValue } from "../../context/ContextProvider";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
import PasswordField from "./PasswordField";



const Login = () => {
  const {state: { openLogin }, dispatch,} = useValue();
  const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  
  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN'});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //enviar a requisição se não estiver registrado e retornar
    if(!isRegister) return  login({email, password},dispatch)//Se estiver logado retorna a chamada da função login
    
    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword)
      return dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "As senhas não são iguais",
        },
      });

      


      register({name, email, password}, dispatch)


    //Registrar requisições envios
  };

  useEffect(() => {
    isRegister ? setTitle("Registrar") : setTitle("Login");
  }, [isRegister]);
  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Por Favor Preencha os campos abaixo!
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLenght: 2 }}
              required
            />
          )}

          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />

          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: "19px",  justifyContent:'start'}}>
          <Button type="submit"  variant="contained" endIcon={<Send />}>
          {!isRegister ? "Login" : "Registrar"} 
          </Button>
        </DialogActions>

       
      </form>
      <DialogActions sx={{ justifyContent: "Left", p: "5px 24px" }}>
        {isRegister
          ? "Você têm uma conta? Entrar"
          : "Não tem uma conta? Criar uma agora"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Registrar"}
        </Button>
      </DialogActions>

      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>

    
  );
};

export default Login;
