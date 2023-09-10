import { api } from "../base-query";

export const departmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDepartment: build.query({
      query: (id) => "/departments/" + id,
      transformResponse(data) {
        return data.data;
      },
    }),

    departmentCreate: build.mutation({
      query: (body) => ({
        url: "/departments",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getDepartment", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    departmentUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/departments/" + id,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getDepartment", data.admin, (draft) => {
              const index = draft.findIndex((item) => item._id === data._id);
              draft[index] = data;
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    departmentDelete: build.mutation({
      query: (body) => ({
        url: "/departments/" + body.id,
        method: "DELETE",
      }),
      async onQueryStarted(
        { setOpenDeleteModal },
        { queryFulfilled, dispatch }
      ) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getDepartment", data.admin, (draft) => {
              draft.filter((item) => item._id !== data._id);
            })
          );
          setOpenDeleteModal(false);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetDepartmentQuery,
  useDepartmentCreateMutation,
  useDepartmentUpdateMutation,
  useDepartmentDeleteMutation,
} = departmentApi;
