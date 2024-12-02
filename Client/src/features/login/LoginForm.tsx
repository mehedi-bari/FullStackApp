import { Container, CssBaseline, Typography, TextField, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { useState } from 'react';

// interface FormProp {
//     {}
// }
export default function LoginForm() {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value })
    console.log(formValue);
  }
  async function sendResponse(e) {
    e.preventDefault();
    const requestOpts = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formValue)
    }
    try {

      const response = await fetch('http://localhost:5263/v1/api/Account/login', requestOpts);
      const res = await response.json();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log(res.email);
      console.log(res.token);
    } catch (error) {
      console.log(error);
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
        onSubmit={sendResponse}
      >
        <Grid2 container spacing={2} marginBottom={2}>

          <Grid2 size={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formValue.email}
              onChangeCapture={handleInput}
              onPaste={handleInput}
              autoComplete="email"
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              value={formValue.password}
              onChange={handleInput}
              onPaste={handleInput}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid2>
        </Grid2>
        <Button
          onClick={sendResponse}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          LOG IN
        </Button>
      </form>
    </Container>
  )
}

