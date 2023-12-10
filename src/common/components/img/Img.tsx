import { styled, useTheme } from "@mui/material";

import ImagePlaceholder from "../../../assets/imagePlaceholder.png";

import { useState } from "react";
import UpdateImgModal from "./UpdateImgModal";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onUpload?: (value: File) => void;
  onRemove?: () => void;
}

export default function Img(props: ImgProps) {
  const [showModal, setShowModal] = useState(false);

  const canUpdate = Boolean(props.onUpload) && Boolean(props.onRemove);

  return (
    <>
      <Image
        {...props}
        canUpdate={canUpdate}
        src={props.src ?? ImagePlaceholder}
        alt={props.alt ?? ""}
        width="100%"
        onClick={canUpdate ? () => setShowModal(true) : undefined}
      />
      <UpdateImgModal
        currentImgSrc={props.src}
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        handleUpload={props.onUpload}
        handleRemove={props.onRemove}
      />
    </>
  );
}

const Image = styled("img")(({ canUpdate }: { canUpdate: boolean }) => {
  const theme = useTheme();

  return {
    boxShadow: theme.shadows[5],
    cursor: canUpdate ? "pointer" : "none",
    "&:hover": {
      filter: canUpdate ? "brightness(90%)" : "none",
    },
  };
});
