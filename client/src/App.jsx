import Div100vh from 'react-div-100vh'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'
import { Navbar } from './components/navbar/Navbar'
import {
  Account,
  Document,
  DocumentForm,
  Documents,
  Home,
  MasterData,
  Transactions,
  User,
  Users,
  Violations,
} from './pages'
import { 
  AddUserModal,
  ApplyTransactionModal,
  DeleteDataModal,
  DeleteDocumentModal,
  FilterUserModal,
  FormMasterDataModal,
  InfoModal,
  LoginModal,
  LogoutModal,
  MenuModal,
  PenaltyModal,
  ResetPasswordModal,
  SearchModal,
  TransactionModal,
} from './components/modals'
import { 
  DOCUMENTS_LINK,
  DOCUMENT_FORM_LINK,
  DOCUMENT_LINK,
  HOME_LINK,
  MASTER_DATA_LINK,
  MY_ACCOUNT_LINK,
  TRANSACTIONS_LINK,
  USERS_LINK,
  USER_LINK,
  VIOLATIONS_LINK
} from './utils/links'
import { AdminGuard, UserGuard } from './components/guards'

function App() {
  return (
    <Router>
      <Div100vh>
        <div className='flex flex-row justify-center'>
          <div className="flex h-full flex-col w-full max-w-[485px]">
            <Navbar />
            <div className="mx-auto w-full px-5 lg:px-8 pb-8 short:pb-2 pt-14 gap-7">
              <Routes>
                <Route path={DOCUMENT_LINK.path} element={<Document />} />
                <Route path={DOCUMENTS_LINK.path} element={<Documents />} />
                <Route path={DOCUMENT_FORM_LINK.path} element={
                  <AdminGuard>
                    <DocumentForm />
                  </AdminGuard>
                } />
                <Route path={MASTER_DATA_LINK.path} element={
                  <AdminGuard>
                    <MasterData />
                  </AdminGuard>
                } />
                <Route path={MY_ACCOUNT_LINK.path} element={
                  <UserGuard>
                    <Account />
                  </UserGuard>
                } />
                <Route path={HOME_LINK.path} element={<Home />} />
                <Route path={TRANSACTIONS_LINK.path} element={
                  <UserGuard>
                    <Transactions />
                  </UserGuard>
                } />
                <Route path={USER_LINK.path} element={
                  <UserGuard>
                    <User />
                  </UserGuard>
                } />
                <Route path={USERS_LINK.path} element={
                  <UserGuard>
                    <Users />
                  </UserGuard>
                } />
                <Route path={VIOLATIONS_LINK.path} element={
                  <UserGuard>
                    <Violations />
                  </UserGuard>
                } />
              </Routes>
            </div>
          </div>
        </div>
        <AddUserModal />
        <ApplyTransactionModal />
        <DeleteDataModal />
        <DeleteDocumentModal />
        <FilterUserModal />
        <FormMasterDataModal />
        <InfoModal />
        <LoginModal />
        <LogoutModal />
        <MenuModal />
        <PenaltyModal />
        <ResetPasswordModal />
        <SearchModal />
        <TransactionModal />
        <ToastContainer 
          autoClose={1500}
          pauseOnFocusLoss={false}
          // limit={1}
        />

      </Div100vh>
    </Router>
  )
}

export default App