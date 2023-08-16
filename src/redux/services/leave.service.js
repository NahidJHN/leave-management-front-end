import { api } from "../base-query";

export const leaveApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLeaves: build.query({
      query: (id) => "/leaves/" + id,
      transformResponse(data) {
        return data.data;
      },
    }),

    leaveCreate: build.mutation({
      query: (body) => ({
        url: "/leaves",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getLeaves", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    leaveUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/leaves/" + id,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ setOpen }, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getLeaves", data.admin, (draft) => {
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
  useGetLeavesQuery,
  useLeaveCreateMutation,
  useLeaveUpdateMutation,
} = leaveApi;