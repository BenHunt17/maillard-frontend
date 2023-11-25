import { Box } from "@mui/material";
import Loading from "../../common/components/Loading";

export default function AppLoaderView() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      height="100vh"
      alignItems="center"
    >
      <Loading />
    </Box>
  );
}
