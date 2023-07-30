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

};

export default NewsAggregator;
