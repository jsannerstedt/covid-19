import React from 'react';
import { Line } from '@nivo/line';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default ({ data, ...properties }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const margin = matches ? { right: 110, left: 60 } : { right: 10, left: 40 };

  return (
    <Line
      data={data}
      margin={{ top: 10, bottom: 30, ...margin }}
      colors={(d) => d.color}
      {...properties}
    />
  );
};
