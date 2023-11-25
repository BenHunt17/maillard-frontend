import { Box, Grid, TextField, Typography, styled } from "@mui/material";
import Loading from "../components/Loading";

interface CollectionTemplateProps<T> {
  searchText: string;
  setSearchText: (value: string) => void;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loading: boolean;
}

export default function CollectionTemplate<T>({
  searchText,
  setSearchText,
  items,
  renderItem,
  loading,
}: CollectionTemplateProps<T>) {
  return (
    <>
      <Box height={SEARCH_CONTAINER_HEIGHT} display="flex" alignItems="center">
        <SearchBar
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          placeholder="Search Recipes"
        />
      </Box>
      <Box height={`calc(100% - ${SEARCH_CONTAINER_HEIGHT}px)`} overflow="auto">
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
          <Grid
            container
            gridTemplateColumns="1fr 1fr"
            spacing={{ xs: 8, sm: 8, md: 6 }}
          >
            {items.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                {renderItem(item)}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
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
