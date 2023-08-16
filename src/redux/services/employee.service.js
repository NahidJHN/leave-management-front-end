import { api } from "../base-query";

export const employeeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployee: build.query({
      query: (id) => "/employees/" + id,
      transformResponse(data) {
        return data.data;
      },
    }),

    employeeCreate: build.mutation({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getEmployee", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    employeeUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/employees/" + id,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ setOpen }, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getEmployee", data.admin, (draft) => {
              const index = draft.findIndex((item) => item._id === data._id);
              draft[index] = data;
            })
          );
          setOpen(false);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useEmployeeCreateMutation,
  useEmployeeUpdateMutation,
} = employeeApi;
