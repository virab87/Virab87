import "../search/Search.css"
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts, selectProducts } from "./SearchSlice";
import { useSearchParams } from "react-router-dom";

function Search() {

    const dispatch = useDispatch()
    const products = useSelector(selectProducts)

    useEffect(() => {
        dispatch(getProducts())
    }, [])
 
    const [searchParams, setSearchParams] = useSearchParams()
    const categoryQuery = +searchParams.get("category")
    const genderQuery = +searchParams.get("gender")
    const subCategoryQuery = +searchParams.get("sub_category")
    const searchQuery = searchParams.get("search")
    console.log(searchQuery,"searchQuery55");
    return (
        <div>
            <div className="search">
                <div className="elements">
                    <input placeholder="Search" type="text" value={searchQuery  ? searchQuery : ""}  onChange={(e) => {
                        setSearchParams({
                            gender: genderQuery,
                            category: categoryQuery,
                            sub_category: subCategoryQuery,
                            search: e.target.value
                        })
                    }} />
                    <div className="icon">
                        <SearchIcon />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Search