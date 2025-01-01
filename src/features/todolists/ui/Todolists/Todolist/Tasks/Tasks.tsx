import { format } from "date-fns";

import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTasks } from "features/todolists/lib/hooks/useTasks";
import { DomainTodolist } from "features/todolists/lib/types/types";
import { TasksSkeleton } from "../../Skeletons/TasksSkeleton/TasksSkeleton";
import { TasksPagination } from "../TasksPagination/TasksPagination";
import { Task } from "./Task/Task";
import style from "./Tasks.module.css";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { tasks, isLoading, totalCount, page, setPage } = useTasks(todolist);

  if (isLoading) {
    return <TasksSkeleton />;
  }

  return (
    <Box className={style.box}>
      {tasks?.length === 0 ? (
        <Typography className={style.typographyEmpty}>No tasks available.</Typography>
      ) : (
        <>
          {tasks?.map((task) => {
            const formattedDate = format(new Date(task.addedDate), "M/dd/yyyy k:m");

            return (
              <Paper elevation={5} className={style.paper}>
                <Task key={task.id} task={task} todolist={todolist} />
                <Typography variant="caption" className={style.typographyDate}>
                  {formattedDate}
                </Typography>
              </Paper>
            );
          })}
          <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </Box>
  );
};
