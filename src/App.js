// import './App.css';
// import { createBrowserHistory } from 'history';
// import { Router } from 'react-router';
// import { Hometemplate } from './templates/HomeTemplates/HomeTemplate';
// import Home from './pages/Home/Home';
// import Contact from './pages/Contact/Contact';
// import New from './pages/News/New';
// import { Route } from 'react-router-dom/cjs/react-router-dom';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// import Detail from './pages/Detail/Detail';
// import CheckoutTemplate from './templates/CheckoutTemplates/CheckoutTemplate';
// import Checkout from './pages/Checkout/Checkout';
// import { Suspense, lazy } from 'react';
// import LoadingPage from './components/LoadingPage/LoadingPage';
// import { UserTemplate } from './templates/UserTemplates/UserTemplate';
// import { RegisterTemplate } from './templates/RegisterTemplates/RegisterTemplate';
// import AdminTemplates from './templates/AdminTemplates/AdminTemplates';
// import Dashboard from './pages/Admin/Dashboard/Dashboard';

// import Showtime from './pages/Admin/Showtime/Showtime';
// import FilmAdmin from './pages/Admin/Films/FilmAdmin';
// import AddNew from './pages/Admin/Films/AddNewFilm/AddNew';
// import EditAdmin from './pages/Admin/Films/EditFilm/EditAdmin';

// // const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplates/CheckoutTemplate'));

// export const history = createBrowserHistory();

// function App() {



//   return (
//     <Router history={history}>
//       {/* <LoadingPage /> */}
//       <Hometemplate path="/home" exact Component={Home} />
//       <Hometemplate path="/contact" exact Component={Contact} />
//       <Hometemplate path="/new" exact Component={New} />
//       <Hometemplate path="/" exact Component={Home} />
//       <Hometemplate path="/detail/:id" exact Component={Detail} />

//       <RegisterTemplate path="/register" exact Component={Register} />
//       <UserTemplate path="/login" exact Component={Login}/>


//       <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

//       <AdminTemplates path="/admin" exact Component={Dashboard}/>
//       <AdminTemplates path="/admin/users" exact Component={Dashboard}/>
//       <AdminTemplates path="/admin/films" exact Component={FilmAdmin}/>
//       <AdminTemplates path="/admin/films/addnew" exact Component={AddNew}/>
//       <AdminTemplates path="/admin/films/edit/:id" exact Component={EditAdmin}/>
//       <AdminTemplates path="/admin/films/showtimes/:id" exact Component={Showtime}/>

//     </Router>
//   );
// }

// export default App;


import './App.css';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { Hometemplate } from './templates/HomeTemplates/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import New from './pages/News/New';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import CheckoutTemplate from './templates/CheckoutTemplates/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { Suspense, lazy } from 'react';
import LoadingPage from './components/LoadingPage/LoadingPage';
import { UserTemplate } from './templates/UserTemplates/UserTemplate';
import { RegisterTemplate } from './templates/RegisterTemplates/RegisterTemplate';
import AdminTemplates from './templates/AdminTemplates/AdminTemplates';
import Dashboard from './pages/Admin/Dashboard/Dashboard';

import Showtime from './pages/Admin/Showtime/Showtime';
import FilmAdmin from './pages/Admin/Films/FilmAdmin';
import AddNew from './pages/Admin/Films/AddNewFilm/AddNew';
import EditAdmin from './pages/Admin/Films/EditFilm/EditAdmin';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

// const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplates/CheckoutTemplate'));

export const history = createBrowserHistory();

function App() {



  return (
    <BrowserRouter>
      <Router history={history}>
        <LoadingPage />
        <Switch>
          <Hometemplate path="/home" exact Component={Home} />
          <Hometemplate path="/contact" exact Component={Contact} />
          <Hometemplate path="/new" exact Component={New} />
          <Hometemplate path="/" exact Component={Home} />
          <Hometemplate path="/detail/:id" exact Component={Detail} />

          <RegisterTemplate path="/register" exact Component={Register} />
          <UserTemplate path="/login" exact Component={Login} />


          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

          <AdminTemplates path="/admin" exact Component={Dashboard} />
          <AdminTemplates path="/admin/users" exact Component={Dashboard} />
          <AdminTemplates path="/admin/films" exact Component={FilmAdmin} />
          <AdminTemplates path="/admin/films/addnew" exact Component={AddNew} />
          <AdminTemplates path="/admin/films/edit/:id" exact Component={EditAdmin} />
          <AdminTemplates path="/admin/films/showtimes/:id" exact Component={Showtime} />

        </Switch>

      </Router>
    </BrowserRouter>
  );
}

export default App;


