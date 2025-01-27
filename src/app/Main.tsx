import AddTaskIcon from "@mui/icons-material/AddTask";
import Box from "@mui/material/Box";
import { AddItemForm } from "common/components";
import { useAppSelector } from "common/hooks";
import { Path } from "common/router";
import { successToast } from "common/utils";
import { useAddTodolistMutation } from "features/todolists/api/todolistsApi";
import { Navigate } from "react-router-dom";
import { Todolists } from "../features/todolists/ui/Todolists/Todolists";
import { selectIsLoggedIn } from "./appSlice";

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const addTodolistCallback = (title: string) => {
    addTodolist(title)
      .unwrap()
      .then(() => successToast("Created To-Do List!"));
  };

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />;
  }

  return (
    <Box sx={{ margin: "110px" }}>
      <AddItemForm
        titleForm="Create To-do List"
        addItem={addTodolistCallback}
        icon={<AddTaskIcon fontSize="small" />}
      />
      <Todolists />
    </Box>
  );
};
