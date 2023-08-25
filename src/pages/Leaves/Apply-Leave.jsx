import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";

import FormComponent from "../../components/Form/Form";
import useAuth from "../../hooks/useAuth";
import SendIcon from "@mui/icons-material/Send";
import { useGetLeaveTypesQuery } from "../../redux/services/leave-type.service";
import {
  useGetLeavesQuery,
  useLeaveCreateMutation,
} from "../../redux/services/leave.service";
import leaveFormData from "./Leave-Form";
import { useGetEmployeeQuery } from "../../redux/services/employee.service";
import { useSearchParams } from "react-router-dom";

const ApplyLeave = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const leaveId = searchParams.get("leaveid");

  const { data: leave } = useGetLeavesQuery(user?.admin, {
    skip: !user,
    selectFromResult: ({ data }) => {
      const findLeave = data?.find((item) => item._id === leaveId);
      return { data: findLeave };
    },
  });

  const { data: leaveTypes } = useGetLeaveTypesQuery(user?.admin, {
    skip: !user,
  });

  const { data: employees } = useGetEmployeeQuery(user?.admin, {
    skip: !user,
  });

  const [
    leaveCreate,
    { isLoading: applyLeaveLoading, isSuccess: applyLeaveSuccess },
  ] = useLeaveCreateMutation();

  const submitHandler = (data) => {
    data.admin = user?.admin;
    data.userId = user?.id;
    const employee = employees.find(
      (employee) => employee.user._id === user?._id
    );
    const numOfDay = dayjs(data.endDate).diff(dayjs(data.startDate), "day");
    leaveCreate({
      ...data,
      startDate: data.startDate.toISOString(),
      employee: employee?._id,
      numOfDay,
      department: employee.department,
    });
  };

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
    if (leaveId) {
      const employee = employees?.find(
        (employee) => employee._id === leave?.employee
      );
      if (employee && leave) {
        setDefaultValues({
          firstName: employee?.firstName,
          lastName: employee?.lastName,
          availableLeaves: employee?.availableLeaves,
          leaveType: leave?.leaveType,
          startDate: dayjs(leave?.startDate).format("YYYY-MM-DD"),
          endDate: dayjs(leave?.endDate).format("YYYY-MM-DD"),
          hodStatus: leave?.hodStatus || "PENDING",
          adminStatus: leave?.adminStatus || "PENDING",
          note: leave?.note,
        });
      }
    } else {
      setDefaultValues({
        firstName: user?.firstName,
        lastName: user?.lastName,
        availableLeaves: user?.availableLeaves,
      });
    }
  }, [employees, leave]);

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
            isSuccess={applyLeaveSuccess}
            defaultValues={defaultValues}
          >
            <Stack marginTop={2}>
              <LoadingButton
                endIcon={<SendIcon />}
                loadingPosition="end"
                loading={applyLeaveLoading}
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
