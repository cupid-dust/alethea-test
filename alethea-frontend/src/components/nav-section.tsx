"use client";
import React from "react";
import { List, ListSubheader } from "@mui/material";
import type { ListProps } from "@mui/material";
import NavItem from "./nav-items";
import { usePathname } from "next/navigation";

interface Item {
  path?: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  children?: Item[];
  title: string;
}

interface NavSectionProps extends ListProps {
  items: Item[];
  pathname: string;
  title: string;
}

const renderNavItems = ({
  depth = 0,
  items,
  pathname,
  matchPath,
}: {
  items: Item[];
  pathname: string;
  depth?: number;
  matchPath: any;
}): JSX.Element => (
  <List disablePadding>
    {/* @ts-ignore */}
    {items.reduce(
      (acc, item) =>
        reduceChildRoutes({
          acc,
          item,
          pathname,
          depth,
          matchPath,
        }) as any,
      []
    )}
  </List>
);

const reduceChildRoutes = ({
  acc,
  pathname,
  item,
  depth,
  matchPath,
}: {
  acc: JSX.Element[];
  pathname: string;
  item: Item;
  depth: number;
  matchPath: any;
}): Array<JSX.Element> => {
  const key = `${item.title}-${depth}`;
  const exactMatch = item.path ? item.path === matchPath : false;

  if (item.children) {
    const partialMatch = item.path ? matchPath.startsWith(item.path) : false;

    acc.push(
      <NavItem
        active={partialMatch}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={partialMatch}
        path={item.path}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          pathname,
          matchPath,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        active={exactMatch}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

const NavSection = ({ items, pathname, title, ...other }: NavSectionProps) => {
  const matchPath = usePathname();

  return (
    <List
      subheader={
        <ListSubheader
          disableGutters
          disableSticky
          sx={{
            color: "text.primary",
            fontSize: "0.75rem",
            lineHeight: 2.5,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {title}
        </ListSubheader>
      }
      {...other}
    >
      {renderNavItems({
        items,
        pathname,
        matchPath,
      })}
    </List>
  );
};

export default NavSection;
