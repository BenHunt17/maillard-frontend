import { Box, Card, CardMedia, Typography, styled } from "@mui/material";
import ImagePlaceholder from "../../../assets/imagePlaceholder.png";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipeId: string | undefined;
  recipeName: string | undefined;
  createdAt: Date | undefined;
  imageUrl: string | undefined;
}

export default function RecipeCard({
  recipeId,
  recipeName,
  createdAt,
  imageUrl,
}: RecipeCardProps) {
  return (
    <Link
      className="nav-item"
      to={recipeId ? `/recipes/${recipeId}` : "/recipes"}
    >
      <Card elevation={5}>
        <CardMedia
          component="img"
          height={198}
          image={imageUrl ?? ImagePlaceholder}
          alt={recipeName}
          sx={{ objectFit: "cover" }}
        />
        <Label>
          <Typography variant="body1">{recipeName ?? "Unknown"}</Typography>
          <Typography variant="body2">
            {createdAt
              ? format(createdAt, "dd/MM/yyyy")
              : "unknown creation date"}
          </Typography>
        </Label>
      </Card>
    </Link>
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
