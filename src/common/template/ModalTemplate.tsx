import { Box, Modal, Typography, styled } from "@mui/material";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";

interface ModalTemplateProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function ModalTemplate({
  children,
  isOpen,
  onClose,
  title,
}: ModalTemplateProps) {
  const isMobile = useResponsiveLayout("mobile");
  const isTablet = useResponsiveLayout("tablet");

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModelBox display="flex" flexDirection="column" gap={16}>
        <Typography variant={isTablet ? "h4" : isMobile ? "h6" : "h2"}>
          {title}
        </Typography>
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
  maxHeight: "80vh",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: 16,
  overflowY: "auto",
}));
