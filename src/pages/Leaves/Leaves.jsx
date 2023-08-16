import React, { useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";

import {
  useGetLeavesQuery,
  useLeaveCreateMutation,
  useLeaveUpdateMutation,
} from "../../redux/services/leave.service";
import useAuth from "../../hooks/useAuth";

const Leave = ({ filterTerms }) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [defaultValues, setDefaultValues] = useState({});

  const handleModal = () => {
    setOpen(!open);
    setDefaultValues({});
    setActiveId("");
  };

  const { user } = useAuth();
  const { data: leaves } = useGetLeavesQuery(user?.admin, {
    skip: !user,
    selectFromResult: ({ data }) => {
      if (filterTerms === "all") return { data };
      const filteredData = data?.map((item) => item.status === filterTerms);
      return { data: filteredData };
    },
  });

  const [updateLeave, { isLoading: updateLeaveLoading }] =
    useLeaveUpdateMutation();

  //edit state

  const submitHandler = async (data) => {};

  const editHandler = (id) => {
    setOpen(true);
    setActiveId(id);
  };
  const deleteHandler = (data) => {
    console.log(data);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      valueGetter: (params) => params.row.firstName + " " + params.row.lastName,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 130,
      valueGetter: (params) => params.row.user.mobile,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => params.row.user.email,
    },
    { field: "gender", headerName: "Gender", width: 130 },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
    },
  ];

  return (
    <Box>
      <AppHeader title="Leave" />
      <Stack direction="row" marginTop={3} spacing={3}>
        <Paper sx={{ width: "100%" }}>
          <DataTable
            columns={columns}
            rows={leaves || []}
            pageSize={6}
            handleSelection={() => {}}
            key="id"
            hasAction={true}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        </Paper>
      </Stack>
    </Box>
  );
};

export default Leave;
