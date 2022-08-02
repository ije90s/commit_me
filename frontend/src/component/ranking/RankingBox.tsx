import React from 'react';
import styled from 'styled-components';

const RankingBox = () => {
  return (
    <Box>
      <div className='text_left'>
        <h6>1.</h6>
        <div className='circle'></div> <p className='user_id_text'>jieun246</p>
        <p className='number_text'>(100)</p>
      </div>
      <p className='text_right'>☺︎</p>
    </Box>
  );
};

export default RankingBox;

const Box = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2rem;
  border-radius: 0.8rem;
  padding: 1rem 2rem;
  margin: 1rem 0;
  .text_left {
    display: flex;
    align-items: center;
  }
  h6 {
    font-weight: bold;
    margin-right: 1.5rem;
  }
  .text_right {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.blue_1};
  }
  .circle {
    background-color: ${props => props.theme.colors.gray_1};
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    margin-right: 2rem;
  }
  .user_id_text {
    margin-right: 0.8rem;
  }
  .number_text {
    color: ${props => props.theme.colors.gray_2};
    font-size: 1.3rem;
  }
`;
