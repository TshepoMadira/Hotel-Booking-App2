
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Homepage from './components/homepage';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
     

        

      </Routes>
    </Router>
  )
}

export default App
