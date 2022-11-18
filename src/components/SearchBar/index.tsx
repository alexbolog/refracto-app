import React from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = React.useState('');
  React.useEffect(() => {
    // window.alert(searchInput);
  }, [searchInput]);
  return (
    <div className='input-group search-area'>
      <input
        type='text'
        className='form-control  disabled'
        placeholder='Search for a project'
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <span className='input-group-text'>
        <a href='#'>
          <svg
            width='15'
            height='15'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z'
              fill='#01A3FF'
            />
          </svg>
        </a>
      </span>
    </div>
  );
};

export default SearchBar;
