import { useState, useContext } from 'react';
import { Login, Dashboard, Main, BandMembers, AboutBand, Socials } from 'pages';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthContext from 'store/AuthContext';

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route
          path='dashoboard'
          element={
            authCtx.isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate replace to='/login' />
            )
          }
        >
          <Route path='main' element={<Main />} />

          <Route path='band-members' element={<BandMembers />} />
          <Route path='socials' element={<Socials />} />
          <Route path='about-band' element={<AboutBand />} />
          {/* <Route path='logout' element={<ByCountry />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
