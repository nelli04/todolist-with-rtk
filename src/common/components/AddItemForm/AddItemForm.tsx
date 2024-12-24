import { ChangeEvent, KeyboardEvent, ReactNode, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";

type Props = {
  addItem: (title: string) => void;
  disabled?: boolean;
  icon?: ReactNode;
  titleForm?: string;
};

export const AddItemForm = ({ addItem, disabled, icon, titleForm }: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addItemHandler();
    }
  };

  return (
    <Box sx={{ display: "inline-flex" }}>
      <TextField
        label={titleForm}
        variant={"outlined"}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
        disabled={disabled}
        InputProps={{
          startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        }}
      />
      <IconButton onClick={addItemHandler} disabled={disabled} sx={{ m: "0 10px" }}>
        <AddIcon sx={{ color: theme.palette.secondary.light }} />
      </IconButton>
    </Box>
  );
};
