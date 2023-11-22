"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface ProviderProps {
  children: React.ReactNode;
}

const ProgressProvider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <React.Fragment>
      {children}
      <ProgressBar
        height="4px"
        color="#688eff"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </React.Fragment>
  );
};

export default ProgressProvider;
