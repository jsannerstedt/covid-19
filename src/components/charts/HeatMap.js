import React from 'react';
import { HeatMap } from '@nivo/heatmap';
import { getColor } from '../../utils/status';
/*
const HeatMapCellRect = ({
  data,
  value,
  x,
  y,
  width,
  height,
  color,
  opacity,
  borderWidth,
  borderColor,
  enableLabel,
  textColor,
  onHover,
  onLeave,
  onClick,
  theme,
}) => (
  <g
    transform={`translate(${x}, ${y})`}
    onMouseEnter={onHover}
    onMouseMove={onHover}
    onMouseLeave={onLeave}
    onClick={(e) => {
      onClick(data, e);
    }}
    style={{ cursor: 'pointer' }}
  >
    <rect
      x={width * -0.5}
      y={height * -0.5}
      width={width}
      height={height}
      fill={getColor(value)}
      fillOpacity={opacity}
      strokeWidth={borderWidth}
      stroke={borderColor}
      strokeOpacity={opacity}
    />
    {enableLabel && (
      <text
        dominantBaseline="central"
        textAnchor="middle"
        style={{
          ...theme.labels.text,
          fill: textColor,
        }}
        fillOpacity={opacity}
      >
        {value}
      </text>
    )}
  </g>
);
*/

export default ({ data, ...properties }) => {
  const map = data.map(({ id, data }) => ({
    id,
    ...data.reduce(
      (obj, d) => ({ ...obj, [d.x]: d.y, [`${d.x}Color`]: getColor(d.y) }),
      {}
    ),
  }));

  const keys = data.length > 0 ? data[0].data.map((d) => d.x) : [];

  return (
    <HeatMap
      data={map}
      keys={keys}
      colors="oranges"
      indexBy="id"
      margin={{ top: 100, right: 20, bottom: 60, left: 100 }}
      axisTop={{
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        legend: '',
        legendOffset: 36,
      }}
      axisRight={null}
      axisBottom={null}
      axisTop={{
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 36,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      {...properties}
    />
  );
};
