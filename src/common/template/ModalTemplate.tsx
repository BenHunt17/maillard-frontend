import { Box, Modal, Typography, styled } from "@mui/material";

interface ModalTemplateProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  title: string;
}

export default function ModalTemplate({
  children,
  isOpen,
  handleClose,
  title,
}: ModalTemplateProps) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModelBox display="flex" flexDirection="column" gap={16}>
        <Typography variant="h2">{title}</Typography>
        {children}
      </ModelBox>
    </Modal>
  );
}

const ModelBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: 16,
}));
