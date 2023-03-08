import { Tab } from "@headlessui/react"
import { useEffect, useState } from 'react'

import { 
  Button,
  InputFile,
  InputNumber,
  InputPassword,
  InputText,
} from "../components/atoms"
import { DetailUserCard } from "../components/cards"

import { classNames } from '../utils/classNames'

export const Account = () => {
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [generation, setGeneration] = useState('')
  const [isDisabledButtonSubmitUpdateProfile, setIsDisabledButtonSubmitUpdateProfile] = useState(true)
  const [isDisabledButtonSubmitUpdatePassword, setIsDisabledButtonSubmitUpdatePassword] = useState(true)
  const [isDisabledButtonSubmitUpdateProfilePicture, setIsDisabledButtonSubmitUpdateProfilePicture] = useState(true)
  const [identityNumber, setIdentityNumber] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value)
  const handleGenerationChange = (e) => setGeneration(e.target.value)
  const handleIdentityNumberChange = (e) => setIdentityNumber(e.target.value)
  const handleNameChange = (e) => setName(e.target.value)
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value)
  const handleOldPasswordChange = (e) => setOldPassword(e.target.value)

  useEffect(() => {
    let value = true
    if( generation !== '' && identityNumber !== '' && name !== '' ) value = false
    setIsDisabledButtonSubmitUpdateProfile(value)
  }, [generation, identityNumber, name])

  useEffect(() => {
    setIsDisabledButtonSubmitUpdateProfilePicture(true)
  }, [])

  useEffect(() => {
    let value = true
    if( confirmNewPassword !== '' && newPassword !== '' && oldPassword !== '' ) {
      if(newPassword === confirmNewPassword) {
        value = false
        setMessage('')
      }
      if(newPassword !== confirmNewPassword) {
        value = true
        setMessage('Konfirmasi Kata Sandi tidak cocok!')
      }
    }
    setIsDisabledButtonSubmitUpdatePassword(value)
  }, [confirmNewPassword, newPassword, oldPassword])

  const handleSubmitUpdateProfile = (e) => {
    e.preventDefault()
    console.log('handleSubmitUpdateProfile')
  }

  const tabs = ['Biodata', 'Pengaturan Akun'];
  return (
    <div className="flex flex-col items-center">
      <DetailUserCard />
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
                    handleChange={handleNameChange}
                    id='name'
                    label='Nama Lengkap'
                    value={name}
                  />
                  <div className='flex flex-row gap-2 mt-2 mb-4'>
                    <InputText 
                      handleChange={handleIdentityNumberChange}
                      id='identityNumber'
                      label='Nomor Identitas'
                      value={identityNumber}
                    />
                    <InputNumber 
                      handleChange={handleGenerationChange}
                      id='generation'
                      label='Tahun Angkatan'
                      value={generation}
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitUpdateProfile}
                    isDisabled={isDisabledButtonSubmitUpdateProfile}
                    type='submit'
                    text='Simpan Perubahan' 
                  />
                </form>
              </div>
              <p>Perbarui Foto Profil</p>
              <div className='w-full p-3 rounded-md border-[1px]'>
                <form action="">
                  <div className="mb-4">
                    <InputFile 
                      id='name'
                      label='Pilih Foto Profil'
                    />
                  </div>
                  <Button 
                    isDisabled={isDisabledButtonSubmitUpdateProfilePicture}
                    text='Simpan Perubahan' 
                    type='submit'
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
                    handleChange={handleOldPasswordChange}
                    id='oldPassword'
                    label='Kata Sandi Lama'
                    value={oldPassword}
                  />
                  <div className='flex flex-row gap-2 mt-2 mb-4'>
                    <InputPassword 
                      handleChange={handleNewPasswordChange}
                      id='newPassword'
                      label='Kata Sandi Baru'
                      value={newPassword}
                    />
                    <InputPassword 
                      handleChange={handleConfirmNewPasswordChange}
                      id='confirmNewPassword'
                      label='Konfirmasi Kata Sandi Baru'
                      value={confirmNewPassword}
                    />
                  </div>
                  <p className="text-xs text-center mb-5 text-rose-500 font-medium">{message}</p>
                  <Button 
                    isDisabled={isDisabledButtonSubmitUpdatePassword}
                    text='Simpan Perubahan'
                    type='submit'
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