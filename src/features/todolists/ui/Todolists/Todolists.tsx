import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useGetTodolistsQuery } from "features/todolists/api/todolistsApi";
import { TodolistSkeleton } from "./Skeletons/TodolistSkeleton/TodolistSkeleton";
import { Todolist } from "./Todolist/Todolist";

import style from "./Todolists.module.css";

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery();

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <Grid xs={12} sm={6} md={4} key={id}>
              <TodolistSkeleton key={id} />
            </Grid>
          ))}
      </Grid>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ "&.MuiContainer-root": { padding: "0px" } }}>
      <Box className={style.box}>
        {todolists?.length === 0 ? (
          <Typography variant="h6">No To-Do Lists available.</Typography>
        ) : (
          todolists?.map((tl) => {
            return (
              <Grid key={tl.id}>
                <Todolist key={tl.id} todolist={tl} />
              </Grid>
            );
          })
        )}
      </Box>
    </Container>
  );
};
