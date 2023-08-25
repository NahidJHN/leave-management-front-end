import { api } from "../base-query";

export const hodApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHod: build.query({
      query: (id) => "/hods/" + id,
      transformResponse(data) {
        return data.data;
      },
    }),

    hodCreate: build.mutation({
      query: (body) => ({
        url: "/hods",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getHod", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    hodUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/hods/" + id,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ setOpen }, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getHod", data.admin, (draft) => {
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

export const { useGetHodQuery, useHodCreateMutation, useHodUpdateMutation } =
  hodApi;
