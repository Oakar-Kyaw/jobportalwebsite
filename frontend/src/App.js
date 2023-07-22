
import './App.css';
import HomePage from './pages/home';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import NotFound from './pages/notfound';
import { CssBaseline, ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { LoginPage } from './pages/login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDashboard } from './pages/userdashboard';
import { AdminDashboard } from './admin/admindashboard';
import { SignUpPage } from './pages/signuppage';
import { SingleJobPage } from './pages/singlejobpage';
import { CheckRoute } from './component/checkroute';
import { CheckCompany } from './component/checkcompany';


function App() {
  
  
  return (
    <>
 
    <ThemeProvider theme={theme}>
     <BrowserRouter>
       <Routes>
           <Route path='/' element={<HomePage/>}/>
            
            {/* single job page */}
           <Route path='/job/:id' element={<SingleJobPage/>}/>

           {/* search with word */}
           <Route path='/search/:keyword' element={<HomePage/>}/>

          {/* search with location*/}
           <Route path='/search/location/:location' element={<HomePage/>}/>
            
          {/* login route*/}
           <Route path='/login' element={<LoginPage/>}/>

           {/* Sign Up route*/}
           <Route path='/signup' element={<SignUpPage/>}/>
           
          {/* userdashboard,search with word */}
          <Route path='/userdashboard' element={<CheckRoute><UserDashboard/> </CheckRoute>}/>

          {/*userdashboard, action to use param */}
          <Route path='/userdashboard/:action' element={<CheckRoute><UserDashboard/></CheckRoute>}/>
          
          {/*admin dashboard */}
          <Route path='/admindashboard' element={<CheckRoute><CheckCompany><AdminDashboard/></CheckCompany> </CheckRoute> }/>

          {/*admin dashboard, action to use param eg. action ='job' etc*/}
          <Route path='/admindashboard/:action' element={<CheckRoute><CheckCompany> <AdminDashboard/></CheckCompany></CheckRoute>}/>

          {/*admin dashboard, action and id to use param,  eg. action ='job', id="45546543" etc*/}
          <Route path='/admindashboard/:action/:id' element={<CheckRoute><CheckCompany> <AdminDashboard/></CheckCompany></CheckRoute> }/>
          {/*admin dashboard,add job, action to use param */}
          <Route path='/admindashboard/job/:action' element={<CheckRoute> <CheckCompany> <AdminDashboard/> </CheckCompany></CheckRoute>}/>

          {/*admin dashboard,edit job, action to use param eg.editjob and id for specific job id */}
          <Route path='/admindashboard/job/:action/:id' element={<CheckRoute> <CheckCompany> <AdminDashboard/> </CheckCompany></CheckRoute>}/>

          {/*admin dashboard,add user, action to use param */}
          <Route path='/admindashboard/user/:action' element={<CheckRoute> <CheckCompany> <AdminDashboard/></CheckCompany></CheckRoute>}/>

          {/*admin dashboard,add category, action to use param */}
          <Route path='/admindashboard/category/:action' element={<CheckRoute> <CheckCompany> <AdminDashboard/></CheckCompany></CheckRoute>}/>
           

           <Route path='*' element={<NotFound/>}/>
       </Routes>
     </BrowserRouter>
     </ThemeProvider>
     <ToastContainer/>
    </>
  );
}

export default App;
