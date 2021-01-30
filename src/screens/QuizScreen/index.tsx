import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import db from '../../../db.json';
import Widget from '../../components/Widget';
import GitHubCorner from '../../components/GitHubCorner';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import QuizContainer from '../../components/QuizContainer';
import QuizButton from '../../components/QuizButton';
import AlternativesForm from '../../components/AlternativesForm';
import errorAnimation from './animation/14651-error-animation.json';
import okAnimation from './animation/33886-check-okey-done.json';

interface ResultProps {
  nota: number,
  passed: boolean
}

const ResultWidget = ({ nota, passed }: ResultProps) => {
  const router = useRouter();
  const { name } = router.query;

  const resultImage = passed ? db.resultImages.passed : db.resultImages.fail;
  return (
    <Widget>
      <Widget.Header>
        <h3>Resultado</h3>
      </Widget.Header>
      <img
        src={resultImage}
        alt="Descrição"
        style={{
          width: '100%',
          height: '15rem',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <p>
          {name}
          {' '}
          Sua nota é
          {' '}
          {nota}
        </p>
        {passed && (<p>Parabéns, você é um Azor Ahai ! </p>)}
        {!passed && (<p>O inverno está chegando para você ! </p>)}

        <Link href="/">
          <QuizButton>
            Reiniciar
          </QuizButton>
        </Link>
      </Widget.Content>
    </Widget>
  );
};

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
  onSubmit: () => void,
  addResult: (result: boolean) => void,
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
  addResult,
}: QuestionProps) => {
  const [selectedAlternative, setSelectedAlternative] = useState<number>(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState<boolean>(false);
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const questionId = `question__${questionIndex}`;
  const isCorrect: boolean = selectedAlternative === question.answer;

  const defaultErrorOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOkOptions = {
    loop: true,
    autoplay: true,
    animationData: okAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
          height: '11rem',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <h4>
          {question.title}
        </h4>
        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
          }, 2300);
        }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === index;
            return (
              <Widget.Topic
                as={motion.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  type="radio"
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(index)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          {!isQuestionSubmited && (
            <QuizButton
              as={motion.button}
              whileTap={{ scale: 0.9 }}
              type="submit"
              disabled={!hasAlternativeSelected}
            >
              Confirmar
            </QuizButton>
          )}
          {isQuestionSubmited && isCorrect && (
          <Lottie
            options={defaultOkOptions}
            height={80}
            width={80}
          />
          )}
          {isQuestionSubmited && !isCorrect && (
          <Lottie
            options={defaultErrorOptions}
            height={80}
            width={80}
          />
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};

interface QuizScreenProps {
  externalQuestions: Question[],
  externalBg: string
}

const QuizScreen = ({ externalQuestions, externalBg }: QuizScreenProps) => {
  const [screenState, setScreenState] = React.useState<ScreenState>(ScreenState.LOADING);
  const [results, setResults] = React.useState<Array<boolean>>([]);
  const [questionIndex, setQuestionIdex] = React.useState<number>(0);
  const [nota, setNota] = React.useState<number>(undefined);
  const [passed, setPassed] = React.useState<boolean>(undefined);
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const addResult = (result: boolean) => {
    setResults([
      ...results,
      result,
    ]);
  };
  useEffect(() => {
    setTimeout(() => {
      setScreenState(ScreenState.QUIZ);
    }, 3000);
  }, []);

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIdex(nextQuestion);
    } else {
      const soma = results.filter((result) => result)
        .reduce((somatoria, result) => somatoria + 1, 0);
      const isAprovado = soma >= 7;
      setNota(soma);
      setPassed(isAprovado);
      setScreenState(ScreenState.RESULT);
    }
  };

  return (
    <>
      <QuizBackground backgroundImage={externalBg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === ScreenState.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestion={externalQuestions.length}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
          )}
          {screenState === ScreenState.LOADING && <LoadingWidget />}
          {screenState === ScreenState.RESULT && <ResultWidget nota={nota} passed={passed} />}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/andysteel" />
      </QuizBackground>
    </>
  );
};

export default QuizScreen;
