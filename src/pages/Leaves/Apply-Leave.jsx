import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import { LoadingButton } from "@mui/lab";

import FormComponent from "../../components/Form/Form";
import useAuth from "../../hooks/useAuth";
import SendIcon from "@mui/icons-material/Send";
import { useGetLeaveTypesQuery } from "../../redux/services/leave-type.service";
import leaveFormData from "./Leave-Form";

const ApplyLeave = () => {
  const { user } = useAuth();

  const { data: leaveTypes } = useGetLeaveTypesQuery(user?.admin, {
    skip: !user,
  });

  const submitHandler = (data) => {};

  const { formData, schema } = leaveFormData(
    leaveTypes,
    { xs: 12, sm: 6 },
    "medium"
  );

  const [defaultValues, setDefaultValues] = useState({
    firstName: "",
    lastName: "",
    availableLeaves: "",
  });

  useEffect(() => {
    setDefaultValues({
      firstName: user?.firstName,
      lastName: user?.lastName,
      availableLeaves: user?.availableLeaves,
    });
  }, [user]);

  return (
    <Box>
      <AppHeader title="Apply for Leave" />

      <Paper sx={{ paddingY: 7, paddingX: 3, marginTop: 3 }}>
        <Stack spacing={5} paddingX={{ xs: 3, sm: 6, md: 10, lg: 12, xl: 15 }}>
          <Typography variant="h6">Apply Leave</Typography>
          <FormComponent
            data={formData}
            onSubmit={submitHandler}
            schema={schema}
            isSuccess={false}
            defaultValues={defaultValues}
          >
            <Stack marginTop={2}>
              <LoadingButton
                endIcon={<SendIcon />}
                loadingPosition="end"
                loading={false}
                variant="contained"
                disableRipple
                color="primary"
                type="submit"
                sx={{ marginLeft: "auto" }}
              >
                Submit Leave
              </LoadingButton>
            </Stack>
          </FormComponent>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ApplyLeave;
