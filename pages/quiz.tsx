import React, { useEffect } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizButton from '../src/components/QuizButton';

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      <h3>Carregando ...</h3>
    </Widget.Header>
    <img
      src="https://bestanimations.com/media/dragons/177297791dragon-animated-gif-57.gif"
      alt="Descrição"
      style={{
        width: '100%',
        height: '15rem',
        objectFit: 'cover',
      }}
    />
    <Widget.Content>
      <p>
        Fire and blood
      </p>
    </Widget.Content>
  </Widget>
);

interface Question {
  image: string,
  title: string,
  description: string,
  answer: number,
  alternatives: string[],
}
interface QuestionProps {
  question: Question,
  questionIndex: number,
  totalQuestion: number,
  onSubmit: () => void
}

enum ScreenState {
  LOADING = 'LOADING',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT'
}

const QuestionWidget = ({
  question,
  questionIndex,
  totalQuestion,
  onSubmit,
}: QuestionProps) => {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${questionIndex + 1} de ${totalQuestion}`}
        </h1>
      </Widget.Header>
      <img
        src={question.image}
        alt="Descrição"
        style={{
          width: '100%',
          height: '15rem',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <h4>
          {question.title}
        </h4>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  type="radio"
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <QuizButton type="submit">
            Confirmar
          </QuizButton>
        </form>
      </Widget.Content>
    </Widget>
  );
};

const Quiz = () => {
  const [screenState, setScreenState] = React.useState<ScreenState>(ScreenState.LOADING);
  const [questionIndex, setQuestionIdex] = React.useState<number>(0);
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;
  useEffect(() => {
    setTimeout(() => {
      setScreenState(ScreenState.QUIZ);
    }, 2500);
  }, []);

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIdex(nextQuestion);
    } else {
      setScreenState(ScreenState.RESULT);
    }
  };

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === ScreenState.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestion={db.questions.length}
            onSubmit={handleSubmit}
          />
          )}
          {screenState === ScreenState.LOADING && <LoadingWidget />}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/andysteel" />
      </QuizBackground>
    </>
  );
};

export default Quiz;
