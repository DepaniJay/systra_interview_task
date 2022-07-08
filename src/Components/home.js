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
      "&>b": {
        textTransform: "lowercase",
      },
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
  gridBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    boxSizing: "border-box",
    "&>span": {
      fontSize: "100%",
    },
  },
});

export default function Home() {
  const classes = useStyle();
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");
  const [noOfColors, setNoOfColors] = useState("");
  const [randomColors, setRandomColors] = useState([]);
  const [randomColorsForDiv, setRandomColorsForDiv] = useState([]);
  const [finalResult, setFinalResult] = useState([]);
  let resultData = [];
  const getRandomNumber = (min = 0, max = 255) =>
    Math.floor(Math.random() * max) + min;
  const getNum = (e) =>
    e.target.value?.replace(/\D/g, "")
      ? parseInt(e.target.value?.replace(/\D/g, ""))
      : "";
  const [toggle, setToggle] = useState(false);

  const handleReset = () => {
    setColumn("");
    setRow("");
    setNoOfColors("");
    setRandomColors([]);
    setRandomColorsForDiv([]);
    setFinalResult([]);
    resultData = [];
    setToggle(false);
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
      const randomColorsForDivArr = [...Array(column * row)]?.map(
        () => randomColorsArr[getRandomNumber(0, noOfColors - 1)]
      );
      setRandomColorsForDiv(randomColorsForDivArr);
      return randomColorsForDivArr;
    }
  };

  const algorithm = (i, arr) => {
    let nearestIndex = [i - column, i + column];
    nearestIndex = nearestIndex?.filter(
      (index) => index >= 0 && index < arr.length
    );
    if (i % column !== 0) {
      nearestIndex.unshift(i - 1);
    }
    let lastRowIndex = [...Array(column * row + 1)]
      ?.map((item, lastI) => (lastI % column === 0 ? lastI - 1 : -1))
      ?.filter((item) => item > 0);
    if (!lastRowIndex.includes(i)) {
      nearestIndex.splice(-1, 0, i + 1);
    }
    for (let nearestI of nearestIndex) {
      if (
        arr[i] === arr[nearestI] &&
        !resultData[resultData?.length - 1].includes(nearestI)
      ) {
        resultData[resultData?.length - 1].push(nearestI);
        algorithm(nearestI, arr);
      }
    }
  };

  const getBiggestAreaWithSameColor = (arr) => {
    for (let i = 0; i < arr?.length; i++) {
      if (resultData?.flatMap((arr) => arr).includes(i)) {
        continue;
      } else {
        resultData.push([i]);
        algorithm(i, arr);
      }
    }
  };

  const handleSubmit = () => {
    setToggle(true);
    const arr = generateRandomColors();
    getBiggestAreaWithSameColor(arr);
    let maxLength = resultData
      ?.sort((a, b) => a.length - b.length)
      .at(-1).length;
    setFinalResult(
      resultData
        ?.filter((item) => item?.length === maxLength)
        ?.map((item) => {
          return {
            color: arr[item[0]],
            cellArr: item,
          };
        })
    );
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
            onChange={(e) => setColumn(getNum(e))}
            InputProps={{ disableUnderline: true }}
            variant="standard"
            className={classes.textfield}
            disabled={toggle}
          ></TextField>
          <TextField
            type={"text"}
            placeholder="Enter rows"
            value={row}
            onChange={(e) => setRow(getNum(e))}
            InputProps={{ disableUnderline: true }}
            variant="standard"
            className={classes.textfield}
            disabled={toggle}
          ></TextField>
          <TextField
            type={"text"}
            placeholder="Enter no of colors"
            value={noOfColors}
            onChange={(e) => setNoOfColors(getNum(e))}
            InputProps={{ disableUnderline: true }}
            variant="standard"
            className={classes.textfield}
            disabled={toggle}
          ></TextField>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!column || !row || !noOfColors}
            sx={{ mr: 2 }}
          >
            Submit
          </Button>
          <Button
            onClick={handleReset}
            color="secondary"
            disabled={!column && !row && !noOfColors}
            variant="contained"
          >
            Reset
          </Button>
        </Grid>
        <Grid
          container
          alignItems={"flex-start"}
          justifyContent="space-around"
          className={classes.outputRootDiv}
        >
          <Grid className={classes.taskOutput}>
            {randomColorsForDiv?.map((item, key) => {
              const arrIndex = finalResult?.flatMap((item) => item?.cellArr);
              return (
                <Grid
                  key={key}
                  sx={{
                    width: `calc(400px / ${column})`,
                    height: `calc(400px / ${row})`,
                    background: item,
                    border: arrIndex?.includes(key)
                      ? `2px solid white`
                      : "unset",
                  }}
                  className={classes.gridBox}
                >
                  {arrIndex?.includes(key) ? (
                    <span>{finalResult[0]?.cellArr?.length}</span>
                  ) : (
                    ""
                  )}
                </Grid>
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
              {randomColors?.map((color, key) => {
                return <Grid sx={{ background: color }} key={key}></Grid>;
              })}
            </Grid>
            <Typography variant="h6">
              Result{` (${finalResult?.length})`}
            </Typography>
            {finalResult?.map((item, key) => {
              return (
                <Typography key={key} className={classes.resultText}>
                  the biggest area contains <b>{item?.cellArr?.length}</b> cells
                  with <b style={{ color: item?.color }}>{item?.color}</b>
                  <div style={{ background: item?.color }}></div> color
                </Typography>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
