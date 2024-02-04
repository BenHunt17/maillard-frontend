import { Box, Button, styled } from "@mui/material";
import ModalTemplate from "../../template/ModalTemplate";
import { useRef, useState } from "react";

import ImagePlaceholder from "../../../assets/imagePlaceholder.png";
import { Delete, Edit } from "@mui/icons-material";
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";

interface UpdateImgModalProps {
  currentImgSrc: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  handleUpload?: (value: File) => void;
  handleRemove?: () => void;
}

export default function UpdateImgModal({
  currentImgSrc,
  isOpen,
  onClose,
  handleUpload,
  handleRemove,
}: UpdateImgModalProps) {
  const isMobile = useResponsiveLayout("mobile");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImageSrc, setPreviewImageSrc] = useState(
    currentImgSrc ?? ImagePlaceholder
  );
  const [newImage, setNewImage] = useState<File | undefined>(undefined);

  const handleSubmit = () => {
    if (newImage === undefined) {
      handleRemove?.();
    } else {
      handleUpload?.(newImage);
    }
    onClose();
  };

  return (
    <ModalTemplate isOpen={isOpen} onClose={onClose} title="Update Image">
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <ImagePreview src={previewImageSrc} />
        <Box flexDirection={isMobile ? "column" : "row"} display="flex" gap={8}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => fileInputRef.current?.click()}
          >
            Change
          </Button>
          <Button
            onClick={() => {
              setPreviewImageSrc(ImagePlaceholder);
              setNewImage(undefined);
            }}
            variant="outlined"
            startIcon={<Delete />}
          >
            Remove
          </Button>
        </Box>

        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ opacity: previewImageSrc !== currentImgSrc ? 1 : 0 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files?.[0]) return;
          setNewImage(e.target.files?.[0]);
          setPreviewImageSrc(URL.createObjectURL(e.target.files?.[0]));
        }}
        style={{ display: "none" }}
      />
    </ModalTemplate>
  );
}

const ImagePreview = styled("img")({
  width: "50%",
  aspectRatio: 1,
  borderRadius: "50%",
});
