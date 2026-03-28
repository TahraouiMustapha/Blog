import { Outlet } from 'react-router-dom';

import Header from './components/header'
import Footer from './components/footer'

import useGetUser from './hooks/useGetUser';
import HeaderInfoContext from './context/headerInfoContext';


const App = () => {
  const { authUser, setAuthUser } = useGetUser()


  return (
    <div className="font-rob min-h-screen w-full flex flex-col bg-white">
      <HeaderInfoContext value={{ authUser, setAuthUser }}>
        <Header />
      </HeaderInfoContext>

      <Outlet context={{ authUser, setAuthUser }} />
      <Footer></Footer>
    </div>
  );
};

export default App;
