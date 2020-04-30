import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
//import data from '../data/top';
import charts from './charts';

export default ({ endpoint, description, title, chart }) => {
  const [disabled, setDisabled] = useState([]);
  const [data, setData] = useState();
  const Chart = charts[chart.type];

  const toggleId = (id) => {
    if (disabled.includes(id)) {
      setDisabled(disabled.filter((d) => d !== id));
    } else {
      setDisabled([...disabled, id]);
    }
  };

  useEffect(() => {
    if (!endpoint) {
      return;
    }
    fetch(endpoint, {
      mode: 'no-cors', // no-cors, *cors, same-origin
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => {
        console.log(err);
      });
  }, [endpoint]);

  if (!data) {
    return '.... loading';
  }

  return (
    <div style={{ scrollSnapAlign: 'center' }}>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        maxHeight="800px"
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <Box display="flex" flexWrap="wrap">
          {data.map((d) => (
            <LegendItem
              key={d.id}
              {...d}
              onSelect={toggleId}
              selected={disabled.includes(d.id)}
            />
          ))}
        </Box>

        <Box flex="1" height="0">
          <Chart
            {...chart.properties}
            data={data.filter((d) => !disabled.includes(d.id))}
          />
        </Box>
      </Box>
    </div>
  );
};

function LegendItem({ id, color, onSelect, selected }) {
  return (
    <Button onClick={() => onSelect(id)}>
      <Box display="flex" mr={2} alignItems="center">
        <Box
          height="16px"
          width="16px"
          borderRadius="999px"
          bgcolor={color}
          mr={0.5}
        />
        <Typography color={selected ? 'textSecondary' : 'textPrimary'}>
          {id}
        </Typography>
      </Box>
    </Button>
  );
}
