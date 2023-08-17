import React, { useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";

import {
  useGetLeavesQuery,
  useLeaveUpdateMutation,
} from "../../redux/services/leave.service";

import { useGetLeaveTypesQuery } from "../../redux/services/leave-type.service";

import { useGetEmployeeQuery } from "../../redux/services/employee.service";

import useAuth from "../../hooks/useAuth";
import ChipComponent from "../../components/Badge/Chip";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

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
      const filteredData = data?.filter(
        (item) => item.adminStatus === filterTerms
      );
      return { data: filteredData };
    },
  });

  const { data: leaveTypes } = useGetLeaveTypesQuery(user?.admin, {
    skip: !user,
  });

  const { data: employees } = useGetEmployeeQuery(user?.admin, { skip: !user });

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
      field: "employee",
      headerName: "Employee",
      width: 150,
      valueGetter: ({ value }) => {
        const employee = employees?.find((employee) => employee._id === value);
        return `${employee?.firstName} ${employee?.lastName}`;
      },
    },
    {
      field: "leaveType",
      headerName: "Leave Type",
      width: 100,
      valueGetter: ({ value }) => {
        const leaveType = leaveTypes?.find(
          (leaveType) => leaveType._id === value
        );
        return leaveType?.name;
      },
    },
    {
      field: "numOfDay",
      headerName: "Total Days",
      width: 100,
      valueGetter: ({ value }) => {
        return value + " Days";
      },
    },
    {
      field: "hodStatus",
      headerName: "Hod Status",
      width: 130,
      renderCell: ({ value }) => {
        return <ChipComponent label={value} status={value} />;
      },
    },
    {
      field: "adminStatus",
      headerName: "Admin Status",
      width: 130,
      renderCell: ({ value }) => {
        return <ChipComponent label={value} status={value} />;
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      valueGetter: ({ value }) => {
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      valueGetter: ({ value }) => {
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      field: "_id",
      headerName: "Action",
      width: 200,
      renderCell: ({ value }) => {
        return <Link to={`/leaves/apply?leaveid=${value}`}>View</Link>;
      },
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
            key="_id"
            hasAction={false}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        </Paper>
      </Stack>
    </Box>
  );
};

export default Leave;
