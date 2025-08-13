import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocationClick, variant = 'default' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsInvalid(false);
      onSearch(query.trim());
    } else {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 2000);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsInvalid(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setQuery('');
      setIsInvalid(false);
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (isInvalid) {
      setIsInvalid(false);
    }
  };

  const handleLocationClick = () => {
    if (onLocationClick) {
      setIsLocationLoading(true);
      onLocationClick();
      setTimeout(() => setIsLocationLoading(false), 3000);
    }
  };

  useEffect(() => {
    if (variant === 'sticky') {
      inputRef.current?.focus();
    }
  }, [variant]);

  const getPlaceholder = () => {
    if (window.innerWidth <= 480) {
      return "Search city, ZIP code...";
    }
    return "Search ZIP code, coordinates, landmarks, town, city…";
  };

  return (
    <form className={`search-bar ${variant}`} onSubmit={handleSubmit}>
      <div className={`search-input-container ${isFocused ? 'focused' : ''} ${isInvalid ? 'invalid' : ''}`}>
        <FaSearch className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="search-input"
          aria-label="Search for weather by location"
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? "search-error" : undefined}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
        {onLocationClick && (
          <button
            type="button"
            onClick={handleLocationClick}
            className={`location-button ${isLocationLoading ? 'loading' : ''}`}
            aria-label="Get weather for my current location"
            disabled={isLocationLoading}
          >
            {isLocationLoading ? '⏳' : '📍'}
          </button>
        )}
        <button
          type="submit"
          className="search-button"
          aria-label="Search weather"
        >
          <FaSearch />
        </button>
      </div>
      {isInvalid && (
        <div id="search-error" className="error-message" role="alert">
          Please enter a location to search
        </div>
      )}
    </form>
  );
};

export default SearchBar;
