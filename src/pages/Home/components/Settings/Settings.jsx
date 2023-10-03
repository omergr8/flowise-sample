import { useState } from "react";
import classes from "./Settings.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Banner from "../../../../components/Banner/Banner";
import MultiSelect from "../../../../components/MultiSelect/MultiSelect";

const interestType = [
  {
    name: "Events now & soon",
    value: "Events now & soon",
  },
  {
    name: "Historical interest",
    value: "Historical interest",
  },
  {
    name: "Geography & Landmarks",
    value: "Geography & Landmarks",
  },
  {
    name: "Food & Drink",
    value: "Food & Drink",
  },
  {
    name: "Shopping & Entertainment",
    value: "Shopping & Entertainment",
  },
];

export default function Settings(props) {
  const {
    geographically,
    setGeographically,
    fashion,
    setFashion,
    interest,
    setInterest,
    onClickIllumination
  } = props;

 
  return (
    <div className={classes.main}>
      <div>
        <Banner text="What would you like to learn about, and how often?" />
      </div>
      <div className={classes.formDiv}>
        <p>A timely fashion</p>
        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Fashion</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={fashion}
            label="Fashion"
            onChange={(e) => setFashion(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"More then once an hour"}>
              More then once an hour
            </MenuItem>
            <MenuItem value={"More then once an hour"}>
              Less then once an hour
            </MenuItem>
            <MenuItem value={"A few times a day"}>A few times a day</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.formDiv}>
        <p>Geographically</p>
        <div className={classes.geo}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Geographically"
            variant="outlined"
            value={geographically}
            onChange={(event) => {
              setGeographically(event.target.value);
            }}
          />
        </div>
      </div>
      <div className={classes.formDiv}>
        <p>Interest types</p>
        <MultiSelect
          data={interestType}
          onChange={(e) => setInterest(e)}
          selectedValue={interest}
        />
      </div>
      <div className={classes.bottom}>
        <Button variant="contained" onClick={onClickIllumination}>Set Illumination</Button>
      </div>
    </div>
  );
}
