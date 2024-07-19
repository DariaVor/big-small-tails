// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { resetNotify } from '../../redux/slices/notifySlice';

const AUTO_CLOSE_DURATION = 5000;

export default function Notify(): JSX.Element {
  const notify = useAppSelector((store) => store.notify);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notify.type) {
      const timer = setTimeout(() => {
        dispatch(resetNotify());
      }, AUTO_CLOSE_DURATION);

      return () => clearTimeout(timer); 
    }
  }, [notify, dispatch]);

  const handleClose = (): void => {
    dispatch(resetNotify());
  };

  return (
    <div className="fixed bottom-0 right-0 m-4">
      {notify.type && (
        <div
          className={`p-4 rounded-md shadow-md transition-all ${
            notify.type === 'error' ? 'bg-rose-500' : 'bg-teal-500'
          } text-white`}
        >
          <div className="flex justify-between items-center">
            <span>{notify.message}</span>
            <button
              type="button"
              onClick={handleClose}
              className="ml-4 text-lg font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
