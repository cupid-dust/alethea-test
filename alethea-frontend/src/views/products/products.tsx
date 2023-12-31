"use client";
import { useState } from "react";
import type { ChangeEvent, FC, MouseEvent } from "react";
import numeral from "numeral";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import {
  Search,
  Create,
  ArrowRight,
  Image as ImageIcon,
} from "@mui/icons-material";
import type { Product, InventoryType } from "@app/types";
import { Scrollbar, Label } from "@app/components";
import Image from "next/image";

interface ProductListTableProps {
  products: Product[];
}

interface Filters {
  availability?: "available" | "unavailable" | null;
  category?: string | null;
  inStock?: boolean | null;
  isShippable?: boolean | null;
}

const categoryOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Dress",
    value: "dress",
  },
  {
    label: "Jewelry",
    value: "jewelry",
  },
  {
    label: "Blouse",
    value: "blouse",
  },
  {
    label: "Beauty",
    value: "beauty",
  },
];

const availabilityOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Unavailable",
    value: "unavailable",
  },
];

const sortOptions = [
  {
    label: "Last update (newest first)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest first)",
    value: "updatedAt|asc",
  },
  {
    label: "Creation date (newest first)",
    value: "createdAt|desc",
  },
  {
    label: "Creation date (oldest first)",
    value: "createdAt|asc",
  },
];

const getInventoryLabel = (inventoryType: InventoryType): JSX.Element => {
  const map = {
    in_stock: {
      text: "In Stock",
      color: "success",
    },
    limited: {
      text: "Limited",
      color: "warning",
    },
    out_of_stock: {
      text: "Out of Stock",
      color: "error",
    },
  };

  const { text, color }: any = map[inventoryType];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  products: Product[],
  query: string,
  filters: Filters
): Product[] =>
  products.filter((product) => {
    let matches = true;

    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (filters.category && product.category !== filters.category) {
      matches = false;
    }

    if (filters.availability) {
      if (filters.availability === "available" && !product.isAvailable) {
        matches = false;
      }

      if (filters.availability === "unavailable" && product.isAvailable) {
        matches = false;
      }
    }

    if (
      filters.inStock &&
      !["in_stock", "limited"].includes(product.inventoryType)
    ) {
      matches = false;
    }

    if (filters.isShippable && !product.isShippable) {
      matches = false;
    }

    return matches;
  });

const applyPagination = (
  products: Product[],
  page: number,
  limit: number
): Product[] => products.slice(page * limit, page * limit + limit);

const ProductListTable: FC<ProductListTableProps> = (props) => {
  const { products, ...other } = props;
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [filters, setFilters] = useState<Filters>({
    category: null,
    availability: null,
    inStock: null,
    isShippable: null,
  });

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let value: any = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value,
    }));
  };

  const handleAvailabilityChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    let value: any = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      availability: value,
    }));
  };

  const handleStockChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let value: any = null;

    if (event.target.checked) {
      value = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      inStock: value,
    }));
  };

  const handleShippableChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    let value: any = null;

    if (event.target.checked) {
      value = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      isShippable: value,
    }));
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSort(event.target.value);
  };

  const handleSelectAllProducts = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProducts(
      event.target.checked ? products.map((product) => product.id) : []
    );
  };

  const handleSelectOneProduct = (
    event: ChangeEvent<HTMLInputElement>,
    productId: string
  ): void => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prevSelected) => [...prevSelected, productId]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    }
  };

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, query, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  const enableBulkActions = selectedProducts.length > 0;
  const selectedSomeProducts =
    selectedProducts.length > 0 && selectedProducts.length < products.length;
  const selectedAllProducts = selectedProducts.length === products.length;

  return (
    <Card {...other}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          m: -1,
          p: 2,
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 500,
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            placeholder="Search products"
            value={query}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 240,
          }}
        >
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 240,
          }}
        >
          <TextField
            fullWidth
            label="Category"
            name="category"
            onChange={handleCategoryChange}
            select
            SelectProps={{ native: true }}
            value={filters.category || "all"}
            variant="outlined"
          >
            {categoryOptions.map((categoryOption) => (
              <option key={categoryOption.value} value={categoryOption.value}>
                {categoryOption.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 240,
          }}
        >
          <TextField
            fullWidth
            label="Availability"
            name="availability"
            onChange={handleAvailabilityChange}
            select
            SelectProps={{ native: true }}
            value={filters.availability || "all"}
            variant="outlined"
          >
            {availabilityOptions.map((availabilityOption) => (
              <option
                key={availabilityOption.value}
                value={availabilityOption.value}
              >
                {availabilityOption.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box sx={{ m: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={!!filters.inStock}
                color="primary"
                name="inStock"
                onChange={handleStockChange}
              />
            }
            label="In Stock"
          />
        </Box>
        <Box sx={{ m: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={!!filters.isShippable}
                color="primary"
                name="Shippable"
                onChange={handleShippableChange}
              />
            }
            label="Shippable"
          />
        </Box>
      </Box>
      {enableBulkActions && (
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              backgroundColor: "background.paper",
              mt: "6px",
              pl: "4px",
              position: "absolute",
              pr: "4px",
              width: "100%",
              zIndex: 2,
            }}
          >
            <Checkbox
              checked={selectedAllProducts}
              color="primary"
              indeterminate={selectedSomeProducts}
              onChange={handleSelectAllProducts}
            />
            <Button color="primary" sx={{ ml: 2 }} variant="outlined">
              Delete
            </Button>
            <Button color="primary" sx={{ ml: 2 }} variant="outlined">
              Edit
            </Button>
          </Box>
        </Box>
      )}
      <Scrollbar>
        <Box sx={{ minWidth: 1200 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllProducts}
                    color="primary"
                    indeterminate={selectedSomeProducts}
                    onChange={handleSelectAllProducts}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Inventory</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Attributes</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => {
                const isProductSelected = selectedProducts.includes(product.id);

                return (
                  <TableRow hover key={product.id} selected={isProductSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isProductSelected}
                        color="primary"
                        onChange={(event): void =>
                          handleSelectOneProduct(event, product.id)
                        }
                        value={isProductSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {product.image ? (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "background.default",
                              display: "flex",
                              height: 100,
                              justifyContent: "center",
                              overflow: "hidden",
                              width: 100,
                              "& img": {
                                height: "auto",
                                width: "100%",
                              },
                            }}
                          >
                            <Image
                              alt="product"
                              src={product.image}
                              width={35}
                              height={35}
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "background.default",
                              display: "flex",
                              height: 100,
                              justifyContent: "center",
                              width: 100,
                            }}
                          >
                            <ImageIcon fontSize="small" />
                          </Box>
                        )}

                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                          sx={{ ml: 2 }}
                        >
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {getInventoryLabel(product.inventoryType)}
                    </TableCell>
                    <TableCell>
                      {product.quantity} in stock
                      {product.variants > 1 &&
                        ` in ${product.variants} variants`}
                    </TableCell>
                    <TableCell>{product.attributes}</TableCell>
                    <TableCell>
                      {numeral(product.price).format(
                        `${product.currency}0,0.00`
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <Create fontSize="small" />
                      </IconButton>
                      <IconButton>
                        <ArrowRight fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredProducts.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default ProductListTable;
