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
              src={news.urlToImage || 'placeholder.jpg'} // Use a placeholder image if 'urlToImage' is missing
              alt="News Thumbnail"
              effect="blur" // Optional effect for loading the image
              height={100} // Set the desired height of the image
              width={150} // Set the desired width of the image
              // Additional image props can be added here, like 'className', 'style', etc.
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

export default NewsAggregator;
