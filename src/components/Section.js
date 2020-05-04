import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Box, Typography } from '@material-ui/core';
import Chart from './ChartContainer';

export default ({ charts, text }) => {
  return (
    <Box mt={3} mb={5}>
      <Markdown
        options={{
          overrides: {
            h1: {
              component: Typography,
              props: {
                variant: 'h5',
              },
            },
            p: Typography,
          },
        }}
      >
        {text}
      </Markdown>
      {charts && charts.map((c, i) => <Chart {...c} key={i} />)}
    </Box>
  );
};
