import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Routing from './Routing/Routing';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, [])
  return (
    <div className="flex justify-center mt-16">
      <Routing />
      
   
    </div>
  );
}

export default App;
