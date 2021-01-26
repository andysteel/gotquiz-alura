import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import HeadSection  from '../src/components/HeadSection'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 5px;
    margin-top: 10rem;
  }
  @media screen and (min-width: 501px) {
    padding: 5px;
    margin-top: 10rem;
  }
`;

const Home = () => {
  return (
    <>
    <HeadSection />
    <QuizBackground backgroundImage={db.bg}> 
      <QuizContainer>
        <Widget>
          <Widget.Header>
          <h1>Game of Thrones</h1>
          </Widget.Header>
          <Widget.Content>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
          <p>Quizes da Galera</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/andysteel"/>
    </QuizBackground>
    </>
  )
}

export default Home;