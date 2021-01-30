import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
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
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <p>Quizes da Galera</p>
              <span>
                Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React/NextJS fez:
              </span>
              {db.external.map((external, index) => {
                const [projectName, githubUser] = external.replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <Link
                    key={`external__${index}`}
                    href={`/quiz/${projectName}___${githubUser}`}
                  >
                    <Widget.Topic>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </Link>
                );
              })}
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
