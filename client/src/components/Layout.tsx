import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import NavBar from './ui/NavBar';
import { useAppSelector } from '../redux/hooks';
import Loader from './hocs/Loader2';
import Notify from './ui/Notify';

export default function Layout(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
  });

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);
  // }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Loader isLoading={user.status === 'fetching'}>
        <>
          <NavBar />
          <div className="relative flex-1">
            {transitions((style, item) => (
              <animated.div
                key={item.pathname}
                style={style}
                className="absolute top-0 left-0 w-full"
              >
                <Outlet />
              </animated.div>
            ))}
          </div>
        </>
      </Loader>
      <Notify />
    </div>
  );
}
