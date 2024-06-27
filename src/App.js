import React, { useState } from 'react'
import "./App.css"
import Categories from "./features/categories/Categories"
import Search from './features/search/Search';
import SubCategories from './features/subCategories/SubCategories';
import { useSearchParams } from "react-router-dom";
import Products from './features/products/Products';
import Filter from './features/firstbox/Filter';




function App() {

  const [searchParams, setSearchParams] = useSearchParams()

  const genderQuery = +searchParams.get("gender")






  return (
    <div className='App'>
      <div className='total'>
        <Filter />
        <div className="secondBox">
          <Search />
          <Categories searchParams={searchParams} setSearchParams={setSearchParams} genderQuery={genderQuery} />
          <SubCategories genderQuery={genderQuery} />
          <Products genderQuery={genderQuery} />
        </div>
      </div>
    </div>
  );
}

export default App;
