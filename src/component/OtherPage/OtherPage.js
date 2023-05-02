import React from "react";
import { Route, Routes } from "react-router-dom";
// import Footer from "./Footer";
// import FreshFavorites from "./FreshFavorites";
import SearchResult from "./SearchResult";
import ViewProfile from "./ViewProfile";
import AddUpdate from "./AddUpdate";

function OtherPage(){
    return (
        <div>
        <Routes>
            <Route path="search_result" element={<SearchResult/>}/>
            <Route path="view_profile" element={<ViewProfile/>}/>
            <Route path="add_update" element={<AddUpdate/>}/>
        </Routes>
            {/* <Footer/> */}
            {/* <FreshFavorites/> */}
        </div>
    )
}

export default OtherPage

