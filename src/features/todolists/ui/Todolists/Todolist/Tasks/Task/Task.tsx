import { ChangeEvent } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";

import { EditableSpan } from "common/components";
import { TaskStatus } from "common/enums";
import { successToast } from "common/utils/toast";

import { useDeleteTaskMutation, useUpdateTaskMutation } from "features/todolists/api/tasksApi";
import { DomainTask } from "features/todolists/api/tasksApi.types";
import { DomainTodolist } from "features/todolists/lib/types/types";
import { createTaskModel } from "features/todolists/lib/utils/createTaskModel";
import { useTheme } from "@mui/material/styles";
import { getListItemSx } from "./Task.styles";

type Props = {
  task: DomainTask;
  todolist: DomainTodolist;
};

export const Task = ({ task, todolist }: Props) => {
  const [removeTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const theme = useTheme();

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
      .unwrap()
      .then(() => successToast("Removed Task!"));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    const model = createTaskModel(task, { status });
    updateTask({ taskId: task.id, todolistId: todolist.id, model });
  };

  const changeTaskTitleHandler = (title: string) => {
    const model = createTaskModel(task, { title });
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
      .unwrap()
      .then(() => successToast("Updated Task!"));
  };

  const disabled = todolist.entityStatus === "loading";

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} disabled={disabled} />
      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <DeleteIcon sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
    </ListItem>
  );
};
