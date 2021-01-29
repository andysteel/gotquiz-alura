import styled from 'styled-components';

const QuizButton = styled.button`
background: ${({ theme, disabled }) => (disabled ? theme.colors.primary : theme.colors.secondary)};
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
border-radius: 4px;
height: 3em;
color: ${({ theme }) => theme.colors.contrastText};
width: 100%;
margin-top: 1em;
font-family: 'Cinzel Decorative', cursive;
`;

export default QuizButton;
