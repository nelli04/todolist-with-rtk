import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { RequestStatus } from "app/appSlice";
import { EditableSpan } from "common/components";
import { useAppDispatch } from "common/hooks";
import { successToast } from "common/utils";
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "features/todolists/api/todolistsApi";
import { DomainTodolist } from "features/todolists/lib/types/types";
import style from "./TodolistTitle.module.css";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist;

  const dispatch = useAppDispatch();

  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
      .unwrap()
      .then(() => successToast("Updated To-Do List!"));
  };

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id);
        if (index !== -1) {
          state[index].entityStatus = status;
        }
      }),
    );
  };

  const removeTodolistHandler = () => {
    updateQueryData("loading");
    removeTodolist(id)
      .unwrap()
      .then(() => successToast("Removed To-Do List!"))
      .catch(() => {
        updateQueryData("idle");
      });
  };

  return (
    <Box className={style.box}>
      <Typography variant="h5">
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </Typography>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
