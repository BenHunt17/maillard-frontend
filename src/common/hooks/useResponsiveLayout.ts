import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export function useResponsiveLayout(deviceType: DeviceType) {
  const theme = useTheme();

  const breakpoints = getBreakPoint(deviceType);
  const matches = useMediaQuery(
    theme.breakpoints.between(breakpoints[0], breakpoints[1])
  );

  return matches;
}

type DeviceType = "tablet" | "mobile";

function getBreakPoint(deviceType: DeviceType): [Breakpoint, Breakpoint] {
  switch (deviceType) {
    case "tablet":
      return ["md", "lg"];
    case "mobile":
      return ["xs", "sm"];
  }
}
