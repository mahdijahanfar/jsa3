import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { wrapper } from "./ProgressBar.module.css"
export default function ProgressBar({ value, name, index }) {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className={wrapper} key={index}>


      <Box position="relative" display="inline-flex">
        <CircularProgress style={{ zIndex: 20 }} color='secondary' size={"10rem"} variant="determinate" value={progress} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <div>{`${value
            }%`}</div>
        </Box>
        <Box top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <CircularProgress color='primary' size={"10rem"} variant="determinate" value={100} />
        </Box>
      </Box>
      <p>{name}</p>
    </div>

  )
}