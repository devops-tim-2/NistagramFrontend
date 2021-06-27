import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg  navbar-light bg-white">
        <Link id="logo" className="navbar-brand" to="/">
          Nistagram
        </Link>
    </nav>
  );
}

export default NavBar;