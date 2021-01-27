import styled from 'styled-components';

interface BackGroundProps {
  backgroundImage: string
}

const QuizBackground = styled.div<BackGroundProps>`
width: 100%;
background-size: cover;
background-position: center;
background-image: url(${({ backgroundImage }) => backgroundImage});
background-color: ${({ theme }) => theme.colors.background};
flex: 1;
@media screen and (max-width: 500px) {
  background-image: none;
  &:after {
    content: "";
    background-size: contain;
  background-repeat: no-repeat;
    background-image:
      linear-gradient(transparent, ${({ theme }) => theme.colors.background}),
      url(${({ backgroundImage }) => backgroundImage});
    display: block;
    width: 100%;
    height: 210px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  *:first-child {
    position: relative;
    z-index: 10;
  }
}
`;

export default QuizBackground;
