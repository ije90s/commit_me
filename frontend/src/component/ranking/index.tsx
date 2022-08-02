import React from 'react';
import styled from 'styled-components';
import ButtonRectang from '../button/ButtonRectang';
import RankingBox from './RankingBox';
import { attendanceApi } from '@/api/config';

import Title from '@/component/Title';

const RankingView = () => {
  const handleAttendanceClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await attendanceApi();
  };

  const handleCommitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await console.log('commit');
  };
  return (
    <Container>
      <div className='top_section'>
        <Title style={{ marginTop: '0', marginLeft: '0' }}>랭킹</Title>
        <div className='button_wrap'>
          <ButtonRectang color='#fff' onClick={handleAttendanceClick}>
            출석
          </ButtonRectang>
          <ButtonRectang onClick={handleCommitClick}>커밋</ButtonRectang>
          <ButtonRectang>풀리퀘스트</ButtonRectang>
          <ButtonRectang>댓글</ButtonRectang>
        </div>
      </div>
      <div>
        <RankingBox />
        <RankingBox />
        <RankingBox />
        <RankingBox />
      </div>
    </Container>
  );
};

export default RankingView;

const Container = styled.div`
  /* background-color: ${props => props.theme.colors.gray_1}; */
  padding: 2rem 2rem;

  .top_section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: red; */
  }
  .button_wrap {
    text-align: right;
  }
`;
