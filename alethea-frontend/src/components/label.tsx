"use client";
import React from "react";
import type { Theme } from "@mui/material";
import { experimentalStyled } from "@mui/material/styles";
import type { SxProps } from "@mui/system";

export type LabelColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "success";

interface LabelProps {
  children?: React.ReactNode;
  color?: LabelColor;
  style?: {};
  sx?: SxProps<Theme>;
}

interface LabelRootProps {
  styleProps: {
    color: string;
  };
}

const LabelRoot = experimentalStyled("span")<LabelRootProps>(
  ({ theme, styleProps }: any) => {
    const backgroundColor = theme.palette[styleProps.color].main;
    const color = theme.palette[styleProps.color].contrastText;

    return {
      alignItems: "center",
      backgroundColor,
      borderRadius: theme.shape.borderRadius,
      color,
      cursor: "default",
      display: "inline-flex",
      flexGrow: 0,
      flexShrink: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(11),
      fontWeight: theme.typography.fontWeightMedium,
      justifyContent: "center",
      letterSpacing: 0.5,
      minWidth: 20,
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(0.5),
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    };
  }
);

const Label = ({ color = "primary", children, ...other }: LabelProps) => {
  const styleProps = { color };

  return (
    <LabelRoot styleProps={styleProps} {...other}>
      {children}
    </LabelRoot>
  );
};

export default Label;
