"use client";
import { useEffect } from "react";
import { Avatar, Box, Divider, Drawer, Typography } from "@mui/material";
import type { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { People, PollOutlined } from "@mui/icons-material";
import { useAuth } from "@app/hooks";
import NavSection from "./nav-section";
import Scrollbar from "./scrollbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const sections = [
  {
    title: "General",
    items: [
      {
        title: "Customers",
        path: "/dashboard/customers",
        icon: <People fontSize="small" />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <PollOutlined fontSize="small" />,
      },
    ],
  },
];

const DashboardSidebar = ({
  onMobileClose,
  openMobile,
}: DashboardSidebarProps) => {
  const { user } = useAuth();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const pathname = usePathname();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
            justifyContent: "center",
            p: 2,
          }}
        >
          <Link href="/dashboard/users">
            <Typography color="textPrimary" variant="subtitle2">
              App
            </Typography>
          </Link>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "background.default",
              borderRadius: 1,
              display: "flex",
              overflow: "hidden",
              p: 2,
            }}
          >
            <Link href="/dashboard/users">
              <Avatar
                src={user?.avatar}
                sx={{
                  cursor: "pointer",
                  height: 48,
                  width: 48,
                }}
              />
            </Link>
            <Box sx={{ ml: 2 }}>
              <Typography color="textPrimary" variant="subtitle2">
                {user?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={pathname as string}
              sx={{
                "& + &": {
                  mt: 3,
                },
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider />
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "background.paper",
            height: "calc(100% - 64px) !important",
            top: "64px !Important",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          width: 280,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
