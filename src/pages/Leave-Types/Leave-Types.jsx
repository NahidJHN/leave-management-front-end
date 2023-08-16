import React, { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";

import * as yup from "yup";
import FormComponent from "../../components/Form/Form";
import {
  useLeaveTypesCreateMutation,
  useLeaveTypesUpdateMutation,
  useGetLeaveTypesQuery,
} from "../../redux/services/leave-type.service";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

const formData = [
  {
    name: "name",
    variant: "outlined",
    size: "small",
    inputType: "text",
    grid: { xs: 12 },
    fullWidth: true,
    label: "Name",
  },
];

const LeaveType = () => {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [activeId, setActiveId] = useState("");

  const { user } = useAuth();
  const { data: leaveTypes } = useGetLeaveTypesQuery(user?.admin, {
    skip: !user,
  });

  const [
    leaveTypeCreate,
    { isLoading: createLeaveTypeLoading, isSuccess: createLeaveTypesSuccess },
  ] = useLeaveTypesCreateMutation();

  const [
    updateLeaveType,
    { isLoading: updateLeaveTypeLoading, isSuccess: updateLeaveTypesSuccess },
  ] = useLeaveTypesUpdateMutation();

  //edit state
  const [defaultValues, setDefaultValues] = useState({
    name: "",
  });

  const submitHandler = (data) => {
    data.admin = user.admin;
    if (!isUpdate) {
      leaveTypeCreate(data);
      return;
    }
    updateLeaveType({ body: data, id: activeId });
  };

  const editHandler = (id) => {
    const leaveType = leaveTypes?.find((item) => item._id === id);

    setDefaultValues({
      name: leaveType?.name,
    });

    setIsUpdate(true);
    setActiveId(id);
  };
  const deleteHandler = (data) => {
    console.log(data);
  };

  const columns = [
    { field: "name", headerName: "LeaveType Name", width: 130 },
    {
      field: "createdAt",
      headerName: "Date",
      type: "number",
      width: 200,
    },
  ];

  return (
    <Box>
      <AppHeader title="Leave Type" />
      <Stack direction="row" marginTop={3} spacing={3}>
        <Box width="40%" display={{ xs: "none", sm: "none", md: "block" }}>
          <Paper sx={{ paddingY: 7, paddingX: 3 }}>
            <Stack spacing={4}>
              <Typography variant="h6">New Leave Type</Typography>
              <FormComponent
                data={formData}
                onSubmit={submitHandler}
                schema={schema}
                isSuccess={createLeaveTypesSuccess || updateLeaveTypesSuccess}
                defaultValues={defaultValues}
              >
                <LoadingButton
                  loading={createLeaveTypeLoading}
                  loadingPosition="end"
                  variant="contained"
                  disableRipple
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 3.5 }}
                >
                  Create LeaveType
                </LoadingButton>
              </FormComponent>
            </Stack>
          </Paper>
        </Box>

        <Box flexGrow={4} width="100%">
          <Paper sx={{ width: "100%" }}>
            <DataTable
              columns={columns}
              rows={leaveTypes || []}
              pageSize={6}
              handleSelection={() => {}}
              key="id"
              hasAction={true}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default LeaveType;
