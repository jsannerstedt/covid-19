import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import config from './config.json';
import Section from './components/Section';

function App() {
  return (
    <Container maxWidth="md" style={{ padding: 0 }}>
      <CssBaseline />
      {config.sections.map((s, i) => (
        <Section {...s} key={i} />
      ))}
    </Container>
  );
}

export default App;
