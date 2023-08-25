import * as yup from "yup";

const hodFormData = (department, gridSize, inputSize) => {
  const schema = yup
    .object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      gender: yup.string().required("Select a gender"),
      department: yup.string().required("Select a department"),
      dob: yup.date().required("Select date of birth"),
      joiningDate: yup.date().required("Select joining date"),
      address: yup.string().required("Address is required"),
      mobile: yup.string().required("Mobile number is required"),
      email: yup.string().email("Invalid Email").required("Email is required"),
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
      label: "First name",
    },
    {
      name: "lastName",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "Last name",
    },
    {
      name: "mobile",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "Enter mobile",
    },
    {
      name: "email",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "Enter Email",
    },
    {
      name: "gender",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: gridSize,
      fullWidth: true,
      label: "Select Gender",
      options: [
        {
          label: "Male",
          value: "MALE",
        },
        {
          label: "Female",
          value: "FEMALE",
        },
        {
          label: "Other",
          value: "OTHER",
        },
      ],
    },
    {
      name: "department",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: gridSize,
      fullWidth: true,
      label: "Select department",
      options: department
        ? department.map((item) => ({ label: item.name, value: item._id }))
        : [],
    },
    {
      name: "dob",
      variant: "outlined",
      size: inputSize,
      inputType: "date",
      grid: gridSize,
      fullWidth: true,
      label: "Date of birth",
    },
    {
      name: "joiningDate",
      variant: "outlined",
      size: inputSize,
      inputType: "date",
      grid: gridSize,
      fullWidth: true,
      label: "Joining date",
    },
    {
      name: "address",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "address",
    },
  ];
  return { schema, formData };
};

export default hodFormData;
