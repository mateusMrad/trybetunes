import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import Carregando from './Carregando';

function Header() {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<UserType>();
  useEffect(() => {
    async function handleFetchGetUser() {
      setLoading(true);
      const result = await getUser();
      setUserName(result);
      setLoading(false);
    }
    handleFetchGetUser();
  }, []);

  return (
    <header data-testid="header-component">
      <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
      <h2 data-testid="header-user-name">{userName?.name}</h2>
      { loading && <Carregando /> }
    </header>
  );
}

export default Header;
