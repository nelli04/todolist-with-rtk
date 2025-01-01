import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import style from "./Page404.module.css";

export const Page404 = () => {
  return (
    <Box className={style.box}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6} alignContent="center">
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
            <Button sx={{ margin: "15px 0" }} variant="contained" href="/">
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img src="pageNotFound.png" alt="" width={400} height={400} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
