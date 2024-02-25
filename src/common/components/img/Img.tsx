import { Skeleton, styled, useTheme } from "@mui/material";

import ImagePlaceholder from "../../../assets/imagePlaceholder.png";

import { useState } from "react";
import UpdateImgModal from "./UpdateImgModal";
import { useAuth } from "../../../core/auth/AuthProvider";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onUpload?: (value: File) => void;
  onRemove?: () => void;
  isLoading?: boolean;
}

export default function Img(props: ImgProps) {
  const [showModal, setShowModal] = useState(false);
  const { bearerToken } = useAuth();

  const canUpdate =
    bearerToken !== undefined &&
    Boolean(props.onUpload) &&
    Boolean(props.onRemove);

  if (props.isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ aspectRatio: 2 }}
      />
    );
  }
  return (
    <>
      <Image
        {...props}
        canUpdate={canUpdate}
        src={
          props.src !== undefined
            ? `${props.src}?${new Date()}`
            : ImagePlaceholder
        }
        alt={props.alt ?? ""}
        width="100%"
        onClick={canUpdate ? () => setShowModal(true) : undefined}
      />
      <UpdateImgModal
        currentImgSrc={props.src}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        handleUpload={props.onUpload}
        handleRemove={props.onRemove}
      />
    </>
  );
}

const Image = styled("img", {
  shouldForwardProp: (prop) =>
    prop !== "onUpload" &&
    prop !== "onRemove" &&
    prop !== "isLoading" &&
    prop !== "canUpdate",
})(({ canUpdate }: { canUpdate: boolean }) => {
  const theme = useTheme();

  return {
    boxShadow: theme.shadows[5],
    cursor: canUpdate ? "pointer" : "none",
    "&:hover": {
      filter: canUpdate ? "brightness(90%)" : "none",
    },
  };
});
