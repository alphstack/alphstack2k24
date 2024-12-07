import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar';
import NotFound from './pages/notFound';
import Subscriptions from './pages/Subscriptions';
import {CalendarPage} from './pages/CalendarPage';
function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation(); 
  const hideNavBar = location.pathname === '/';

  return (
    <div className="App">
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route
          path="/calendar"
          element={<CalendarPage/>}
        />
        <Route 
          path="/subscriptions"
          element={<Subscriptions/>}
        />
        <Route 
          path="/signin" 
          element={<SignIn />} 
        />
        <Route 
          path="/signup" 
          element={<SignUp />} 
        />
        <Route 
          path="*" 
          element={<NotFound />} 
        />
      </Routes>
    </div>
  );
}

export default App;
