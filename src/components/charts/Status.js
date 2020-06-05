import React from 'react';
import { Bar } from '@nivo/bar';
import { colors, getProp } from '../../utils/status';
import regions from '../../regions';

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
    x: x, //   + width / 2 // for desktop,
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
  return <rect {...props} y={props.y - props.height / 2} fill={color} />;
}

function Triangle({ color, height, width, x, y: origY, dir = 'up', ...props }) {
  const y = origY + height / 2;
  const points =
    dir === 'up'
      ? `${x},${y} ${x + width},${y} ${x + width / 2},${y - height}`
      : `${x},${y - height} ${x + width},${y - height} ${x + width / 2},${y}`;
  return (
    <polygon
      {...props}
      points={points}
      strokeWidth={1}
      stroke={color}
      fill={color}
    />
  );
}

const commonProps = {
  width: 900,
  height: 500,
  margin: { top: 10, right: 50, bottom: 100, left: 10 },

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
    tickRotation: -90,
  },
  axisLeft: null,
  axisRight: {
    format: (v) => `${Math.abs(v) - 200}%`,
  },
};

export default ({ data, width, height, ...properties }) => {
  const mapped = data
    .map((d) => ({
      region: d.id,
      value: d.data.pop().y,
    }))
    .sort(compare);
  const marker = mapped.find((m) => m.region === 'Sverige');
  return (
    <div style={{ transform: 'rotate(90deg)', width: `${width}px` }}>
      <Bar
        data={mapped.filter((m) => m.region !== 'Sverige').map(getVal)}
        {...commonProps}
        {...properties}
        width={height}
        height={width}
        barComponent={CustomBarComponent}
        keys={['5', '4', '3', '2', '1']}
        colors={colors}
        innerPadding={1}
        layers={['grid', 'axes', 'markers', 'bars', 'legends', 'annotations']}
        markers={
          marker && [
            {
              axis: 'y',
              value: marker.value + 200,
              lineStyle: {
                stroke: 'blue',
                strokeDasharray: 10,
                strokeWidth: 4,
              },
              legend: `Sverige ${marker.value}%`,
            },
          ]
        }
      />
    </div>
  );
};

function getVal({ region, value }) {
  const prop = getProp(value);
  return {
    region,
    [prop]: value + 200,
  };
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
