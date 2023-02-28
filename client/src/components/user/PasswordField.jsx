import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Input, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

const PasswordField = ({
  passwordRef,
  id = "password",
  label = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <TextField
      margin="normal"
      variant="standard"
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth
      inputRef={passwordRef}
      inputProps={{ minLenght: 6 }}
      required
      InputProps={{
        endAdornament: (
          <InputAdornment position="end">
            {" "}
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
