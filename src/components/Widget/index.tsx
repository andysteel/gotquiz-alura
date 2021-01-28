import styled from 'styled-components';

const Widget: any = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
  h1 {
    font-size: 1.7em;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 1em;
    font-weight: 400;
    line-height: 1;
  }
  span {
    font-size: 0.7em;
    color: ${({ theme }) => theme.colors.contrastText};
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
    padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
    }
  & > *:last-child {
    margin-bottom: 0;
    }
    ul {
    list-style: none;
    padding: 0;
    }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
  
  &:hover,
  &:focus {
    opacity: .5;
  }
`;

export default Widget;
