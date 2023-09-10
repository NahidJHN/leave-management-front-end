import { Box } from "@mui/material";
import React, { useState } from "react";
import Table from "../../components/table/Table";
import AppHeader from "../../components/app-header/AppHeader";

const Dashboard = () => {
  const [selected, setSelected] = useState([]);

  const handleSelection = (data) => {
    setSelected(data);
  };

  return (
    <Box>
      <AppHeader title="Dashboard" />
    </Box>
  );
};

export default Dashboard;
