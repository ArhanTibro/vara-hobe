//import React from 'react'
import { useEffect } from "react";
import Footer from "../Components/Footer";
import List from "../Components/List";
//import SearchBox from "../Components/SearchBox";

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <List />
      <Footer />
    </div>
  );
};

export default Search;
