import React, { useState, UseEffect, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import  InfiniteScroll from 'react-infinite-scroll-component';
import "./style.scss"
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";

import { fetchDataFromApi } from '../../utils/api';
import { ContentWrapper } from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import { Spinner } from '../../components/spinner/Spinner';

export const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const {query} = useParams();
  const navigate = useNavigate();

  const fetchInitialData= () =>{
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNumber}`)
      .then(res=>{
        setData(res);
        setPageNumber(prev=>prev + 1);
        setLoading(false);
      })
  }

  const fetchNextPageData = () =>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNumber}`)
      .then(res=>{
        if(data.results){
          setData({...data, results:[...data?.results, ...res.results]})
        }else{
          setData(res)
        }
        setPageNumber(prev=>prev + 1);
      })
  }

  useEffect(()=>{
    fetchInitialData();
  }, [query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {!loading && 
        <ContentWrapper>
          {<div
            className="backToHome" 
            onClick={() => navigate('/')}
            >
              <FaArrowLeftLong className='backIcon'/> Back to Home
            </div>}
          {data?.results.length > 0 
            ? <>
                <div className="pageTitle">
                  {`Search ${data.total_results > 1 ? 'results' : 'result'} of ${query}`}
                </div>
                <InfiniteScroll 
                  className='content' 
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNumber <= data?.total_pages}
                  loader={<Spinner />} 
                >
                  {data.results.map((item, index)=>{
                    if(item.media_type === 'person') return;
                    return (
                      <MovieCard key={index} data={item}/>
                    )
                  })}
                </InfiniteScroll>
              </>
            : (
                <span className="resultNotFound">Sorry, Results not Found</span>
              )
          }
        </ContentWrapper>
      }
    </div>
  )
}
