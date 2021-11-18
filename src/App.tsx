import { BrowserRouter,Routes , Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

import { AuthContextProvider } from './context/AuthContext'
import { AdminRoom } from './pages/AdminRoom';


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>        
            <Route path="/" element={<Home />} />
            <Route path="/room/new" element={<NewRoom/>}/>
            <Route path="/room/:id" element={<Room />}/>
            <Route path="/admin/room/:id" element={<AdminRoom />}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
