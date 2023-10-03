import { useState } from "react";
import classes from "./Profile.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

export default function Profile(props) {
  const {
    age,
    setAge,
    home,
    setHome,
    gender,
    setGender,
    interest,
    setInterest,
  } = props;

  return (
    <div className={classes.main}>
      <div>
        <Banner
          text="Information about you will refine notifications.
​​​​​​​All data stays on your devise and is never shared. "
        />
      </div>
      <div className={classes.formDiv}>
        <p>Age Group</p>
        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            label="Age"
            onChange={(e) => setAge(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"under 14"}>Under 14</MenuItem>
            <MenuItem value={"14-21"}>14 - 21</MenuItem>
            <MenuItem value={"22-35"}>22 - 35</MenuItem>
            <MenuItem value={"35-55"}>35 - 55</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.formDiv}>
        <p>Where is home?</p>
        <div className={classes.profile}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Home"
            variant="outlined"
            value={home}
            onChange={(event) => {
              setHome(event.target.value);
            }}
          />
        </div>
      </div>
      <div className={classes.formDiv}>
        <p>Gender</p>
        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.formDiv}>
        <p>Interest types</p>
        <MultiSelect
          data={interestType}
          onChange={(e) => setInterest(e)}
          selectedValue={interest}
        />
      </div>
    </div>
  );
}
