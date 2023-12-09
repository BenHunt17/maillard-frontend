import { useTheme } from "@mui/material";

import ImagePlaceholder from "../../assets/imagePlaceholder.png";

interface ImgProps extends React.HTMLProps<HTMLImageElement> {}

export default function Img(props: ImgProps) {
  const theme = useTheme();

  return (
    <img
      {...props}
      src={props.src ?? ImagePlaceholder}
      alt={props.alt ?? ""}
      width="100%"
      style={{ boxShadow: theme.shadows[5] }}
    />
  );
}
