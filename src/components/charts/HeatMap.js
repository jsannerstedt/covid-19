import React from 'react';
import { HeatMap } from '@nivo/heatmap';

export default ({ data, ...properties }) => {
  const map = data.map(({ id, data }) => ({
    id,
    ...data.reduce(
      (obj, d) => ({ ...obj, [d.x]: d.y, [`${d.x}Color`]: getColor(d.y) }),
      {}
    ),
  }));
  console.log(map);

  const keys = data.length > 0 ? data[0].data.map((d) => d.x) : [];

  return (
    <HeatMap
      data={map}
      keys={keys}
      indexBy="id"
      margin={{ top: 100, right: 20, bottom: 60, left: 100 }}
      colors="reds"
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

function getColor() {
  const colors = ['#8b0000', '#f00', '#ff8c00', '#7cfc00', '#008000'];
  return '#fff';
}
