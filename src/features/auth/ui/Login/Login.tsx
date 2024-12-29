import { Navigate } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { useLogin } from "../../lib/hooks/useLogin";
import { LoginForm } from "./LoginForm/LoginForm";
import { LoginFormLabel } from "./LoginFormLabel/LoginFormLabel";

export const Login = () => {
  const { isLoggedIn } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "100vh" }}>
      <Grid item>
        <FormControl>
          <FormLabel>
            <LoginFormLabel />
            <LoginForm />
          </FormLabel>
        </FormControl>
      </Grid>
    </Grid>
  );
};
