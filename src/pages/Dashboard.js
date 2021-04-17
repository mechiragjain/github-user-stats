import React from 'react';
import { Info, Repos, User, Search, Navbar, FooterBar } from '../components';
const Dashboard = () => {
  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos />
      <FooterBar />
    </main>
  );
};

export default Dashboard;
