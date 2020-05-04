import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import FilterList from '@material-ui/icons/FilterList';
import RegionList from './RegionList';

function HideOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props) {
  const [open, setOpen] = useState();
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Box flexGrow={1}>
              <Typography variant="h6">Covid-19 statistik</Typography>
            </Box>
            <IconButton
              aria-label="FilterList"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpen(true)}
              color="inherit"
            >
              <FilterList />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <RegionList />
      </Drawer>
    </React.Fragment>
  );
}
