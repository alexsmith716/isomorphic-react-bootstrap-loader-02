// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import HomeSearch from './HomeSearch';

import css from './Home.scss';
import style from './style.css';

const HomeHeader = (props: { showHeaderText: true }) => (
  <Header className={style.colorMarginStyle}>
    {props.showHeaderText && (
      <HeaderText>
        Find the best jobs<br />at the best tech companies
      </HeaderText>
    )}
    <HomeSearch />
  </Header>
);

export default HomeHeader;

const Header = styled.div`
  max-width: 860px;
  margin: 0 auto 50px;
  padding: 80px 0 50px;
  line-height: 1.1;

  ${media.desktop`
    padding: 30px 24px;
  `};

  ${media.tablet`
    padding: 24px;
  `};
`;

const HeaderText = styled.h1`
  font-size: 52px;
  font-weight: 900;
  text-align: center;
  line-height: 1.2;
  font-family: ${props => props.theme.fontFamily.tiempos};
  margin-bottom: 40px;

  ${media.desktop`
    font-size: 40px;
  `};

  ${media.tablet`
    font-size: 36px;
  `};

  ${media.phablet`
    font-size: 30px;
  `};

  ${media.phone`
    font-size: 26px;
    text-align: left;
    margin: 15px auto 30px;
    line-height: 1.3;
  `};
`;
