'use client'
import React from 'react';
import { useModal } from '../contexts/ModalContext';

const Modal: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { closeModal } = useModal();

  return (
    <div className="fixed inset-0 bg-black backdrop-blur bg-opacity-50 flex flex-col justify-center items-center z-50">
        <div className='flex justify-end max-w-lg w-[90%]'>

        <button 
          className="text-5xl text-white leading-none hover:text-white/80"
          onClick={closeModal}
          >
          &times;
        </button>
          </div>
      <div className="bg-white p-4 md:p-10 rounded-xl max-w-lg w-[90%] m-4 mt-0 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
