import React from "react";
import Leave from "./Leaves";
import { Box, Paper, Stack, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import DoneIcon from "@mui/icons-material/Done";
import { useGetLeavesQuery } from "../../redux/services/leave.service";
import useAuth from "../../hooks/useAuth";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const StyledBox = styled(Box)(({ theme, customColor }) => {
  return {
    backgroundColor: theme.palette[customColor].main,
    color: theme.palette.primary.contrastText,
  };
});

function LeaveHistoryCard(props) {
  return (
    <Grid item xs={12} md={3}>
      <Paper>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box padding={2} width="100%">
            <Typography variant="h4" textAlign="center">
              {props.count}
            </Typography>
            <Typography variant="body1" component="div" textAlign="center">
              {props.description}
            </Typography>
          </Box>
          <StyledBox padding={2} customColor={props.customColor}>
            {props.icon}
          </StyledBox>
        </Stack>
      </Paper>
    </Grid>
  );
}

function LeaveHistory() {
  //auth hook
  const { user } = useAuth();

  //rkt hooks
  const { countData } = useGetLeavesQuery(user?.admin, {
    skip: !user,
    selectFromResult: ({ data }) => {
      const countData = {
        all: data?.length,
        pending: 0,
        approved: 0,
        rejected: 0,
      };

      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (item.adminStatus === "PENDING") countData.pending++;
          if (item.adminStatus === "APPROVED") countData.approved++;
          if (item.adminStatus === "REJECTED") countData.rejected++;
        });
      }

      return { leaves: data, countData };
    },
  });

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" marginBottom={3}>
        <LeaveHistoryCard
          count={countData.all}
          description="All Leave Applied"
          customColor="warning"
          icon={<ForwardToInboxIcon sx={{ fontSize: 75 }} />}
        />
        <LeaveHistoryCard
          count={countData.pending}
          description="Pending"
          customColor="primary"
          icon={<QueryBuilderIcon sx={{ fontSize: 75 }} />}
        />
        <LeaveHistoryCard
          description="Approved"
          customColor="success"
          count={countData.approved}
          icon={<DoneIcon sx={{ fontSize: 75 }} />}
        />
        <LeaveHistoryCard
          description="Rejected"
          customColor="error"
          count={countData.rejected}
          icon={<DoneIcon sx={{ fontSize: 75 }} />}
        />
      </Grid>
      <Leave filterTerms="all" />;
    </Box>
  );
}

export default LeaveHistory;
