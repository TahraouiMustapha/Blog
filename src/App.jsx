import Header from './components/header'
import Footer from './components/footer'

import { Outlet } from 'react-router-dom';
import useGetUser from './hooks/useGetUser';






const App = () => {
  const { authUser, setAuthUser } = useGetUser()


  return (
    <div className="font-rob min-h-screen w-full flex flex-col bg-white">
      <Header authUser={authUser}></Header>
      <Outlet context={setAuthUser} />
      <Footer></Footer>
    </div>
  );
};

export default App;
