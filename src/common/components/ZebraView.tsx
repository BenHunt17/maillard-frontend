import { Box, Typography, styled, useTheme } from "@mui/material";

interface ZebraViewProps {
  content: { name: string; value: string }[];
}

export default function ZebraView({ content }: ZebraViewProps) {
  const theme = useTheme();

  return (
    <Container>
      {content.map((item, index) => (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={4}
          sx={{
            backgroundColor:
              index % 2 === 0 ? theme.palette.grey[400] : "white",
          }}
        >
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {item.value}
          </Typography>
        </Box>
      ))}
    </Container>
  );
}

const Container = styled("div")(() => {
  const theme = useTheme();

  return {
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 8,
    boxShadow: theme.shadows[5],
  };
});
