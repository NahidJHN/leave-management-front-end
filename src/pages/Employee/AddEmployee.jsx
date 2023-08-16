import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import { LoadingButton } from "@mui/lab";

import FormComponent from "../../components/Form/Form";
import useAuth from "../../hooks/useAuth";
import { useGetDepartmentQuery } from "../../redux/services/department.service";
import { toISO } from "../../utils/dateFormatter";
import { useEmployeeCreateMutation } from "../../redux/services/employee.service";
import SendIcon from "@mui/icons-material/Send";
import employeeFormData from "./Employee-Form";

const AddEmployee = () => {
  const { user } = useAuth();

  const { data: department } = useGetDepartmentQuery(user?.admin, {
    skip: !user,
  });

  const [employeeCreate, { isLoading, isSuccess }] =
    useEmployeeCreateMutation();

  const submitHandler = (data) => {
    const formData = {
      ...data,
      admin: user.admin,
      dob: toISO(data.dob),
      joiningDate: toISO(data.joiningDate),
    };
    employeeCreate(formData);
  };

  const { formData, schema } = employeeFormData(
    department,
    { xs: 12, sm: 6 },
    "medium"
  );

  return (
    <Box>
      <AppHeader title="Add Employee" />

      <Paper sx={{ paddingY: 7, paddingX: 3, marginTop: 3 }}>
        <Stack spacing={5} paddingX={10}>
          <Typography variant="h6">Create Employee</Typography>
          <FormComponent
            data={formData}
            onSubmit={submitHandler}
            schema={schema}
            isSuccess={isSuccess}
          >
            <Stack>
              <LoadingButton
                endIcon={<SendIcon />}
                loadingPosition="end"
                loading={isLoading}
                variant="contained"
                disableRipple
                color="primary"
                type="submit"
                sx={{ marginLeft: "auto" }}
              >
                Create Employee
              </LoadingButton>
            </Stack>
          </FormComponent>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddEmployee;
