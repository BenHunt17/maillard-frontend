import { Box, Button, Typography, useTheme } from "@mui/material";

interface LoginViewProps {
  handleLogin: () => void;
  handleGuestUser: () => void;
  loginError: boolean;
}

export default function LoginView({
  handleLogin,
  handleGuestUser,
  loginError,
}: LoginViewProps) {
  const theme = useTheme();

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
      {loginError && (
        <Typography variant="body1" color={theme.palette.error.main}>
          Login unsuccessful
        </Typography>
      )}
    </Box>
  );
}
