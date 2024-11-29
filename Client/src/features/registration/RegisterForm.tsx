import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid2, Link, TextField, Typography } from "@mui/material";
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
export default function RegisterForm() {
   
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
       <Box display="flex" justifyContent="center">
            <Avatar sizes="xl">
                <AppRegistrationSharpIcon />
            </Avatar>
        </Box>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
                <form
                    noValidate>
          <Grid2 container spacing={2}>
            <Grid2 size={12} >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid2>
            <Grid2 size={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid2>
            <Grid2 size={12} sx={{mb: 1}}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid2>
          </Grid2>
          <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    
        
          >
            Sign Up
          </Button>
          <Grid2 >
            <Grid2 >
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid2>
          </Grid2>
        </form>

    </Container>
  );
}