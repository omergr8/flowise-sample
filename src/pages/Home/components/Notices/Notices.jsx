import { useState, useEffect } from "react";
import classes from "./Notices.module.css";
//import Accordion from "@mui/material/Accordion";
//import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
//custom
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { formatDate, formatTime, getDaySuffix } from "../../../../utils/helper";

import clsx from "clsx";
import Banner from "../../../../components/Banner/Banner";

// Function to retrieve data from the IndexedDB object store
const dbName = "apiResponses";
const storeName = "responses";
// Function to retrieve data from the IndexedDB object store
const getStoredResponses = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);
      const storedData = [];

      objectStore.openCursor().onsuccess = (cursorEvent) => {
        const cursor = cursorEvent.target.result;

        if (cursor) {
          // Retrieve both response and interest from the stored data
          const { response, interest, date, home } = cursor.value;
          storedData.push({ response, interest, date, home });
          cursor.continue();
        } else {
          resolve(storedData);
        }
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onerror = (error) => {
      reject(error);
    };
  });
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme, expanded, panel }) => ({
  backgroundColor: expanded === panel ? "#E6E6E6" : "transparent",
  minHeight: "55px",
  color: "#1468A0",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    display: expanded === panel ? "none" : "block",
  },
  //   flexDirection: "row-reverse",
  //   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
  //     transform: "rotate(90deg)",
  //   },
  //   "& .MuiAccordionSummary-content": {
  //     marginLeft: theme.spacing(1),
  //   },
}));

export default function Notices() {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    // Example usage:
    getStoredResponses().then((responses) => {
      console.log("Stored Responses:", responses);
      setData(responses);
    });
  }, []);

  return (
    <div className={classes.main}>
      <Banner
        text="Here is a list of previous notices. 
          "
      />
      <div className={classes.accordionMain}>
        {data.length > 0 &&
          data.sort((a, b) => new Date(b.date) - new Date(a.date)).map((el, i) => (
            <div key={i}>
              <Accordion
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
              >
                <AccordionSummary
                  expandIcon={<AddIcon sx={{ color: "#1468A0" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  expanded={expanded}
                  panel={`panel${i}`}
                >
                  <Typography>{el.home} - {formatDate(el.date)} - {formatTime(el.date)}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  {el.response.map((entry, index) => {
                    // Skip the first entry which is an empty string
                    if (index === 0) return null;

                    // Split each entry into "Title" and "Description" parts
                    const [title, description] = entry.split(/Description: /);

                    return (
                      <div key={index}>
                         <h2>{title}</h2>
                         <p>Description: {description}</p>
                      </div>
                    );
                  })}
                  <div className={classes.footer}>
                    <div className={classes.footerContent}>
                        <div className={classes.pills}>
                            {el.interest}
                        </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}

        {/* <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<AddIcon sx={{ color: "#1468A0" }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            expanded={expanded}
            panel={"panel2"}
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
    </div>
  );
}
