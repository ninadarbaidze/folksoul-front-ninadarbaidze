import React from 'react';
import { AdminPanelWrapper } from 'types';

const AdminPanelActionWrapper: React.FC<AdminPanelWrapper> = (props) => {
  return (
    <>
      <div className='flex flex-col pt-20 items-center w-[70%] h-[80%] absolute top-[10%] left-[25%] bg-white rounded-[20px] shadow-innerSh'>
        <h1 className='text-2xl 2xl:text-3xl '>{props.header}</h1>
        <div className='flex flex-col justify-between w-[70%] mb-10 items-center ml-[8%] mr-[8%] border-b-[1px] border-dark50 h-6'></div>
        <div className={`${props.className} flex flex-col`}>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default AdminPanelActionWrapper;
