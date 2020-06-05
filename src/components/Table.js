import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sizeSmall: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
  },
}));

export default function DenseTable({ data = [] }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('region');
  const [meta = {}, ...values] = data;
  const { rows, columns } = map(values);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper>
      <Toolbar>
        <Typography variant="subtitle1">
          {meta.meta && meta.meta.title}
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <EnhancedTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <Body
            rows={stableSort(rows, getComparator(order, orderBy))}
            columns={columns}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
}

function EnhancedTableHead(props) {
  const classes = useStyles();
  const { columns, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            classes={classes}
            key={headCell.id}
            align={headCell.type === 'number' ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.heading}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Body({ columns, rows }) {
  const classes = useStyles();
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.region}>
          {columns.map((c, i) =>
            i === 0 ? (
              <TableCell
                component="th"
                scope="row"
                key={c.id}
                classes={classes}
              >
                {row[c.id]}
              </TableCell>
            ) : (
              <TableCell
                classes={classes}
                align={c.type === 'number' ? 'right' : 'left'}
                key={c.id}
              >
                {format(c, row)}
              </TableCell>
            )
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}

function format(cell, row) {
  // if (cell.type === 'date') {
  //   return row[cell.id].substring(2);
  // }
  return row[cell.id];
}

function map(data) {
  const [first] = data;

  if (!first) {
    return { columns: [], rows: [] };
  }

  const rows = data.map((d) => ({
    region: d.id,
    ...d.data.reduce((result, d) => Object.assign(result, { [d.x]: d.y }), {}),
  }));
  const columns = [
    { id: 'region', heading: 'Region', type: 'string' },
    ...first.data.map((d) => ({
      id: d.x,
      heading: d.x,
      type: d.type || 'string',
    })),
  ];
  return { columns, rows };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
