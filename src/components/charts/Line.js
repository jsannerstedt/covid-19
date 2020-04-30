import React from 'react';
import { Line } from '@nivo/line';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AutoSizer from 'react-virtualized-auto-sizer';

const commonProperties = {
  width: 900,
  height: 400,
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
  animate: true,
  enableSlices: 'x',
};

export default ({ data, ...properties }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const margin = matches ? { right: 110, left: 60 } : { right: 10, left: 40 };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Line
          {...commonProperties}
          data={data}
          margin={{ top: 10, bottom: 30, ...margin }}
          colors={(d) => d.color}
          height={height}
          width={width}
          {...properties}
        />
      )}
    </AutoSizer>
  );
};
