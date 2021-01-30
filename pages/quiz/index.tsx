import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/QuizScreen';
import db from '../../db.json';

const Quiz = () => (
  <ThemeProvider theme={db.theme}>
    <QuizScreen
      externalQuestions={db.questions}
      externalBg={db.bg}
    />
  </ThemeProvider>
);

export default Quiz;
