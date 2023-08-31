import * as yup from "yup";

const leaveFormData = (
  leaveTypes,
  role,
  isSelf,
  editable,
  leave,
  gridSize,
  inputSize
) => {
  const schema = yup
    .object({
      leaveType: yup.string().required("Please select a leave type"),
      startDate: yup.date().required("Select leave start date"),
      endDate: yup.date().required("Select leave end date"),
      adminRemark: yup.string(),
      hodRemark: yup.string(),
      hodStatus: yup.string(),
      adminStatus: yup.string(),
      availableLeaves: yup.number().required("Your leave is empty"),
      firstName: yup.string().required("Employee name is empty"),
      lastName: yup.string().required("Employee name is empty"),
      note: yup.string().required("Select leave end date"),
    })
    .required();
  const formData = [
    {
      name: "firstName",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "First Name",
      disabled: true,
      isVisible: true,
    },
    {
      name: "lastName",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "Last Name",
      disabled: true,
      isVisible: true,
    },

    {
      name: "leaveType",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: { xs: 12 },
      fullWidth: true,
      label: "Select leave type",
      isVisible: true,
      disabled: !isSelf && leave,
      options: leaveTypes
        ? leaveTypes.map((item) => ({ label: item.name, value: item._id }))
        : [],
    },
    {
      name: "availableLeaves",
      variant: "outlined",
      size: inputSize,
      inputType: "number",
      grid: gridSize,
      fullWidth: true,
      label: "Available Leaves",
      disabled: true,
      isVisible: true,
    },
    {
      name: "startDate",
      variant: "outlined",
      size: inputSize,
      inputType: "date",
      grid: gridSize,
      fullWidth: true,
      disabled: !isSelf && leave,
      label: "Start Date",
      isVisible: true,
    },
    {
      name: "endDate",
      variant: "outlined",
      size: inputSize,
      inputType: "date",
      grid: gridSize,
      fullWidth: true,
      disabled: !isSelf && leave,
      label: "End Date",
      isVisible: true,
    },
    {
      name: "hodStatus",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: gridSize,
      fullWidth: true,
      label: "HOD Status",
      isVisible: role === "HOD" && leave && !isSelf,
      disabled: role !== "HOD",
      options: [
        {
          label: "Pending",
          value: "PENDING",
        },
        {
          label: "Approved",
          value: "APPROVED",
        },
        {
          label: "Rejected",
          value: "REJECTED",
        },
      ],
    },
    {
      name: "adminStatus",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: gridSize,
      fullWidth: true,
      label: "Admin Status",
      isVisible: role === "ADMIN",
      disabled: role !== "ADMIN",
      options: [
        {
          label: "Pending",
          value: "PENDING",
        },
        {
          label: "Approved",
          value: "APPROVED",
        },
        {
          label: "Rejected",
          value: "REJECTED",
        },
      ],
    },
    {
      name: "note",
      variant: "outlined",
      size: inputSize,
      inputType: "textarea",
      grid: gridSize,
      fullWidth: true,
      label: "Reason for leave",
      minRows: 4,
      disabled: !isSelf && leave,
      isVisible: true,
    },
  ];
  return { schema, formData };
};

export default leaveFormData;
