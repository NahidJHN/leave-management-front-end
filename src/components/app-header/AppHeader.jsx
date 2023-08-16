import { Box, Paper, Stack, Typography, styled } from "@mui/material";
import React, { PropsWithChildren } from "react";

function AppHeader(prop) {
  return (
    <Paper>
      <Box padding={2} component="div" width="100%">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            noWrap
            component="div"
            color="text.secondary"
            paddingX={1}
          >
            {prop.title}
          </Typography>
          <Box component="div"></Box>
          {prop.children}
        </Stack>
      </Box>
    </Paper>
  );
}

export default AppHeader;
