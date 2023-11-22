import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import type { Product } from "@app/types";
import { ProductListTable } from "@app/views/products";
import { axios } from "@app/utils";

const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/products");
  return response.data;
};

const ProductList = async (): Promise<JSX.Element> => {
  const products = await getProducts();
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 8,
      }}
    >
      <Container maxWidth={"xl"}>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              Product List
            </Typography>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRight fontSize="small" />}
              sx={{ mt: 1 }}
            >
              <Typography color="textSecondary" variant="subtitle2">
                Dashboard
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                Products
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <ProductListTable products={products} />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductList;
