import { configureStore } from "@reduxjs/toolkit";
import { departmentApi } from "./services/department.service";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice from "./services/auth.slice";

import { isRejectedWithValue, isFulfilled } from "@reduxjs/toolkit";
import { api } from "./base-query";
import { enqueueSnackbar } from "notistack";

//error handler

/**
 * Log a warning and show a toast!
 */
export const successErrorHandler = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!

  if (isRejectedWithValue(action)) {
    enqueueSnackbar(action.payload?.data?.message, {
      variant: "error",
    });
  }

  if (
    isFulfilled(action) &&
    action.meta.baseQueryMeta.request.method !== "GET"
  ) {
    enqueueSnackbar(action.payload?.message, {
      variant: "success",
    });

    console.log(action.payload?.message);
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(departmentApi.middleware)
      .concat(successErrorHandler),
});

setupListeners(store.dispatch);
