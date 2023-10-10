import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from "@mui/material/Box";

import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile";
import Notices from "./components/Notices/Notices";
import Loader from "../../components/Loader/Loader";

import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const getCurrentDate = () => {
  // Create a new Date object
  const currentDate = new Date();

  // Get the current date
  const year = currentDate.getFullYear(); // Full year (e.g., 2023)
  const month = currentDate.getMonth() + 1; // Month (0-11, so add 1 for January to December)
  const day = currentDate.getDate(); // Day of the month (1-31)

  // Get the current time
  const hours = currentDate.getHours(); // Hours (0-23)
  const minutes = currentDate.getMinutes(); // Minutes (0-59)
  const seconds = currentDate.getSeconds(); // Seconds (0-59)

  // Create a formatted date and time string
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

//Indexed db config
const dbName = "apiResponses";
const storeName = "responses";

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, { autoIncrement: true });
  }
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [fashion, setFashion] = useState("");
  const [geographically, setGeographically] = useState("");
  const [interest, setInterest] = useState("");
  const [age, setAge] = useState("");
  const [home, setHome] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function areAllFieldsNotEmpty(interest, age, home, gender) {
    return interest !== "" && age !== "" && home !== "" && gender !== "";
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const setIllumination = async () => {
    const allFieldsNotEmpty = areAllFieldsNotEmpty(interest, age, home, gender);
    setIsLoading(true);
    console.log("test", getCurrentDate());
    if (allFieldsNotEmpty) {
      try {
        const response = await axios.post(
          "https://flowise-prod-1flv.onrender.com/api/v1/prediction/d3d7e9f0-489b-4638-bc51-beee1252da30",
          {
            question: `{location} = ${home} {TimeDate} = ${getCurrentDate()} {topic} = ${interest} {profile} = ${gender} of ${age} years of age`,
            // Add any other data you want to send in the request body
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const entries = response.data.split(/Title: /);
        const db = request.result;
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);

        // Save the API response as a record in IndexedDB
        objectStore.add({
          response: entries,
          interest: interest,
          home: home,
          date: getCurrentDate(),
        });
        setIsLoading(false);
        setValue(2);
      } catch (error) {
        setIsLoading(false);
        console.error("API Error:", error);
      }
    }else{
        setIsLoading(false)
        setOpen(true)
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Please fill in all required data
        </Alert>
      </Snackbar>
      <Box
        sx={{ bgcolor: "background.paper", width: "100%", textAlign: "left" }}
      >
        <AppBar position="static" color="secondary">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            centered
          >
            <Tab icon={<SettingsIcon />} label="SETTINGS" {...a11yProps(0)} />
            <Tab icon={<AccountCircleIcon />} label="YOU" {...a11yProps(1)} />
            <Tab icon={<EventIcon />} label="NOTICES" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Settings
              fashion={fashion}
              setFashion={setFashion}
              geographically={geographically}
              setGeographically={setGeographically}
              interest={interest}
              setInterest={setInterest}
              onClickIllumination={setIllumination}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Profile
              age={age}
              setAge={setAge}
              home={home}
              setHome={setHome}
              gender={gender}
              setGender={setGender}
              interest={interest}
              setInterest={setInterest}
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Notices />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
}
