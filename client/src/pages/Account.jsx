import { Tab } from "@headlessui/react"
import { useEffect } from 'react'

import { 
  Button,
  InputFile,
  InputNumber,
  InputPassword,
  InputText,
} from "../components/atoms"
import { DetailUserCard } from "../components/cards"

import { classNames } from '../utils/classNames'
import { useAppContext } from "../context/appContext"

export const Account = () => {
  const { changeFormValue, changeProfilePicture, changeUserPassword, data, form } = useAppContext()
  const { changePassword, user } = form

  const handleChangePassword = (e) => {
    changeFormValue({
      key: 'changePassword',
      value: {
        ...form.changePassword,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleChangeProfilePicture = (e) => {
    changeFormValue({
      key: 'changeProfilePicture',
      value: {
      ...form.changeProfilePicture,
        [e.target.name]: e.target.files[0]
      }
    })
  }

  const handleChangeUser = (e) => {
    changeFormValue({
      key: 'user',
      value: {
        ...form.user,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmitChangePassword = (e) => {
    e.preventDefault()
    
    changeUserPassword({
      form: changePassword,
      user: user.id
    })
  }
  
  const handleSubmitUpdateProfile = (e) => {
    e.preventDefault()
    
  }
  
  const handleSubmitUpdateProfilePicture = (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('image', form.changeProfilePicture.image)

    changeProfilePicture({
      form: formData,
      id: user.id
    })
  }

  useEffect(() => {
    const { confirmPassword, newPassword, oldPassword } = changePassword
    if( confirmPassword !== '' && newPassword !== '' && oldPassword !== '' ) {
      changeFormValue({
        key: 'changePassword',
        value: {
          ...form.changePassword,
          isDisabledButton: false
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePassword])

  useEffect(() => {
    const { name, classYear, idNumber } = user
    if( name !== '' && classYear !== '' && idNumber !== '' ) {
      changeFormValue({
        key: 'user',
        value: {
          ...form.user,
          isDisabledButton: false
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const tabs = ['Biodata', 'Pengaturan Akun'];
  return (
    <div className="flex flex-col items-center">
      <DetailUserCard user={{}}/>
      <div className="w-full py-6 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {(tabs.map((value) => (
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                  selected
                  ? 'bg-white shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-white'
                )
              }
              key={value}
            >
              {value}
            </Tab>
          )))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className='p-4'>
              <p>Perbarui Biodata</p>
              <div className='mb-3 w-full p-3 rounded-md border-[1px]'>
                <form action="">
                  <InputText 
                    handleChange={handleChangeUser}
                    id='name'
                    label='Nama Lengkap'
                    value={user.name}
                  />
                  <div className='flex flex-row gap-2 mt-2 mb-4'>
                    <InputText 
                      handleChange={handleChangeUser}
                      id='idNumber'
                      label='Nomor Identitas'
                      value={user.idNumber}
                    />
                    <InputNumber 
                      handleChange={handleChangeUser}
                      id='classYear'
                      label='Tahun Angkatan'
                      value={user.classYear}
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitUpdateProfile}
                    isDisabled={user.isDisabledButton}
                    type='submit'
                    text='Simpan Perubahan' 
                  />
                </form>
              </div>
              <p>Perbarui Foto Profil</p>
              <div className='w-full p-3 rounded-md border-[1px]'>
                <form encType="multipart/form-data">
                  <div className="mb-4">
                    <InputFile 
                      id='image'
                      label='Pilih Foto Profil'
                      handleChange={handleChangeProfilePicture}
                    />
                  </div>
                  <Button 
                    text='Simpan Perubahan' 
                    type='submit'
                    onClick={handleSubmitUpdateProfilePicture}
                  />
                </form>
              </div>
            </Tab.Panel>
            <Tab.Panel className='p-4'>
              <p>Perbarui Kata Sandi</p>
              <p className='text-xs text-gray-500'>Mengganti kata sandi akan me-logout sesi kamu saat ini.</p>
              <div className='mt-3 w-full p-3 rounded-md border-[1px]'>
                <form action="">
                  <InputPassword 
                    handleChange={handleChangePassword}
                    id='oldPassword'
                    label='Masukkan Kata Sandi Lama'
                    value={changePassword.oldPassword}
                  />
                  <div className='flex flex-row gap-2 mt-2 mb-4'>
                    <InputPassword 
                      handleChange={handleChangePassword}
                      id='newPassword'
                      label='Masukkan Kata Sandi Baru'
                      value={changePassword.newPassword}
                    />
                    <InputPassword 
                      handleChange={handleChangePassword}
                      id='confirmPassword'
                      label='Konfirmasi Kata Sandi Baru'
                      value={changePassword.confirmPassword}
                    />
                  </div>
                  <p className="text-xs text-center mb-5 text-rose-500 font-medium">{''}</p>
                  <Button 
                    isDisabled={changePassword.isDisabledButton}
                    text='Simpan Perubahan'
                    type='submit'
                    onClick={handleSubmitChangePassword}
                  />
                </form>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}