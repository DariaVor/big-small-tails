import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import NavBar from './ui/NavBar';
import { useAppSelector } from '../redux/hooks';
import Loader from './hocs/Loader';
import Notify from './ui/Notify';
// import AddPetForm from './ui/AddPetForm';
// import LostPetForm from './ui/LostPetForm';
// import FoundPetForm from './ui/FoundPetForm';

export default function Layout(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Loader isLoading={user.status === 'fetching'}>
        <>
          <NavBar />
          {/* <AddPetForm />
          <LostPetForm />
          <FoundPetForm /> */}
          <div className="relative">
            {transitions((style, item) => (
              <animated.div
                key={item.pathname}
                style={style}
                className="absolute w-full top-0 left-0"
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
