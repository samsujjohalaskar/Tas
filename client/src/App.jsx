import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signin from './components/Signin';
import BookTable from './pages/BookTable';
import Blog from './pages/Blog';
import Owner from './pages/Owner';
import Registration from './componentsOwner/Registration';
import Login from './componentsOwner/Login';
import ErrorPage from './components/ErrorPage';
import AddRestaurant from './componentsRestaurant/AddRestaurant';
import RestaurentDetails from './componentsRestaurant/RestaurentDetails';
import UpdateRestaurant from './componentsRestaurant/UpdateRestaurant';
import Restaurant from './pages/Restaurant';
import History from './pages/History';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/:city" element={<Home/>}></Route>
      <Route exact path="/login" element={<Signin/>}></Route>
      <Route exact path='/signup' element={Signup}></Route>
      <Route exact path="/logout" element={<Home/>}></Route>
      <Route path="/:city-restaurants" element={<BookTable />} />
      <Route path="/:city-restaurants/:cuisine-cuisine" element={<BookTable />} />
      <Route path="/:city-restaurants/:types-facilities" element={<BookTable />} />
      <Route path="/:city-restaurants/:area" element={<BookTable />} /> 
      <Route path="/:city-restaurants/:area/:cuisine-cuisine" element={<BookTable />} /> 
      <Route path="/:city-restaurants/:area/:amenities-feature" element={<BookTable />} /> 
      <Route path="/:city-restaurants/:area/:location" element={<BookTable />} /> 
      <Route exact path="/blog" element={<Blog/>}></Route>
      <Route exact path="/history" element={<History/>}></Route>

      <Route exact path="/owner-home" element={<Owner/>}></Route>
      <Route exact path="/owner-registration" element={<Registration/>}></Route>
      <Route exact path="/owner-login" element={<Login/>}></Route>
      <Route exact path="/add-restaurant" element={<AddRestaurant/>}></Route>
      <Route exact path="/restaurant/:restaurantId" element={<RestaurentDetails/>}></Route>
      <Route exact path="/restaurant/:restaurantId/update-restaurant-details" element={<UpdateRestaurant/>}></Route>

      <Route exact path="/:city-restaurants/:area/:name/:_id" element={<Restaurant/>}></Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
