import Div100vh from 'react-div-100vh'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';
import { Navbar } from './components/navbar/Navbar';
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
  DeleteDataModal,
  FilterUserModal,
  FormMasterDataModal,
  InfoModal,
  LoginModal,
  MenuModal,
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
} from './utils/links';

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
                <Route path={DOCUMENT_FORM_LINK.path} element={<DocumentForm />} />
                <Route path={MASTER_DATA_LINK.path} element={<MasterData />} />
                <Route path={MY_ACCOUNT_LINK.path} element={<Account />} />
                <Route path={HOME_LINK.path} element={<Home />} />
                <Route path={TRANSACTIONS_LINK.path} element={<Transactions />} />
                <Route path={USER_LINK.path} element={<User />} />
                <Route path={USERS_LINK.path} element={<Users />} />
                <Route path={VIOLATIONS_LINK.path} element={<Violations />} />
              </Routes>
            </div>
          </div>
        </div>
        <AddUserModal />
        <DeleteDataModal />
        <FilterUserModal />
        <FormMasterDataModal />
        <InfoModal />
        <LoginModal />
        <MenuModal />
        <SearchModal />
        <TransactionModal />
      </Div100vh>
    </Router>
  )
}

export default App