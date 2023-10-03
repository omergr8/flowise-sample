import { useState } from "react";
import classes from "./MultiSelect.module.css";
import clsx from "clsx";

export default function MultiSelect({ data, selectedValue, onChange }) {
  return (
    <div className={classes.main}>
      <div className={classes.box}>
        {data.map((int, i) => (
          <div
            key={i}
            className={clsx(
              classes.content,
              int.value === selectedValue && classes.active
            )}
            onClick={() => onChange(int.value)}
          >
            <p>{int.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
