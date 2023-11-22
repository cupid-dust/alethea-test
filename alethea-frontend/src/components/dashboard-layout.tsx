"use client";

import React, { useState } from "react";
import { experimentalStyled } from "@mui/material/styles";
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayoutRoot = experimentalStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const DashboardLayoutWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: "64px",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: "280px",
  },
}));

const DashboardLayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const DashboardLayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
  position: "relative",
  WebkitOverflowScrolling: "touch",
});

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] =
    useState<boolean>(false);

  const onToggle = (): void => {
    setIsSidebarMobileOpen((prevState: boolean) => !prevState);
  };
  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onSidebarMobileOpen={onToggle} />
      <DashboardSidebar
        onMobileClose={onToggle}
        openMobile={isSidebarMobileOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
