import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLoginMutation } from "../../redux/services/auth.service";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import CopyAllSharpIcon from "@mui/icons-material/CopyAllSharp";
import { Copyright } from "../../App";
import { enqueueSnackbar } from "notistack";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// const Input = styled(Input)(({ theme }) => ({
//   padding: 0,
//   "&.MuiInput-underline:before": {
//     borderBottom: "none",
//   },
//   "&.MuiInput-underline:after": {
//     borderBottom: "none",
//   },
// }));

export default function SignIn() {
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  //copy to clipboard
  const [copySuccess, setCopySuccess] = React.useState("");
  const adminEmailInputRef = React.useRef(null);
  const hodInputEmailRef = React.useRef(null);
  const employeeEmailInput = React.useRef(null);
  const passwordRef = React.useRef(null);

  const copyToClipboard = (element) => {
    navigator.clipboard.writeText(element.value);
    enqueueSnackbar("Copied to clipboard", {
      variant: "info",
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            defaultValue="admin@lm.com"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            defaultValue="admin12345"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            loading={isLoading}
            loadingPosition="end"
            endIcon={<LoginIcon />}
            variant="contained"
            disableRipple
            color="info"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Sign In
          </LoadingButton>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Typography variant="h6" color="text.mute" mt={2}>
        Authenticaion
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ mt: 1, mb: 5 }}
          border="1px solid #ddd"
          p={1}
        >
          {/* copy to clipboard */}
          <Grid item xs={6}>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Admin email
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type="text"
                size="small"
                defaultValue="admin@lm.com"
                inputRef={adminEmailInputRef}
                disabled
                disableUnderline={true}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title="Copy Email">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          copyToClipboard(adminEmailInputRef.current)
                        }
                      >
                        <CopyAllSharpIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Hod email
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type="text"
                size="small"
                defaultValue="hod@lm.com"
                inputRef={hodInputEmailRef}
                disabled
                disableUnderline={true}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title="Copy Email">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          copyToClipboard(hodInputEmailRef.current)
                        }
                      >
                        <CopyAllSharpIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="standard-adornment-password">
              Employee email
            </InputLabel>
            <FormControl variant="standard">
              <Input
                id="standard-adornment-password"
                type="text"
                size="small"
                defaultValue="employee@lm.com"
                inputRef={employeeEmailInput}
                disabled
                disableUnderline={true}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title="Copy Email">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          copyToClipboard(employeeEmailInput.current)
                        }
                      >
                        <CopyAllSharpIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Master password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type="text"
                size="small"
                defaultValue="admin12345"
                disabled
                disableUnderline={true}
                inputRef={passwordRef}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title="copy password">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => copyToClipboard(passwordRef.current)}
                      >
                        <CopyAllSharpIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Copyright />
    </Container>
  );
}
