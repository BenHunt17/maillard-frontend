import {
  Box,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Loading from "../components/Loading";
import { PAGINATION_LIMIT } from "../utils/constants";
import CreateRecipeModelController from "../../recipes/modals/create/controller/CreateRecipeModalController";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

interface CollectionTemplateProps<T> {
  searchText: string;
  setSearchText: (value: string) => void;
  paginationOptions: PaginationOptions;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loading: boolean;
}

export default function CollectionTemplate<T>({
  searchText,
  setSearchText,
  paginationOptions,
  items,
  renderItem,
  loading,
}: CollectionTemplateProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md")); //TODO- create a ssmall screen hook

  const pageCount = Math.ceil(paginationOptions.total / PAGINATION_LIMIT);

  return (
    <>
      <Box
        height={SEARCH_CONTAINER_HEIGHT}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <SearchBar
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          placeholder="Search Recipes"
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={8}
        >
          {!matches && (
            <Pagination
              count={pageCount}
              page={paginationOptions.page}
              onChange={(_, value) => paginationOptions.setPage(value)}
              color="primary"
            />
          )}
          <IconButton onClick={() => setIsOpen(true)}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        height={`calc(100% - ${SEARCH_CONTAINER_HEIGHT}px)`}
        overflow="auto"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        gap={8}
      >
        {loading ? (
          <Loading />
        ) : items.length <= 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h6">No results</Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 8, sm: 8, md: 6 }}>
            {items.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                {renderItem(item)}
              </Grid>
            ))}
          </Grid>
        )}
        {matches && (
          <Pagination
            count={pageCount}
            page={paginationOptions.page}
            onChange={(_, value) => paginationOptions.setPage(value)}
            color="primary"
          />
        )}
      </Box>
      <CreateRecipeModelController isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export interface PaginationOptions {
  page: number;
  total: number;
  setPage: (value: number) => void;
}

const SEARCH_CONTAINER_HEIGHT = 102;

const SearchBar = styled(TextField)(({ theme }) => ({
  width: "50%",
  backgroundColor: theme.palette.grey[200],
  borderRadius: 16,
  ".MuiOutlinedInput-root": {
    borderRadius: 16,
  },
}));
