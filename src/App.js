
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';

import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

import Contact from './components/Contact';
import About from './components/About';
import Services from './components/Services';
import News from './components/News';
import Settings from './components/Settings';
import Products from './components/Products';
import Departments from './components/Departments';
import DepartmentForm from './components/Department';
import DepartmentHeads from './components/DepartmentHead';
import DepartmentHeadList from './components/DepartmentHeadList';
import UpdateForm from './components/Updateform';
import AddEmployee from './components/Employee';
import EmployeeList from './components/EmployeeList';
import UpdateEmployee from './components/UpdateEmployeeList';
import ProfileHead from './components/ProfileHead';
import ProfileEmployee from './components/ProfileEmployee';
import ProfileDepartment from './components/ProfileDepartment';
import DepartementHeadCard from './components/DepartementHeadCard';
import EmployeeDepartmentCard from './components/EmployeeDepartmentCard';
import DepartmentCard from './components/DepartmentCard';
import DepartmentCardPage from './components/DepartmentPage';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/news' element={<News/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/register" element={<Signup />} />
          <Route path="/departments" element={<Departments/>}/>
          <Route path="/profilehead/:id" element={<ProfileHead/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Settings" element={<Settings/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/department" element={<DepartmentForm/>}/>
          <Route path="/departmenthead" element={<DepartmentHeads/>}/>
          <Route path="/departmentheadlist/:id" element={<DepartmentHeadList/>}/>
          <Route path="/departmentheadlist" element={<DepartmentHeadList/>}/>
          <Route path="/employee" element={<AddEmployee/>}/>
          <Route path="/profileemployee/:id" element={<ProfileEmployee/>}/>
          <Route path="/employeelist" element={<EmployeeList/>}/>
          <Route path="/update_employee/:id" element={<UpdateEmployee/>}/>
          <Route path="/updateform/:id" element={<UpdateForm/>}/>
          <Route path="/profiledepartment/:id" element={< ProfileDepartment/>}/>
          <Route path="/departmentCard" element={<DepartementHeadCard/>}/>
          <Route path='/employeedepartmentcard'element={<EmployeeDepartmentCard/>}/>
          <Route path='/departmentcard'element={<DepartmentCard/>}/>
          <Route path='/departmentpage' element={<DepartmentCardPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
