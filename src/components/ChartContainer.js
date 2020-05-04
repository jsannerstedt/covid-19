import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import charts from './charts';
import { Context } from '../regionStore';

export default ({ endpoint, description, title, chart }) => {
  const [disabled, setDisabled] = useState([]);
  const [data, setData] = useState();
  const [selected] = useContext(Context);
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
    fetch(endpoint)
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
    <Box mb={3} mt={3}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        maxHeight="800px"
      >
        <Box display="flex" flexWrap="wrap">
          {data
            .filter((d) => selected.includes(d.id))
            .map((d) => (
              <LegendItem
                key={d.id}
                {...d}
                onSelect={toggleId}
                disabled={disabled.includes(d.id)}
              />
            ))}
        </Box>

        <Box flex="1" height="0">
          <Chart
            {...chart.properties}
            data={data.filter(
              (d) => selected.includes(d.id) && !disabled.includes(d.id)
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
}));

function LegendItem({ id, color, onSelect, disabled }) {
  const classes = useStyles();
  return (
    <Button
      onClick={() => onSelect(id)}
      className={classes.button}
      color={disabled ? 'default' : 'primary'}
      size="small"
      startIcon={
        <Box
          height="16px"
          width="16px"
          borderRadius="999px"
          bgcolor={color}
          mr={0.5}
        />
      }
    >
      {id}
    </Button>
  );
}
