"use client";

import React, { useState } from "react";
import { Box, Button, Collapse, ListItem } from "@mui/material";
import type { ListItemProps } from "@mui/material";
import { ChevronRight, ArrowDownward } from "@mui/icons-material";
import Link from "next/link";

interface NavItemProps extends ListItemProps {
  active?: boolean;
  children?: React.ReactNode;
  depth: number;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  open?: boolean;
  path?: string;
  title: string;
}

const NavItem = ({
  active,
  children,
  depth,
  icon,
  info,
  open: openProp,
  path,
  title,
  ...other
}: NavItemProps) => {
  const [open, setOpen] = useState<boolean>(openProp as any);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 16;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  // Branch
  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: "block",
          py: 0,
        }}
        {...other}
      >
        <Button
          endIcon={
            !open ? (
              <ChevronRight fontSize="small" />
            ) : (
              <ArrowDownward fontSize="small" />
            )
          }
          onClick={handleToggle}
          startIcon={icon}
          sx={{
            color: "text.secondary",
            fontWeight: "fontWeightMedium",
            justifyContent: "flex-start",
            pl: `${paddingLeft}px`,
            pr: "8px",
            py: "12px",
            textAlign: "left",
            textTransform: "none",
            width: "100%",
          }}
          variant="text"
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  // Leaf
  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
    >
      <Link href={path as string}>
        <Button
          startIcon={icon}
          sx={{
            color: "text.secondary",
            fontWeight: "fontWeightMedium",
            justifyContent: "flex-start",
            textAlign: "left",
            pl: `${paddingLeft}px`,
            pr: "8px",
            py: "12px",
            textTransform: "none",
            width: "100%",
            ...(active && {
              color: "primary.main",
              fontWeight: "fontWeightBold",
              "& svg": {
                color: "primary.main",
              },
            }),
          }}
          variant="text"
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
      </Link>
    </ListItem>
  );
};

NavItem.defaultProps = {
  active: false,
  open: false,
};

export default NavItem;
