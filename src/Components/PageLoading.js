import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";
import CircularProgressComponent from "./Common/CircularProgressComponent";

const useStyle = makeStyles({
  pageLoading: {
    width: "100%",
    height: "100vh",
  },
});

export default function PageLoading() {
  const classes = useStyle();
  return (
    <div className={clsx(classes.pageLoading, "center")}>
      <CircularProgressComponent />
    </div>
  );
}
