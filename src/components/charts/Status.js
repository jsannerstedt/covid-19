import React from 'react';
import { Bar } from '@nivo/bar';

const CustomBarComponent = ({
  color,
  data,
  onClick,
  onMouseEnter,
  onMouseLeave,
  x,
  y,
}) => {
  const width = 15;
  const height = 15;
  const props = {
    color,
    onClick,
    onMouseEnter,
    onMouseLeave,
    width,
    height,
    x,
    y,
  };

  if (data.id == 4 || data.id == 5) {
    return <Triangle {...props} />;
  }

  if (data.id == 3) {
    return <Rect {...props} />;
  }

  if (data.id == 2 || data.id == 1) {
    return <Triangle {...props} dir="down" />;
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

function Triangle({ color, height, width, x, y, dir = 'up', ...props }) {
  const points =
    dir === 'up'
      ? `0,${height} ${width},${height} ${width / 2},0`
      : `0,0 ${width},0 ${width / 2},${height}`;
  return (
    <g transform={`translate(${x},${y})`}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
        <polygon
          points={points}
          strokeWidth={2}
          stroke={color}
          fill={color}
          {...props}
        />
      </svg>
    </g>
  );
}

const commonProps = {
  width: 900,
  height: 500,
  margin: { top: 60, right: 80, bottom: 60, left: 10 },

  padding: 0.2,

  labelSkipWidth: 16,
  labelSkipHeight: 16,

  indexBy: 'region',
  minValue: 0,
  maxValue: 400,
  enableGridX: true,
  enableGridY: true,
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

export default ({ data, ...properties }) => {
  const mapped = data
    .map((d) => ({
      region: d.id,
      value: d.data.pop().y,
    }))
    .sort(compare);
  const marker = mapped.find((m) => m.region === 'Sverige');
  return (
    <Bar
      data={mapped.filter((m) => m.region !== 'Sverige').map(getVal)}
      {...commonProps}
      {...properties}
      barComponent={CustomBarComponent}
      keys={['5', '4', '3', '2', '1']}
      groupMode="grouped"
      padding={0.1}
      colors={['#8b0000', '#f00', '#ff8c00', '#7cfc00', '#008000']}
      innerPadding={1}
      layers={['grid', 'axes', 'markers', 'bars', 'legends', 'annotations']}
      markers={
        marker && [
          {
            axis: 'y',
            value: marker.value + 200,
            lineStyle: { stroke: 'blue', strokeDasharray: 10, strokeWidth: 4 },
            legend: `Sverige ${marker.value}%`,
          },
        ]
      }
    />
  );
};

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
