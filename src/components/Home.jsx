import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './NewsAggregator.css';

const API_KEY = '6cbdef411b3b47529a17b5cf4667303b'; // Replace with your NewsAPI key

const Home = () => {
  const [newsHeadlines, setNewsHeadlines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Define the fetchData function within useEffect to avoid the missing dependency warning
    const fetchData = () => {
      if (searchTerm.trim() === '') {
        fetchTopHeadlines();
      } else {
        fetchNewsHeadlinesWithSearch();
      }
    };

    fetchData(); // Call fetchData

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]); // searchTerm is a dependency

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

      <div className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Enter a topic or keyword..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="news-list">
        {newsHeadlines.map((news, index) => (
          <div key={index} className="news-item">
            <LazyLoadImage
              src={news.urlToImage || 'placeholder.jpg'}
              alt="News Thumbnail"
              effect="blur"
              height={100}
              width={150}
            />
            <h3>{news.title}</h3>
            {news.author && <p>By {news.author}</p>}
            <p>{news.description}</p>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
