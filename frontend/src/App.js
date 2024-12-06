import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route 
            path="/"
            element={<Home />} 
          />
          <Route 
            path="/signin"
            element={<SignIn/>}
          />
          <Route 
            path="/signup"
            element={<SignUp/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
