import React, { useEffect, useState } from 'react';
import { CssBaseline, Container } from '@material-ui/core';
//import config from './config.json';
import Section from './components/Section';
import AppBar from './components/AppBar';
import Store from './regionStore';

function App() {
  const [config, setConfig] = useState();
  useEffect(() => {
    fetch('config.json')
      .then((res) => res.json())
      .then((c) => setConfig(c))
      .catch(() => {
        console.log('Error parsing config.json');
      });
  }, []);

  if (!config) {
    return '... loading';
  }

  return (
    <Store>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="md" style={{ padding: 0 }}>
        {config.sections.map((s, i) => (
          <Section {...s} key={i} />
        ))}
      </Container>
    </Store>
  );
}

export default App;
