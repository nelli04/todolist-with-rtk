import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { ChangeEvent } from "react";
import { PAGE_SIZE } from "features/todolists/api/tasksApi";

import style from "./TasksPagination.module.css";

type Props = {
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
};

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <>
      <Pagination
        count={Math.ceil(totalCount / PAGE_SIZE)}
        page={page}
        onChange={changePageHandler}
        shape="rounded"
        color="primary"
        className={style.pagination}
      />
      <div className={style.totalCount}>
        <Typography variant="caption">Total: {totalCount}</Typography>
      </div>
    </>
  );
};
