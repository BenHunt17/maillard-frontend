import styled from "@emotion/styled";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";

export const MainGutter = styled.div(() => {
  const isMobile = useResponsiveLayout("mobile");

  return {
    paddingLeft: isMobile ? 24 : 16,
    paddingRight: isMobile ? 24 : 16,
  };
});
