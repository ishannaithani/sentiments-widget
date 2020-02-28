import React from 'react';
import { AppWrapper } from './components/wrapper';
import { Emoji } from './components/emoji';
import './styles/app.scss';

function App() {
  return (
    <AppWrapper>
      <Emoji />
    </AppWrapper>
  );
}

export default App;
