// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { ReactNode } from 'react';
import React, { useEffect, useRef } from 'react';

type AppModalProps = {
  title: string;
  buttonText: string;
  children: (handleClose: () => void) => ReactNode;
  buttonVariant?: string;
  visible: boolean;
  onClose: () => void;
};

function AppModal({
  title,
  buttonText,
  children,
  buttonVariant = 'bg-indigo-600 hover:bg-indigo-500 text-white',
  visible,
  onClose,
}: AppModalProps): JSX.Element {
  const [show, setShow] = React.useState(visible);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = (): void => {
    setShow(false);
    onClose();
  };
  const handleShow = (): void => setShow(true);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [visible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  return (
    <>
      <button
        className={`${buttonVariant} font-rubik font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600`}
        onClick={handleShow}
        type="button"
      >
        {buttonText}
      </button>

      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div ref={modalRef} className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    <div className="mt-2">{children(handleClose)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppModal;
