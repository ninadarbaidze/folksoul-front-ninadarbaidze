import React from 'react';
import { Children } from 'types';

const LoginModal: React.FC<Children> = (props) => {
  return (
    <>
      <div className='flex items-center justify-center h-screen w-screen bg-gradient-radial-to-tr  from-grad1 to-grad2'>
        <div className='flex flex-col items-center w-[25rem] h-[30rem] border-[1px] rounded-[1px]  border-white bg-gradient-to-t  from-grad4 to-grad3'>
          <div className='flex justify-center items-center w-[12rem] h-[3rem]  2xl:h-[3.5rem]  before:block before:absolute before:-inset-1 before:-skew-x-[20deg] before:bg-red relative mt-16 drop-shadow-3xl'>
            <div>
              <h1 className='relative font-bold text-2xl'>კარიბჭე</h1>
            </div>
          </div>

          {props.children}
        </div>
      </div>
    </>
  );
};

export default LoginModal;
