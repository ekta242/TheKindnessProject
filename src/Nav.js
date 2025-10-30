import React from 'react';

function Nav({ current, setCurrent }) {
 const pages = ['Today', 'Points', 'Bridge'];
  return (
    <nav className="nav-bar">
      {pages.map((item) => (
        <button
          key={item}
          className={current === item ? 'nav-button active' : 'nav-button'}
          onClick={() => setCurrent(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}


export default Nav;
