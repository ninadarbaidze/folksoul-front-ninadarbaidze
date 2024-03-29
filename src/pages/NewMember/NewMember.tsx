import { useContext, useState } from 'react';
import { AdminPanelActionWrapper, Input, Textarea } from 'components';
import { AddNewMember } from 'types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormButton } from 'pages/NewMember/components';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from 'store';
import { editMember, addMember } from 'services';

const NewMember = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState<number | null>(null);
  const location = useLocation();
  const state = location.state as AddNewMember;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNewMember>({
    mode: 'onChange',
    defaultValues: {
      name: state ? state.name : '',
      instrument: state ? state.instrument : '',
      orbitLength: state ? state.orbitLength : '',
      color: state ? state.color : '',
      biography: state ? state.biography : '',
    },
  });

  const updateBandMemberHandler = async (data: AddNewMember) => {
    try {
      await editMember(authCtx.token, state.id, data);
    } catch (error) {}
    authCtx.refreshMembers();
    navigate('/dashboard/band-members');

    return;
  };

  const addNewBandMemberHandler = async (data: AddNewMember) => {
    try {
      await addMember(authCtx.token, data);
    } catch (error: any) {
      setError(error.response.status);
      throw new Error('Request failed!');
    }
    authCtx.refreshMembers();
    navigate('/dashboard/band-members');
  };

  const onSubmit: SubmitHandler<AddNewMember> = async (data) => {
    if (state) updateBandMemberHandler(data);
    else addNewBandMemberHandler(data);
  };

  const orbitLengthRules = {
    min: {
      value: 300,
      message: 'სიგრძე მინ. 300 ',
    },
    max: {
      value: 500,
      message: 'სიგრძე მაქს. 500 ',
    },
    pattern: {
      value: /^[0-9]*$/,
      message: 'შეიყვანე რიცხვი',
    },
  };

  const georgianPatternRules = {
    pattern: {
      value: /[\u10A0-\u10FF]/,
      message: 'წერე ქართულად!',
    },
  };

  return (
    <div>
      <AdminPanelActionWrapper header='დაამატე ჯგუფის ახალი წევრი'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col mt-4 2xl:mt-8 justify-center items-center gap-4 2xl:gap-12'
        >
          <div className='flex flex-col items-center h-[5rem]'>
            <Input
              fieldName='name'
              type='text'
              register={register}
              placeholder={'სახელი'}
              id={'name'}
              RegisterOptions={georgianPatternRules}
              isRequired={true}
              minValue={3}
              class={
                errors.name
                  ? 'border-red w-[20vw] h-[3rem] 2xl:h-[4rem] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  pl-[8%] '
                  : 'border-blue2 w-[20vw] h-[3rem] 2xl:h-[4rem] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  pl-[8%]'
              }
            />
            {errors.name ? (
              <p className='text-red text-[12px] 2xl:text-[16px] pt-1'>
                {errors.name?.message}
              </p>
            ) : null}
            {error ? (
              <p className='text-red text-[12px] 2xl:text-[16px] pt-1'>
                უკვე არსებობს სხვა ამ მეტსახელით
              </p>
            ) : null}
          </div>
          <div className='flex gap-6 h-[4rem]'>
            <div className='flex flex-col items-center'>
              <Input
                fieldName='instrument'
                type='text'
                register={register}
                placeholder={'ინსტრუმენტი'}
                id={'instrument'}
                RegisterOptions={georgianPatternRules}
                isRequired={true}
                minValue={2}
                class={
                  errors.instrument
                    ? 'border-red w-[10vw] h-[3rem] 2xl:h-[4rem] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  pl-[8%] '
                    : 'border-blue2 w-[10vw] h-[3rem] 2xl:h-[4rem] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  pl-[8%]'
                }
              />
              {errors.instrument ? (
                <p className='text-red text-[12px] 2xl:text-[16px] pt-1'>
                  {errors.instrument?.message}
                </p>
              ) : null}
            </div>
            <div className='flex flex-col items-center'>
              <Input
                fieldName='orbitLength'
                type='text'
                register={register}
                placeholder={'ორბიტის სიგანე'}
                isRequired={true}
                id={'orbitLength'}
                RegisterOptions={orbitLengthRules}
                class={
                  errors.orbitLength
                    ? 'border-red w-[10vw] h-[3rem] 2xl:h-[4rem] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  pl-[8%] '
                    : 'border-blue2 w-[10vw] h-[3rem] 2xl:h-[4rem] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  pl-[8%]'
                }
              />
              {errors.orbitLength ? (
                <p className='text-red text-[12px] 2xl:text-[16px] pt-1'>
                  {errors.orbitLength?.message}
                </p>
              ) : null}
            </div>
            <div className='flex flex-col items-center'>
              <Input
                fieldName='color'
                type='color'
                register={register}
                placeholder={'ფერი'}
                id={'color'}
                isRequired={true}
                class={
                  errors.color
                    ? 'border-red w-[10vw] h-[3rem] 2xl:h-[4rem] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  p-2 '
                    : 'border-blue2 w-[10vw] h-[3rem] 2xl:h-[4rem] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  p-2'
                }
              />
              {errors.color ? (
                <p className='text-red text-[12px] 2xl:text-[16px] pt-1'>
                  {errors.color?.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className='flex flex-col items-center h-[8rem] 2xl:h-[10rem]'>
            <Textarea
              fieldName='biography'
              register={register}
              placeholder={'ბიოგრაფია'}
              isRequired={true}
              RegisterOptions={georgianPatternRules}
              class={
                errors.biography
                  ? 'border-red  w-[40vw] h-[6vw] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  pl-[1%]  '
                  : 'border-blue2 w-[40vw] h-[6vw] text-center  focus:outline-none bg-white placeholder:placeholder text-[14px] 2xl:text-xl font-normal  border-[1px] 2xl:border-[1.5px] rounded-[5px]  pl-[1%]  '
              }
            />
            {errors.biography ? (
              <p className='text-red text-[12px] 2xl:text-[16px] pt-1'>
                {errors.biography?.message}
              </p>
            ) : null}
          </div>
          <div className='flex flex-col space-y-4 absolute bottom-5'>
            <FormButton
              buttonText={!state ? 'დაამატე წევრი' : 'განაახლე წევრი'}
            />
            <button
              className=' text-link text-base 2xl:text-2xl font-bold underline '
              id='goBackBtn'
              onClick={() => navigate('/dashboard/band-members')}
            >
              გადი უკან
            </button>
          </div>
        </form>
      </AdminPanelActionWrapper>
    </div>
  );
};

export default NewMember;
