import { Box, Card, CardMedia, Typography, styled } from "@mui/material";
import ImagePlaceholder from "../../../assets/imagePlaceholder.png";
import { format } from "date-fns";

interface RecipeCardProps {
  recipeName: string;
  createdAt: Date | undefined;
  imageUrl: string | undefined;
}

export default function RecipeCard({
  recipeName,
  createdAt,
  imageUrl,
}: RecipeCardProps) {
  return (
    <Card elevation={5}>
      <CardMedia
        component="img"
        height={198}
        image={imageUrl ?? ImagePlaceholder}
        alt={recipeName}
        sx={{ objectFit: "cover" }}
      />
      <Label>
        <Typography variant="body1">{recipeName}</Typography>
        <Typography variant="body2">
          {createdAt
            ? format(createdAt, "dd/MM/yyyy")
            : "unknown creation date"}
        </Typography>
      </Label>
    </Card>
  );
}

const Label = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 8,
  backgroundColor: theme.palette.grey[100],
  borderBottomRightRadius: 8,
}));
