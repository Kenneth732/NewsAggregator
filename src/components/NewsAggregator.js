import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './NewsAggregator.css';


const API_KEY = '6cbdef411b3b47529a17b5cf4667303b'; // Replace with your NewsAPI key

const NewsAggregator = () => {
  const [newsHeadlines, setNewsHeadlines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchTopHeadlines();
    } else {
      fetchNewsHeadlinesWithSearch();
    }
  }, [searchTerm]);

  const fetchTopHeadlines = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsHeadlines(data.articles);
      })
      .catch((error) => console.error('Error:', error));
  };

  const fetchNewsHeadlinesWithSearch = () => {
    fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsHeadlines(data.articles);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleSearch = () => {
    fetchNewsHeadlinesWithSearch();
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="news-aggregator">
      <h2>News Aggregator</h2>
      <div className='news'>
        <div className="news-list">

          {newsHeadlines.map((news, index) => (
            // Check if it's not the first card (index > 0) before rendering
            index > 0 && (
              <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20" key={index}>
                <div className="flex justify-center md:justify-end -mt-16">
                  <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src={news.urlToImage || 'placeholder.jpg'} alt="News" />
                </div>
                <div>
                  <h2 className="text-gray-800 text-3xl font-semibold">{news.title}</h2>
                  <p className="mt-2 text-gray-600">{news.author} && By {news.author}</p>
                  <p className="mt-2 text-gray-600">{news.description}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <a href={news} target="_blank" rel="noopener noreferrer" className="text-xl font-medium text-indigo-500">
                    Read More
                  </a>
                </div>
              </div>
            )
          ))}
        </div>

        <div className='middle'>
          <div className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Enter a topic or keyword..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
      </div>
      );
};

      export default NewsAggregator;
