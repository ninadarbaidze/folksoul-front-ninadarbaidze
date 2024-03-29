import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RedButton, YellowButton, EditPhoto, DeleteDialog } from 'components';
import { ImageUploadModal } from 'pages/Socials/components';
import { deleteSocial } from 'services';
import { youtube } from 'assets';
import { AuthContext } from 'store';
import { Socials } from 'types';

const Social: React.FC<Socials> = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageModalState, setImageModalState] = useState(false);
  const [deleteModalState, setDeleteImageModalState] = useState(false);

  const openImagePickerHandler = () => {
    setImageModalState(true);
  };

  const editMemberHandler = () => {
    navigate('/dashboard/socials/new-social', {
      state: {
        id: props._id,
        name: props.name,
        url: props.url,
      },
    });
  };

  const deleteMemberHandler = async () => {
    try {
      await deleteSocial(authCtx.token, props._id);
      if (props.data.length === 1) props.setPageNumber(props.pageNumber - 1);
      props.fetchData();
      setDeleteImageModalState(false);
    } catch (error) {}
  };

  const cancelDeleting = () => {
    setDeleteImageModalState(false);
  };

  return (
    <>
      {deleteModalState && (
        <DeleteDialog
          setDeleteImageModalState={setDeleteImageModalState}
          deleteMemberHandler={deleteMemberHandler}
          cancelDeleting={cancelDeleting}
        />
      )}
      {imageModalState && (
        <ImageUploadModal {...props} setImageModalState={setImageModalState} />
      )}

      <div className='flex justify-start relative gap-[10%] pl-[5%] items-center w-[40rem] h-[3rem] 2xl:w-[50rem] 2xl:h-[4rem] bg-dark50  border-[1px] rounded-[5px] drop-shadow-5xl'>
        <div className='relative max-w-[50px]'>
          <img
            src={
              props.image.length > 0
                ? `${process.env.REACT_APP_API_URL}/${props.image}`
                : youtube
            }
            alt='social-icon'
            className='max-w-[2rem] 2xl:w-[5rem]'
          />

          <EditPhoto
            onClick={openImagePickerHandler}
            className='absolute w-[1rem] 2xl:w-[1.5rem] top-[50%] left-[60%]  cursor-pointer'
          />
        </div>
        <h1 className='truncate w-24 text-white text-base 2xl:text-2xl'>
          {props.name}
        </h1>
        <p className='truncate w-48 text-link2 underline text-base 2xl:text-xl'>
          <a href={props.url} target='_blank' rel='noreferrer'>
            {props.url}
          </a>
        </p>
        <div className='flex justify-end absolute right-0 items-center pr-[5%] w-[20rem] gap-14'>
          <YellowButton onClick={editMemberHandler} />
          <RedButton onClick={() => setDeleteImageModalState(true)} />
        </div>
      </div>
    </>
  );
};

export default Social;
