import React, { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";
import FormDialog from "../../components/modal/FormDialogue";

import FormComponent from "../../components/Form/Form";
import {
  useDepartmentCreateMutation,
  useDepartmentUpdateMutation,
  useGetDepartmentQuery,
} from "../../redux/services/department.service";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { departmentFormData } from "./Department-Form";

const Department = () => {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [activeId, setActiveId] = useState("");
  //edit state
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    alias: "",
  });

  const handleModal = () => {
    setOpen(!open);
    setIsUpdate(false);
    setDefaultValues({ name: "", alias: "" });
    setActiveId("");
  };
  const { user } = useAuth();
  const { data: departments } = useGetDepartmentQuery(user?.admin, {
    skip: !user,
  });
  const [departmentCreate, { isLoading: createDepartmentLoading }] =
    useDepartmentCreateMutation();

  const [updateDepartment, { isLoading: updateDepartmentLoading }] =
    useDepartmentUpdateMutation();

  const submitHandler = (data) => {
    data.admin = user.admin;
    if (!isUpdate) {
      departmentCreate(data);
      return;
    }
    updateDepartment({ body: data, id: activeId });
  };

  const editHandler = (id) => {
    setOpen(true);
    setIsUpdate(true);
    setActiveId(id);

    const department = departments?.find((item) => item._id === id);
    setDefaultValues({
      name: department?.name,
      alias: department?.alias,
    });
  };

  const deleteHandler = (data) => {
    console.log(data);
  };

  const { formData, schema } = departmentFormData();

  const columns = [
    { field: "name", headerName: "Department Name", width: 130 },
    { field: "alias", headerName: "Alias Name", width: 130 },
    {
      field: "createdAt",
      headerName: "Date",
      type: "number",
      width: 200,
    },
  ];

  return (
    <Box>
      <AppHeader title="Department">
        <Button
          sx={{ display: { md: "none" } }}
          variant="contained"
          color="error"
          endIcon={<AddIcon />}
          onClick={handleModal}
        >
          create
        </Button>
      </AppHeader>
      <Stack direction="row" marginTop={3} spacing={3}>
        <Box width="40%" display={{ xs: "none", sm: "none", md: "block" }}>
          <Paper sx={{ paddingY: 7, paddingX: 3 }}>
            <Stack spacing={4}>
              <Typography variant="h6">New Department</Typography>
              <FormComponent
                data={formData}
                onSubmit={submitHandler}
                schema={schema}
              >
                <LoadingButton
                  loading={createDepartmentLoading}
                  loadingPosition="end"
                  variant="contained"
                  disableRipple
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 3.5 }}
                >
                  Create Department
                </LoadingButton>
              </FormComponent>
            </Stack>
          </Paper>
        </Box>

        <Box flexGrow={4} width="100%">
          <Paper sx={{ width: "100%" }}>
            <DataTable
              columns={columns}
              rows={departments || []}
              pageSize={6}
              handleSelection={() => {}}
              key="_id"
              hasAction={true}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          </Paper>
        </Box>
      </Stack>
      <FormDialog
        open={open}
        handleClose={handleModal}
        modalHeader={!isUpdate ? "Create Department" : "Update Department"}
        onSubmit={submitHandler}
        data={formData}
        schema={schema}
        loading={updateDepartmentLoading}
        defaultValues={defaultValues}
      />
    </Box>
  );
};

export default Department;
