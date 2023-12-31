import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.scss"
import { useFetch } from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { Img } from '../../../components/lazyLoadImages/Img';
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper';
 

export const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { url } = useSelector(state=>state.home);
  const {data, loading} = useFetch("/movie/upcoming");

  useEffect(()=>{
    const bg=url.backdrop + data?.results[Math.floor(Math.random() *20)].backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) =>{
    console.log(event);
    if(query.length >0){
      if(event.key === 'Enter' || event.target.tagName === 'BUTTON'){
        navigate(`search/${query}`);
      }
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop-img">
        <Img src={background}/>
      </div>}

      <div className="opacity-layer"></div>

      <ContentWrapper>
      <div className='wrapper'>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">Million of movies, TV shows and people to discover. Explore now.</span>
          <div className="searchInput">
            <input 
              type="text" 
              placeholder='Search for movie or tv show ...' 
              onKeyUp={searchQueryHandler}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </div>
      </ContentWrapper>
    </div>
  )
}
