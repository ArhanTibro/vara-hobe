//import React from 'react'
import Footer from "../Components/Footer";
import List from "../Components/List";
import Navbar from "../Components/Navbar";
import SearchBox from "../Components/SearchBox";

const Search = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <SearchBox />
      <List />
      <Footer />
    </div>
  );
};

export default Search;
