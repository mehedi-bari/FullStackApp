import { Container, CssBaseline, Typography, TextField } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { FieldValues, useForm} from "react-hook-form";
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
        } = useForm({
            mode: "onTouched",
        });
    
    async function errorState() {
        toast.warning("Invalid Email/Password");
    }
    const navigate = useNavigate();
    async function sendResponse(data : FieldValues) {
        const requestOpts = {
            method: 'post',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
        body: JSON.stringify(data)
        }
        try {
            const response = await fetch('http://localhost:5263/v1/api/Account/login', requestOpts);
            const res = await response.json();
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            localStorage.setItem('authToken', res.token);
            navigate("/member");
        } catch (err) {
            console.warn(err);
            await errorState();
        }
    
    }
    return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5" marginBlock={1} align='center' >
            Log in
        </Typography>
        <form
            noValidate
            onSubmit={handleSubmit(sendResponse)}
        >
        <Grid2 container spacing={2} marginBottom={2}>

          <Grid2 size={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
              helperText={errors.email?.message?.toString()}
              error={!!errors.email}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Minimum Length is 8"
                                        },
                                        maxLength : {
                                            value: 32,
                                            message: "Maximum Length is 32"
                                        },
               })}
              helperText={errors.password?.message?.toString()}
              error={!!errors.password}
            />
          </Grid2>
        </Grid2>
        <LoadingButton
          type="submit"
          fullWidth
          loading={isSubmitting}
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          disabled={!isValid}
        >
          LOG IN
        </LoadingButton>
        <ToastContainer />
        </form>
    </Container>
  )
}

