import styled from "@emotion/styled";
import { useMediaQuery, useTheme } from "@mui/material";

export const MainGutter = styled.div(() => {
  const theme = useTheme();
  const mediaQueryMd = useMediaQuery(theme.breakpoints.down("md"));

  return {
    paddingLeft: mediaQueryMd ? 24 : 16,
    paddingRight: mediaQueryMd ? 24 : 16,
  };
});
