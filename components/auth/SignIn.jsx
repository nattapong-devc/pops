import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Image from "next/image";
import { LOGO } from "@/assets";
import { useUserContext } from "@/contexts/UserContext";
import httpRequest from "@/utils/httpRequest";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";


export default function SignIn() {
  const { signin } = useUserContext();

  const initUser = {
    username: "",
    password: "",
  };

  const initUserError = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initUser);
  const [userError, setUserError] = useState(initUserError);

  const [passwordShow, setPasswordShow] = useState(false);

  const [open, setOpen] = useState(false);


  const handlePasswordShow = () => {
    setPasswordShow(!passwordShow);
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    let isError = false;
    const errors = {
      username: "",
      password: "",
    };

    if (user.username.length < 1) {
      isError = true;
      errors.username = "Username is required";
    }

    if (user.password.length < 1) {
      isError = true;
      errors.password = "Password is required";
    }

    setUserError(errors);
    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      if (user.username == "test_user" && user.password == "test_password") {
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK",
        });
        signin("ztLTYk03Vho3dXrDoW2XZFIUIKzXwYP5");


       
        
        setOpen(false);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid username or password.",
          icon: "error",
          confirmButtonText: "OK",
        });
        
      }
    }
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          color: "white",
          backgroundColor: "#FF7A00",
          borderRadius: "8px",
          padding: "2px 20px",
          fontSize: "16px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#FF7A00",
          },
        }}
        startIcon={<LoginRoundedIcon />}
        onClick={handleClickOpen}
      >
        Sign In
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
          },
        }}
      >
        <DialogContent>
          <Box
            className="flex flex-col items-center justify-center gap-5 py-10"
            component={"form"}
            onSubmit={handleSubmit}
          >
            <Image
              src={LOGO.src}
              alt="logo"
              width={150}
              height={150}
              draggable={false}
            />
            <Typography
              variant="h5"
              sx={{ fontSize: "1.1rem", fontWeight: "bold", color: "#7e7e7e" }}
            >
              Sign In to POPS
            </Typography>

            <Box className="flex flex-col gap-3 w-full">
              <TextField
                size="small"
                label="Username"
                variant="outlined"
                name="username"
                value={user.username}
                onChange={handleChange}
                fullWidth
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                error={userError.username.length > 0}
                helperText={userError.username}
              />

              <TextField
                size="small"
                label="Password"
                variant="outlined"
                name="password"
                type={passwordShow ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
                fullWidth
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handlePasswordShow}
                                edge="end"
                            >
                                {passwordShow ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        ),
                    },
                  }}
                error={userError.password.length > 0}
                helperText={userError.password}
              />
            </Box>
            <Button
              fullWidth
              size="small"
              sx={{
                backgroundColor: "#FF7A00",
                color: "white",
                borderRadius: "8px",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "#FF7A00",
                },
              }}
              type="submit"
            >
              Sign In
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
