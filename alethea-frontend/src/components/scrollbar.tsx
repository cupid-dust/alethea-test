"use client";

import { forwardRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import type { ScrollBarProps as PerfectScrollbarProps } from "react-perfect-scrollbar";
import { Box } from "@mui/material";

interface ScrollbarProps extends PerfectScrollbarProps {}

// eslint-disable-next-line react/display-name
const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>((props, ref) => {
  const { children, ...other } = props;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator?.userAgent
    );

  if (isMobile) {
    return (
      <Box ref={ref} sx={{ overflowX: "auto" }}>
        {children}
      </Box>
    );
  }

  return (
    <PerfectScrollbar
      // @ts-ignore
      ref={ref}
      {...other}
    >
      {children}
    </PerfectScrollbar>
  );
});

export default Scrollbar;
