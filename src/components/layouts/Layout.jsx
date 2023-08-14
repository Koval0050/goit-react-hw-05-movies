import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledLink = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &.active {
    color: white;
    background-color: orangered;
  }
`;

const Layout = () => {
  return (
    <div className="main">
      <div className="navigation">
        <StyledLink to="/"> Home</StyledLink>
        <StyledLink to="movies">Movies</StyledLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
