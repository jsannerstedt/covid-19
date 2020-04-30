import colors from './colors';

export default [
  {
    id: 'japan',
    color: 'hsl(322, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 279,
      },
      {
        x: 'helicopter',
        y: 91,
      },
      {
        x: 'boat',
        y: 8,
      },
      {
        x: 'train',
        y: 188,
      },
      {
        x: 'subway',
        y: 100,
      },
      {
        x: 'bus',
        y: 213,
      },
      {
        x: 'car',
        y: 244,
      },
      {
        x: 'moto',
        y: 290,
      },
      {
        x: 'bicycle',
        y: 49,
      },
      {
        x: 'horse',
        y: 45,
      },
      {
        x: 'skateboard',
        y: 48,
      },
      {
        x: 'others',
        y: 78,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(296, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 204,
      },
      {
        x: 'helicopter',
        y: 236,
      },
      {
        x: 'boat',
        y: 150,
      },
      {
        x: 'train',
        y: 18,
      },
      {
        x: 'subway',
        y: 75,
      },
      {
        x: 'bus',
        y: 247,
      },
      {
        x: 'car',
        y: 119,
      },
      {
        x: 'moto',
        y: 42,
      },
      {
        x: 'bicycle',
        y: 109,
      },
      {
        x: 'horse',
        y: 148,
      },
      {
        x: 'skateboard',
        y: 275,
      },
      {
        x: 'others',
        y: 142,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(119, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 59,
      },
      {
        x: 'helicopter',
        y: 257,
      },
      {
        x: 'boat',
        y: 259,
      },
      {
        x: 'train',
        y: 109,
      },
      {
        x: 'subway',
        y: 289,
      },
      {
        x: 'bus',
        y: 127,
      },
      {
        x: 'car',
        y: 22,
      },
      {
        x: 'moto',
        y: 49,
      },
      {
        x: 'bicycle',
        y: 250,
      },
      {
        x: 'horse',
        y: 20,
      },
      {
        x: 'skateboard',
        y: 22,
      },
      {
        x: 'others',
        y: 67,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(202, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 121,
      },
      {
        x: 'helicopter',
        y: 226,
      },
      {
        x: 'boat',
        y: 202,
      },
      {
        x: 'train',
        y: 292,
      },
      {
        x: 'subway',
        y: 115,
      },
      {
        x: 'bus',
        y: 31,
      },
      {
        x: 'car',
        y: 215,
      },
      {
        x: 'moto',
        y: 76,
      },
      {
        x: 'bicycle',
        y: 263,
      },
      {
        x: 'horse',
        y: 56,
      },
      {
        x: 'skateboard',
        y: 9,
      },
      {
        x: 'others',
        y: 132,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(107, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 97,
      },
      {
        x: 'helicopter',
        y: 190,
      },
      {
        x: 'boat',
        y: 85,
      },
      {
        x: 'train',
        y: 219,
      },
      {
        x: 'subway',
        y: 256,
      },
      {
        x: 'bus',
        y: 255,
      },
      {
        x: 'car',
        y: 129,
      },
      {
        x: 'moto',
        y: 66,
      },
      {
        x: 'bicycle',
        y: 44,
      },
      {
        x: 'horse',
        y: 34,
      },
      {
        x: 'skateboard',
        y: 91,
      },
      {
        x: 'others',
        y: 121,
      },
    ],
  },
].map((d, i) => ({ ...d, color: colors[i] }));
