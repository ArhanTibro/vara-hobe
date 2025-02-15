//import React from 'react'
import Footer from "../Components/Footer";
import List from "../Components/List";
import SearchBox from "../Components/SearchBox";

const Search = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SearchBox />
      <List />
      <Footer />
    </div>
  );
};

export default Search;
