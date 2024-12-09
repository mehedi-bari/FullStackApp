import { Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid2, LinearProgress, Link, TextField, Typography } from "@mui/material";
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import * as yup from "yup";
import { Form, Formik } from 'formik';
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface RegistrationForm{
        FirstName: string,
        LastName: string,
        Email: string,
        Password: string,
}

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const navigate = useNavigate();

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }
   
    const schema = yup.object().shape({
        FirstName: yup.string()
            .required("First Name is required"),
        LastName: yup.string()
            .required("Last Name is required"),
        Email: yup.string()
            .email()
            .required("Email is required"),
        Password: yup.string()
            .required()
            .min(8, "Password is too short")
            .max(32, "Password is too long")
            .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
    });

    async function success() {
        toast.success("Registration is successful!");
        toast.success("Redirecting to login");
    }
    async function failed() {
        toast.error("Registration Failed!");
    }
    async function warning(warning: { message: string}) {
        toast.warning(warning.message);
    }

    async function sendResponse(values: RegistrationForm){
        console.log(values);
        setLoading(true);
        const requestOpts = {
            method: 'post',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
        body: JSON.stringify(values)
        }
        try {
            const response = await fetch('http://localhost:5263/v1/api/Account/register', requestOpts);
            if (!response.ok) {
                const errorData = await response.json();
                failed();
                warning(errorData);
                setErrorEmail(true);
                throw new Error(`Response status: ${response.status}`);
            } 
            await success();
            await timeout(3000);
            navigate("/login");
        } catch (err) {
            console.log(err);
            await timeout(2000);
            setLoading(false);
        }
    }

    return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box display="flex" justifyContent="center" sx={{margin: 1.5 ,paddingRight: 1}}>
        <Avatar sizes="xl" sx={{marginRight: 1.2}}>
            <AppRegistrationSharpIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{marginTop: 0.8}}>
            Sign-Up
        </Typography>
    </Box>
    {/* <Box sx={{marginBottom:2, marginLeft: 1.5}}>
    </Box> */}
    <Formik
        validateOnChange={true}
        initialValues={{
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
      }}

        onSubmit={sendResponse}
        validationSchema={schema}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        }) => (
    <Form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
            <Grid2 size={12} >
            <TextField
                autoComplete="fname"
                name="FirstName"
                variant="outlined"
                fullWidth
                id="FirstName"
                label="First Name"
                required
                autoFocus
                value={values.FirstName}
                onChange={handleChange}
                onBlur={handleBlur}
                // error={touched.FirstName && Boolean(errors.FirstName)} 
                // helperText={touched.FirstName && errors.FirstName} 
              />
            </Grid2>
            <Grid2 size={12} >
            <TextField
                    required
                    variant="outlined"
                    fullWidth
                    id="LastName"
                    label="Last Name"
                    name="LastName"
                    autoComplete="lname"
                    value={values.LastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // error={touched.LastName && Boolean(errors.LastName)} 
                    // helperText={touched.LastName && errors.LastName} 
                />
            </Grid2>
            <Grid2 size={12}>
                <TextField 
                    variant="outlined"
                    required
                    fullWidth
                    id="Email"
                    label="Email Address"
                    name="Email"
                    type="email"
                    autoComplete=""
                    value={values.Email}
                    onChange={(e) => {
                        handleChange(e);
                        setErrorEmail(false);
                    }}
                    onBlur={handleBlur}
                    error={(touched.Email && Boolean(errors.Email))|| errorEmail} 
                    helperText={touched.Email && errors.Email} 
                />
            </Grid2>
            <Grid2 size={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Password"
                    label="Password"
                    type="password"
                    id="Password"
                    autoComplete="current-password"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Password && Boolean(errors.Password)} 
                    helperText={touched.Password && errors.Password} 
                    
                />
            </Grid2>
            <Grid2 size={12} sx={{mb: 1}}>
                <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I have read and accept the terms and conditions and happy to proceed"
                />
            </Grid2>
        </Grid2>
        <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            disabled={isSubmitting}
            style={{display: loading ?'none' : undefined}}
        >
          Sign Up
        </LoadingButton>
        <LinearProgress
            style={{ display: !loading ? 'none' : undefined }}
            sx={{ margin: 1 }}
        />
            <Grid2 >
                <Grid2 >
                    <Link href="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid2>
            </Grid2>
        </Form>
        )}
            </Formik>
    <ToastContainer />
    </Container>
  );
}
