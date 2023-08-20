import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';
import { Home } from './pages/home/Home';
import { SearchResult } from './pages/searchResult/SearchResult';


function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state)=>state.home);

  useEffect(()=>{
    fetchApiConfig();
  }, []);

  const fetchApiConfig = ()=>{
    fetchDataFromApi('/configuration')
      .then(res=>{
        const url = {
          backdrop: res.images.secure_base_url + 'original',
          poster: res.images.secure_base_url + 'original',
          profile: res.images.secure_base_url + 'original',
        }
        dispatch(getApiConfiguration(url));
      })
  }
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search/:query' element={<SearchResult/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
