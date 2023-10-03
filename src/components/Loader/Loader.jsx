import React, { useState } from 'react';
import classes from "./Loader.module.css"
import CircularProgress from '@mui/material/CircularProgress';

function Loader({isLoading, setIsLoading}) {


  return (
    <div>
      {isLoading && (
        <div className={classes.loaderOverlay}>
           <CircularProgress />
        </div>
      )}
      {/* Your main content */}
    </div>
  );
}

export default Loader;
