import { useState } from "react";
import classes from "./Banner.module.css";

export default function Banner({text}) {
  return (
    <div className={classes.main}>
      <div className='container'>
        <p>{text}</p>
      </div>
    </div>
  );
}
