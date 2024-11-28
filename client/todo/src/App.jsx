import './App.css'
import './bootstrap.min.css'
import { Routes,Route } from 'react-router-dom'
import TodoHome from './components/TodoHome'
import { ToastContainer } from 'react-toastify';
import TodoDetails from './components/TodoDetails'
import TodoAdd from './components/TodoAdd'
import TodoEdit from './components/TodoEdit'
import Calendar from './components/Calendar';


function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<TodoHome/>}/>
      <Route path='/add' element={<TodoAdd/>}/>
      <Route path='/det/:id' element={<TodoDetails/>}/>
      <Route path='/upd/:id' element={<TodoEdit/>}/>
      <Route path='/calendar' element={<Calendar/>}/>
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
