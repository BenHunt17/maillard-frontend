import { Box, Typography, useTheme } from "@mui/material";

interface ErrorProps {
  children: React.ReactNode;
}

export default function Error({ children }: ErrorProps) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h6" color={theme.palette.error.main}>
        {children}
      </Typography>
    </Box>
  );
}
