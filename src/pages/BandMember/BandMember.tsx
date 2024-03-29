import { useState, useEffect, useCallback, useContext } from 'react';
import { AdminPanelActionWrapper } from 'components';
import { BandMemberData } from 'types';
import { Member } from 'pages/BandMember/components';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from 'store';
import { getBandMembers } from 'services';

const BandMember = () => {
  const [data, setData] = useState<BandMemberData[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const authCtx = useContext(AuthContext);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const fetchData = useCallback(async () => {
    try {
      const response = await getBandMembers(pageNumber);
      setData(response.data.bandMembers);
      setNumberOfPages(response.data.total);
    } catch (error) {}
  }, [pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData, authCtx.memberIsEdited]);

  return (
    <>
      <AdminPanelActionWrapper
        className='items-center gap-20 2xl:gap-28'
        header='ჯგუფის წევრები'
      >
        <div className='flex gap-10'>
          {data.map((member) => (
            <Member
              {...member}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              data={data}
              key={member._id}
              fetchData={fetchData}
            />
          ))}
        </div>
        <div className='flex justify-center gap-5'>
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
          className='absolute bottom-10 text-link text-base 2xl:text-2xl font-bold underline'
          id='newMemberBtn'
        >
          <NavLink to='new-member'>ახალი წევრი გვყავს?</NavLink>
        </button>
      </AdminPanelActionWrapper>
      <Outlet />
    </>
  );
};

export default BandMember;
