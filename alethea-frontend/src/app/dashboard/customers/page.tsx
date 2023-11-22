import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import type { Customer } from "@app/types";
import { CustomerListTable } from "@app/views/customers";
import { axios } from "@app/utils";

const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get("/customers");
  return response.data;
};

const Page = async (): Promise<JSX.Element> => {
  const customers = await getCustomers();
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
              Customer List
            </Typography>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRight fontSize="small" />}
              sx={{ mt: 1 }}
            >
              <Typography color="textPrimary" variant="subtitle2">
                Dashboard
              </Typography>

              <Typography color="textSecondary" variant="subtitle2">
                Customers
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <CustomerListTable customers={customers} />
        </Box>
      </Container>
    </Box>
  );
};

export default Page;
