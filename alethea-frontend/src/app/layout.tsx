import type { Metadata } from "next";
import { ThemeRegistry } from "@app/theme";
import { AuthProvider } from "@app/contexts";
import { ProgressProvider } from "@app/components";
import "./app.css";

export const metadata: Metadata = {
  title: "Login",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          <AuthProvider>
            <ProgressProvider>{children}</ProgressProvider>
          </AuthProvider>
        </body>
      </ThemeRegistry>
    </html>
  );
}