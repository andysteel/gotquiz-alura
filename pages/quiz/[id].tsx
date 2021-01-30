import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/QuizScreen';

interface Props {
  dbExterno: any
}

const QuizDaGalera = ({ dbExterno }: Props) => (
  <ThemeProvider theme={dbExterno?.theme}>
    <QuizScreen
      externalQuestions={dbExterno?.questions}
      externalBg={dbExterno?.bg}
    />
  </ThemeProvider>
);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const param: string = context.query.id as string;
  const [projectName, githubUser] = param.split('___');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((response) => response.json()
      .then((json) => json))
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      dbExterno,
    },
  };
};

export default QuizDaGalera;
