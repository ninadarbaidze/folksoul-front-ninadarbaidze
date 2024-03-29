import React, { useState } from 'react';
import { ContextData, Children } from 'types';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
  refreshMembers: () => {},
  memberIsEdited: false,
  refreshSocials: () => {},
  socialIsEdited: false,
  refreshBand: () => {},
  bandIsEdited: false,
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  return storedToken;
};

export const AuthContextProvider: React.FC<Children> = (props) => {
  const tokenData = retrieveStoredToken();
  const [memberIsEdited, setMemberIsEdited] = useState<boolean>(false);
  const [socialIsEdited, setSocialIsEdited] = useState<boolean>(false);
  const [bandIsEdited, setBandIsEdited] = useState<boolean>(false);

  let initialToken;
  if (tokenData) {
    initialToken = tokenData;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const refreshMembers = () => {
    setMemberIsEdited(!memberIsEdited);
  };

  const refreshSocials = () => {
    setSocialIsEdited(!socialIsEdited);
  };
  const refreshBand = () => {
    setBandIsEdited(!bandIsEdited);
  };

  const contextValue: ContextData = {
    token: token!,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    refreshMembers: refreshMembers,
    memberIsEdited: memberIsEdited,
    refreshSocials: refreshSocials,
    socialIsEdited: socialIsEdited,
    refreshBand: refreshBand,
    bandIsEdited: bandIsEdited,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
