import React from 'react';
import { Children } from 'types';

const DashboardWrapper: React.FC<Children> = (props) => {
  return (
    <>
      <div className='flex items-center gap-20 relative  h-screen w-screen bg-gradient-radial-to-tr overflow-hidden  from-grad1 to-grad2'>
        <div className=' w-[20%] h-[60%] bg-dark50 rounded-r-2xl border-[1px] border-l-dark50  border-white'>
          <ul className='flex flex-col gap-3 mt-12 2xl:mt-16'>
            {props.children}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardWrapper;
