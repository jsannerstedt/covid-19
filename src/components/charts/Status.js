import React from 'react';
import { Bar } from '@nivo/bar';

const CustomBarComponent = ({ data, ...properties }) => {
  const width = 15;
  const height = 15;
  const props = { ...properties, width, height };

  if (data.id == 3) {
    return <Rect {...props} />;
  }
  return <Circle {...props} />;
};

function Circle({ x, y, width, height, color, ...props }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={Math.min(width, height) / 2}
      fill={color}
      {...props}
    />
  );
}

function Rect({ color, ...props }) {
  return <rect {...props} fill={color} />;
}

const commonProps = {
  width: 900,
  height: 500,
  margin: { top: 60, right: 80, bottom: 60, left: 80 },

  padding: 0.2,

  labelSkipWidth: 16,
  labelSkipHeight: 16,

  indexBy: 'region',
  minValue: 0,
  maxValue: 400,
  enableGridX: true,
  enableGridY: false,
  label: (d) => Math.abs(d.value),
  labelTextColor: 'inherit:darker(1.2)',
  axisBottom: {
    tickSize: 0,
    tickPadding: 12,
    tickRotation: 90,
  },
  axisLeft: null,
  axisRight: {
    format: (v) => `${Math.abs(v) - 200}%`,
  },
};

export default ({ data, ...properties }) => (
  <Bar
    data={data
      .map((d) => ({
        region: d.id,
        value: d.data.pop().y,
      }))
      .sort(compare)
      .map(getVal)}
    {...commonProps}
    {...properties}
    barComponent={CustomBarComponent}
    keys={['5', '4', '3', '2', '1']}
    groupMode="grouped"
    padding={0.1}
    colors={['#8b0000', '#f00', '#ff8c00', '#7cfc00', '#008000']}
    innerPadding={1}
  />
);

function getVal({ region, value }) {
  const prop = getProp(value);
  return {
    region,
    [prop]: value + 200,
  };
}

function getProp(val) {
  if (val > 50) {
    return '5';
  }
  if (val > 10) {
    return '4';
  }

  if (val < -50) {
    return '1';
  }
  if (val < -10) {
    return '2';
  }
  return '3';
}

function compare(a, b) {
  if (a.value > b.value) {
    return -1;
  }
  if (a.value < b.value) {
    return 1;
  }
  return 0;
}
