import { Grid, TextField, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyle = makeStyles({
  homeContainer: {
    minHeight: "100vh",
  },
  homeContent: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
  },
  mainHeading: {
    width: "100%",
    textTransform: "capitalize",
    padding: "40px 0px 10px",
    borderBottom: "3px solid #f5f5f5",
  },
  formRoot: {
    margin: "20px 0",
  },
  textfield: {
    height: 40,
    border: "1px solid #999",
    borderRadius: "5px",
    marginRight: 10,
    "&>div": {
      padding: "0px",
      "&>input": {
        padding: "10px",
      },
    },
  },
  outputRootDiv: {
    margin: "40px 0px",
  },
  taskOutput: {
    margin: "0px 20px",
    width: 400,
    height: 400,
    display: "flex",
    flexWrap: "wrap",
    background: "#f4f4f4",
  },
  taskResultDiv: {
    width: "calc(100% - 440px)",
    "&>p": {
      textTransform: "capitalize",
    },
    "&>h6": {
      fontWeight: "bold",
    },
  },
  colorsList: {
    display: "flex",
    flexWrap: "wrap",
    margin: "10px 0px",
    "&>div": {
      width: 40,
      height: 40,
      margin: "0px 10px 10px 0px",
    },
  },
  resultText: {
    "&>div": {
      display: "inline-block",
      width: 15,
      height: 15,
      marginLeft: 5,
    },
  },
});

export default function Home() {
  const classes = useStyle();
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");
  const [noOfColors, setNoOfColors] = useState("");
  const [randomColors, setRandomColors] = useState([]);
  const [resultTotalCells, setResultTotalCells] = useState(0);
  const [resultColor, setResultColor] = useState("#000");
  const [toggleForm, setToggleForm] = useState(false);
  const getRandomNumber = (min = 0, max = 255) =>
    Math.floor(Math.random() * max) + min;

  const handleReset = () => {
    setColumn("");
    setRow("");
    setNoOfColors("");
    setRandomColors([]);
    setResultColor("#000");
    setResultTotalCells(0);
    setToggleForm(false);
  };

  const generateRandomColors = () => {
    if (noOfColors > 0) {
      let randomColorsArr = [];
      do {
        let color = `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;
        if (!randomColorsArr?.includes(color)) {
          randomColorsArr.push(color);
        }
      } while (randomColorsArr?.length !== noOfColors);
      setRandomColors(randomColorsArr);
    }
  };

  const handleSubmit = () => {
    setToggleForm(true);
    generateRandomColors();
  };

  return (
    <Grid container justifyContent={"center"} className={classes.homeContainer}>
      <Grid className={classes.homeContent}>
        <Typography variant="h4" className={classes.mainHeading}>
          Systra Technical Task
        </Typography>
        <Grid
          container
          alignItems={"center"}
          justifyContent="flex-start"
          className={classes.formRoot}
        >
          <TextField
            type={"text"}
            autoFocus
            placeholder="Enter columns"
            value={column}
            onChange={(e) =>
              setColumn(parseInt(e.target.value?.replace(/\D/g, "")))
            }
            InputProps={{ disableUnderline: true }}
            variant="standard"
            className={classes.textfield}
            disabled={toggleForm}
          ></TextField>
          <TextField
            type={"text"}
            placeholder="Enter rows"
            value={row}
            onChange={(e) =>
              setRow(parseInt(e.target.value?.replace(/\D/g, "")))
            }
            InputProps={{ disableUnderline: true }}
            variant="standard"
            className={classes.textfield}
            disabled={toggleForm}
          ></TextField>
          <TextField
            type={"text"}
            placeholder="Enter no of colors"
            value={noOfColors}
            onChange={(e) =>
              setNoOfColors(parseInt(e.target.value?.replace(/\D/g, "")))
            }
            InputProps={{ disableUnderline: true }}
            variant="standard"
            className={classes.textfield}
            disabled={toggleForm}
          ></TextField>
          <Button
            onClick={() => {
              toggleForm ? handleReset() : handleSubmit();
            }}
            color="primary"
            variant="contained"
          >
            {toggleForm ? "Reset" : "Submit"}
          </Button>
        </Grid>
        <Grid
          container
          alignItems={"flex-start"}
          justifyContent="space-around"
          className={classes.outputRootDiv}
        >
          <Grid className={classes.taskOutput}>
            {[...Array(column * row)]?.map((item, key) => {
              const color = randomColors[getRandomNumber(0, noOfColors)];
              return (
                <Grid
                  key={key}
                  sx={{
                    width: `calc(400px / ${column})`,
                    height: `calc(400px / ${row})`,
                    background: color,
                  }}
                ></Grid>
              );
            })}
          </Grid>
          <Grid className={classes.taskResultDiv}>
            <Typography>
              number of cells on the width: <b>{column}</b>
            </Typography>
            <Typography>
              number of cells on height: <b>{row}</b>
            </Typography>
            <Typography>
              number of colors: <b>{noOfColors}</b>
            </Typography>
            <Grid className={classes.colorsList}>
              {randomColors?.map((color) => {
                return <Grid sx={{ background: color }}></Grid>;
              })}
            </Grid>
            <Typography variant="h6">Result</Typography>
            <Typography className={classes.resultText}>
              the biggest area contains <b>{resultTotalCells}</b> cells with{" "}
              <b style={{ color: resultColor }}>{resultColor}</b>
              <div style={{ background: resultColor }}></div> color
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
