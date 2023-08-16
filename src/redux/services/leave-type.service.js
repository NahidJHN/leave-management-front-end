import { api } from "../base-query";

export const leaveTypeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLeaveTypes: build.query({
      query: (id) => "/leave-types/" + id,
      transformResponse(data) {
        return data.data;
      },
    }),

    leaveTypesCreate: build.mutation({
      query: (body) => ({
        url: "/leave-types",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getLeaveTypes", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    leaveTypesUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/leave-types/" + id,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getLeaveTypes", data.admin, (draft) => {
              const index = draft.findIndex((item) => item._id === data._id);
              draft[index] = data;
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetLeaveTypesQuery,
  useLeaveTypesCreateMutation,
  useLeaveTypesUpdateMutation,
} = leaveTypeApi;
