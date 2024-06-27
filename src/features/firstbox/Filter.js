import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./Filter.css"
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from "../products/ProductsSlice"




function Filter() {

    const [searchParams, setSearchParams] = useSearchParams()
    const genderQuery = +searchParams.get("gender")
    const categoryQuery = +searchParams.get("category")
    const subCategoryQuery = +searchParams.get("sub_category")
    const searchQuery = searchParams.get("search")
    // const filterMinQuery = searchParams.get("filterMin")
    // const filterMaxQuery = searchParams.get("filterMax")

    function valuetext(value) {
        return `${value}°C`;
    }

    const [value, setValue] = useState([0, 2500])
    const min = value[0]
    const max = value[1]

    const handleChange = (event, newValue) => {
        setValue(newValue)

    }
    return (
        <div className='first'>
            <div className="div">
                <div className='price'>
                    <h4>Price</h4>

                    <Box sx={{ width: 300 }}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0}
                            max={2500}
                        />

                    </Box>
                    <div className='inputs'>
                        <input id='ipt1' value={min} />
                        -
                        <input id='ipt2' value={max} />
                    </div>
                </div>
            </div>
            <button id="save" onClick={() => {
                setSearchParams({
                    gender: genderQuery,
                    category: categoryQuery,
                    sub_category: subCategoryQuery,
                    search: searchQuery ? searchQuery : '',
                    filterMin: value[0],
                    filterMax: value[1]
                })

            }}>Save</button>

          
        </div>
    )
}
export default Filter