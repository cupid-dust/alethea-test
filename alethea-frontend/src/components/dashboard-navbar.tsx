"use client";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { experimentalStyled } from "@mui/material/styles";
import type { AppBarProps } from "@mui/material";
import { MenuIcon } from "@app/icons";
import AccountPopover from "./accounts-popover";
import Link from "next/link";

interface DashboardNavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === "light" && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    color: theme.palette.primary.contrastText,
  }),
  ...(theme.palette.mode === "dark" && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
  }),
  zIndex: theme.zIndex.drawer + 100,
}));

const DashboardNavbar = ({
  onSidebarMobileOpen,
  ...other
}: DashboardNavbarProps) => {
  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              lg: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Link href="/dashboard/users">
          <Typography color="textPrimary" variant="subtitle2">
            App
          </Typography>
        </Link>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2,
          }}
        />

        <Box sx={{ ml: 2 }}>
          <AccountPopover />
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

export default DashboardNavbar;
