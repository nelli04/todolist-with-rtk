import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { successToast } from "common/utils";
import { AddItemForm } from "common/components";

import { useCreateTaskMutation } from "features/todolists/api/tasksApi";
import { DomainTodolist } from "features/todolists/lib/types/types";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

import style from './Todolist.module.css'

type Props = {
  todolist: DomainTodolist;
};

export const Todolist = ({ todolist }: Props) => {
  const [addTask] = useCreateTaskMutation();

  const addTaskCallback = (title: string) => {
    addTask({ title, todolistId: todolist.id })
      .unwrap()
      .then(() => successToast("Created Task!"));
  };

  return (
    <Paper className={style.paper} elevation={3}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm titleForm="Create Task" addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Box sx={{ flexGrow: 1 }}>
        <Tasks todolist={todolist} />
      </Box>
      <Box sx={{ marginTop: "auto" }}>
        <FilterTasksButtons todolist={todolist} />
      </Box>
    </Paper>
  );
};
