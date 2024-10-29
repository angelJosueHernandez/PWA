import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrNext } from 'react-icons/gr';
import { MdNavigateNext, MdWifi, MdWifiOff } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-negro)' }}>
      <div style={{ marginRight: 'auto' }}> {/* Aumenta el espacio entre el breadcrumb y el indicador */}
        <Link
          className="pan3"
          style={{
            color: 'var(--color-negro)',
            fontSize: '20px',
            bottom: '90px',
          }}
          to="/"
        >
          <AiFillHome />
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <span key={name}>
              <span className="pan2">
                <GrNext />
              </span>
              {isLast ? (
                <span className="name-links-pan">{name}</span>
              ) : (
                <Link style={{ color: 'var(--color-primary)' }} to={routeTo}>
                  {name}
                </Link>
              )}
            </span>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', color: isOnline ? 'green' : 'red', fontSize: '22px' }}>
        {isOnline ? (
          <>
            <MdWifi />
            <span style={{ marginLeft: '25px', marginTop: '30px' }}></span>
          </>
        ) : (
          <>
            <MdWifiOff />
            <span style={{ marginLeft: '25px' }}> </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
