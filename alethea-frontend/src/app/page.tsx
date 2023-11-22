import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { LoginJWT } from "@app/views/authentication";

const Login = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ py: "80px" }}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 4,
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h4">
                  Log in
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Log in on the internal platform
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <LoginJWT />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
