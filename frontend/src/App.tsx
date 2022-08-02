import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './utils/style/GlobalStyle';
import { theme } from './utils/style/theme';
import Weekly from './component/Weekly';
import Header from './component/Header';
import Footer from '@/component/footer';
import RankingView from '@/component/ranking';
import Title from '@/component/Title';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainContainer>
        <Header>commit, ME!</Header>
        <div>
          <article>
            <Title>출석 체크</Title>
            <Weekly />
          </article>
        </div>
        <div className='gray_article'>
          <article className='gray_article'>
            <RankingView />
          </article>
        </div>
        <div>
          <article>
            <Title>댓글</Title>
          </article>
        </div>
        <Footer />
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;

const MainContainer = styled.div`
  /* background-color: red; */

  article {
    margin: 0 auto;
    width: 120rem;
    padding: 1rem 2rem;
  }
  .gray_article {
    background-color: ${props => props.theme.colors.gray_1};
  }
`;
