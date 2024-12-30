import { baseApi } from "app/baseApi";
import { BaseResponse } from "common/types";
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types";

export const PAGE_SIZE = 4;

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (bield) => ({
    getTasks: bield.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE };

        return {
          method: "GET",
          url: `todo-lists/${todolistId}/tasks`,
          params,
        };
      },
      providesTags: (res, err, { todolistId }) =>
        res
          ? [...res.items.map(({ id }) => ({ type: "Task", id }) as const), { type: "Task", id: todolistId }]
          : ["Task"],
    }),
    createTask: bield.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => {
        return {
          url: `todo-lists/${todolistId}/tasks`,
          method: "POST",
          body: { title },
        };
      },
      invalidatesTags: (res, err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: bield.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ taskId, todolistId }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }],
    }),
    updateTask: bield.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => {
        return {
          method: "PUT",
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          body: model,
        };
      },
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }],
    }),
  }),
});

export const { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useGetTasksQuery } = tasksApi;
