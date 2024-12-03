import { Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";

export default function Member() {

    const token = localStorage.getItem('authToken');
    let decoded;
    if (token) {
      decoded = jwtDecode(token);
    } else 
        window.location.href = '/login';
    if (decoded != null && decoded["exp"]) {
        const isExpired=  Date.now() < decoded["exp"];
        if (isExpired) window.location.href = '/login';
    }
    return (
        <Typography variant="h2">
          Member  Only
        </Typography>
    )
}