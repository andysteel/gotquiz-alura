import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizButton from '../src/components/QuizButton';

const InputPlayer = styled.input`
  background: ${db.theme.colors.background};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: 3em;
  color: ${db.theme.colors.contrastText};
  padding: 10px;
`;

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>Game of Thrones</h1>
            </Widget.Header>
            <Widget.Content>
              <form onSubmit={(e) => {
                e.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
              >
                <InputPlayer
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="  Informe o seu nome"
                />
                <QuizButton type="submit" disabled={name.length === 0}>
                  Jogar
                </QuizButton>
              </form>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Content>
              <p>Quizes da Galera</p>
              <span>
                Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React/NextJS fez:
              </span>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/andysteel" />
      </QuizBackground>
    </>
  );
};

export default Home;
