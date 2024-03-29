import { useState, useContext, useCallback, useEffect } from 'react';
import { AdminPanelActionWrapper } from 'components';
import { SocialsTypes } from 'types';
import { AuthContext } from 'store';
import { getSocialMediaWithPagination } from 'services';
import { Social } from 'pages/Socials/components';
import { Outlet, NavLink } from 'react-router-dom';

const Socials = () => {
  const [data, setData] = useState<SocialsTypes[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const authCtx = useContext(AuthContext);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const fetchData = useCallback(async () => {
    try {
      const response = await getSocialMediaWithPagination(pageNumber);
      setData(response.data.socials);
      setNumberOfPages(response.data.total);
    } catch (error) {}
  }, [pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData, authCtx.socialIsEdited]);
  return (
    <>
      <AdminPanelActionWrapper
        className='flex flex-col items-center'
        header='სოციალური ბმულები'
      >
        <div className='flex flex-col justify-between px-8 py-3 h-full items-center gap-8'>
          {data.map((social) => (
            <Social
              {...social}
              key={social._id}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              data={data}
              fetchData={fetchData}
            />
          ))}
        </div>
        <div className='flex justify-center absolute bottom-32 gap-5'>
          {pages.map((pageIndex) => (
            <button
              className={
                pageNumber === pageIndex
                  ? 'bg-dark20  h-5 w-5 2xl:h-6 2xl:w-6 rounded-full'
                  : 'bg-dark10 h-5 w-5 2xl:h-6 2xl:w-6 rounded-full'
              }
              id={`${pageIndex}`}
              key={pageIndex}
              onClick={() => setPageNumber(pageIndex)}
            ></button>
          ))}
        </div>
        <button
          className='absolute bottom-10 text-link text-base 2xl:text-2xl font-bold underline mt-[2rem] 2xl:mt-[5rem]'
          id='addNewSocial'
        >
          <NavLink to='new-social'>დაამატე ახალი სოციალური ბმული</NavLink>
        </button>
      </AdminPanelActionWrapper>
      <Outlet />
    </>
  );
};

export default Socials;
