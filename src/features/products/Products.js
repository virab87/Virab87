import { addProducts, getProducts, selectProducts } from "./ProductsSlice"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import "../products/Products.css"
import { useSearchParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import UploadImg from "../imagesUploading/imagesUploading";




function Products() {
    const [code, setCode] = useState("")
    const [price, setPrice] = useState("")
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const genders = [{
    //     id: 1,
    //     name: "female"
    // },
    // {
    //     id: 2,
    //     name: "male"
    // }]

    const dispatch = useDispatch()
    const products = useSelector(selectProducts)

    useEffect(() => {
        dispatch(getProducts())
    }, [])


    const [searchParams, setSearchParams] = useSearchParams()

    const subCategoryQuery = +searchParams.get("sub_category")

    const searchQuery = searchParams.get("search")
    const filterMinQuery = searchParams.get("filterMin")
    const filterMaxQuery = searchParams.get("filterMax")

    const productsFilter = products.filter(value => value.subCategory === subCategoryQuery)
    const priceFilter = productsFilter.filter(val => (val.price >= filterMinQuery && val.price <= filterMaxQuery))
    const searchFilter = productsFilter.filter(item => (item.code?.toLowerCase().includes(searchQuery?.toLowerCase())))

    const searchPriceFilter = productsFilter.filter(val => (val.price >= filterMinQuery && val.price <= filterMaxQuery)).filter(item => (item.code?.toLowerCase().includes(searchQuery?.toLowerCase())))


    console.log(priceFilter, "priceFilter45");

    return (


        <div className="products">
            <div className="productsBox" >
                {
                    ((!!priceFilter.length && searchFilter.length === 0 && priceFilter) || (!!searchFilter.length && priceFilter.length === 0 && searchFilter) || (!!priceFilter.length && !!searchFilter.length && searchPriceFilter) || productsFilter).map(value => {
                        return <div className="productsMap" key={value.id}>
                            <div className="img">
                                <img src={value.image} />
                            </div>
                            <div className="title">
                                {value.code}
                                <h4>{value.price}$</h4>
                            </div>
                        </div>
                    })
                }

            </div>

            <div
                className="addProduct"
                style={{
                    display: subCategoryQuery ? "flex" : "none"
                }}
                onClick={() => {
                    handleClickOpen()
                }}>
                <AddIcon />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="dialog">
                    <p>Add Product</p>
                </DialogTitle>
                <DialogContent>
                    <div className="boxes">

                        <Button variant="contained" component="label" id="upload">
                            <AddAPhotoOutlinedIcon />
                            <UploadImg images={images} setImages={setImages} />

                        </Button>

                        <TextField id="standard-basic" label="Code" variant="standard" value={code} onChange={(e) => {
                            setCode(e.target.value)
                        }} />

                        <TextField id="standard-basic1" label="Price" variant="standard" value={price} onChange={(e) => {
                            setPrice(e.target.value)
                        }} />

                    </div>
                    <div className="button">
                        <Button variant="contained" id="btn" onClick={() => {
                            if (code.length !== 0 && price.length !== 0 && images.length !== 0) {
                                dispatch(addProducts({ code, price, images, subCategoryQuery }))
                                setCode("")
                                setPrice("")
                                setImages("")
                                setOpen(false)
                            } else {
                                alert("you must write all fields")
                            }
                        }}>Add</Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}
export default Products