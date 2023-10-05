import { Box, Button, Typography } from "@mui/material";

interface LoginViewProps {
  handleLogin: () => void;
  handleGuestUser: () => void;
}

export default function LoginView({
  handleLogin,
  handleGuestUser,
}: LoginViewProps) {
  return (
    <Box
      display="flex"
      gap={16}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h6" textAlign="center">
        Welcome to the Maillard Recipe Manager
      </Typography>
      <Box display="flex" gap={4} flexDirection="column">
        <Button variant="contained" onClick={handleLogin}>
          Sign in as admin
        </Button>
        <Button onClick={handleGuestUser}>Continue as guest</Button>
      </Box>
    </Box>
  );
}
