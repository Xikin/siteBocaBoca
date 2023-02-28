import { Close, Google, Send } from "@mui/icons-material";
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
import { useValue } from "../../context/ContextProvider";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
import PasswordField from "./PasswordField";

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
        e.preventDefault();

    //testing  Loading
    dispatch({type:'START_LOADING'})

    setTimeout(() => {
      dispatch({type:'END_LOADING'})
    }, 6000);


    //Testando a notificação
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "As senhas não são iguais",
        },
      });
    }
  };

  useEffect(() => {
    isRegister ? setTitle("Registrar") : setTitle("Login");
  }, [isRegister]);
  return (
    <Dialog open={openLogin} onclose={handleClose}>
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
        <DialogActions sx={{px:'19px'}}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Entrar
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
