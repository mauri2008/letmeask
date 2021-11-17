import { BrowserRouter,Routes , Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

import { AuthContextProvider } from './context/AuthContext'


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>        
            <Route path="/" element={<Home />} />
            <Route path="/room/new" element={<NewRoom/>}/>
            <Route path="/room/:id" element={<Room />}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
