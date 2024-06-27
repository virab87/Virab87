import "../categories/Categories.css"
import { useDispatch, useSelector } from "react-redux"
import Face3Icon from '@mui/icons-material/Face3';
import Face6Icon from '@mui/icons-material/Face6';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { addCategory, getCategories, selectCategories } from "./CategoriesSlice";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import axios from "axios"
import UploadImg from "../imagesUploading/imagesUploading";
import * as React from 'react';
import { useSearchParams } from "react-router-dom";
import Gender from "../gender/Gender";
import { Height } from "@mui/icons-material";



function Categories({ searchParams, setSearchParams, genderQuery }) {

    const [images, setImages] = useState([]);
    const [gender, setGender] = useState("")
    // const [selectGender, setSelectGender] = useState("")
    const [text, setText] = useState("")
    // const [selected, setSelected] = useState({})
    const categoryQuery = +searchParams.get("category")


    const dispatch = useDispatch()
    const categories = useSelector(selectCategories)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const genders = [{
        id: 1,
        name: "femail"
    },
    {
        id: 2,
        name: "male"
    }]

    return (
        <div className="default">
            <div className="gender">
                <Gender searchParams={searchParams} setSearchParams={setSearchParams} genderQuery={genderQuery} genders={genders} />
            </div>
            <div className="category" >
                {
                    categories.filter(obj => obj.gender === genderQuery).map((obj) => {
                        return (
                            <div className="cat" key={obj.id} onClick={() => {
                                setSearchParams({
                                    gender: genderQuery,
                                    category: obj.id,
                                })

                            }} style={{
                                border: categoryQuery === obj.id ? "2px solid grey" : "transparent"
                            }}>
                                <img src={obj.image} />
                                <div className="text" >{obj.title}</div>
                            </div>
                        )
                    })
                }

            </div>

            <div className="addCategory">
                <AddIcon onClick={() => {
                    handleClickOpen()
                }} />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <p>Add Category</p>
                </DialogTitle>
                <DialogContent>
                    <div className="area">
                        <div className="buttons">
                            {
                                genders.map((obj) => {
                                    return (
                                        <Button variant="outlined" key={obj.id} id="femaleBtn" onClick={() => {
                                            setSearchParams({
                                                gender: obj.id
                                            })
                                        }}>
                                            {
                                                obj.id === 1
                                                    ? <Face3Icon color={obj.id === genderQuery ? 'primary' : 'disabled'} />
                                                    : <Face6Icon color={obj.id === genderQuery ? 'primary' : 'disabled'} />
                                            }
                                            {obj.name}
                                        </Button>
                                    )
                                })
                            }

                        </div>
                        <TextField id="standard-basic" label="Category" variant="standard" value={text} onChange={(e) => {
                            setText(e.target.value)

                        }} />
                        <Button variant="contained" component="label" id="upload">
                            <AddAPhotoOutlinedIcon />
                            <UploadImg images={images} setImages={setImages} />

                        </Button>
                        <Button variant="contained" id="addBtn" onClick={() => {
                            if (gender !== 0 && text.length !== 0 && images.length !== 0) {
                                dispatch(addCategory({ text, genderQuery, images }))
                                setText("")
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
export default Categories