import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrNext } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import './Breadcrumbs.css'
import { AiFillHome } from "react-icons/ai";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div  style={{color: 'var(--color-negro)',}}>
      <Link  className='pan3' style={{color: 'var(--color-negro)',fontSize: '20px',bottom:'90px'}} to="/"><AiFillHome /></Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name}>
            <span className='pan2'><GrNext/></span>
            {isLast ? (
              <span className='name-links-pan'>{name}</span>
            ) : (
              <Link style={{color: 'var(--color-primary)'}} to={routeTo}>{name}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
