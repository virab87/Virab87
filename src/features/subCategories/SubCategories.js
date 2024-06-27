import React, { useEffect, useState } from 'react';
import { addSubCategory, getSubCategories, selectSubCategories, } from './SubCategoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import "../subCategories/SubCategories.css"
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';




function SubCategories({ genderQuery }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [searchParams, setSearchParams] = useSearchParams()

    const subCategoryQuery = +searchParams.get("sub_category")
    const categoryQuery = +searchParams.get("category")
    // const searchQuery = searchParams.get("search")
    // const filterQuery = searchParams.get("filter")



    const dispatch = useDispatch()

    const subCategories = useSelector(selectSubCategories)

    useEffect(() => {
        dispatch(getSubCategories())
    }, [])

    const [text, setText] = useState("")

    return (
        <div className='subCategories'>
            {

                subCategories.map((value) => {
                    return (
                        value.category === categoryQuery &&
                        <div key={value.id}>
                            <div className='value' onClick={() => {
                                setSearchParams({
                                    gender: genderQuery,
                                    category: categoryQuery,
                                    sub_category: value.id,
                                })
                            }} style={{
                                borderBottom: subCategoryQuery === value.id ? "2px solid blue" : "2px solid transparent",
                            }}>
                                {value.title}
                            </div>

                        </div>
                    )
                })
            }

            <div className="addSubCategory" style={{
                display: categoryQuery ? "flex" : "none"
            }}>
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
                    <p>Add Subcategory</p>
                </DialogTitle>
                <DialogContent>
                    <div className="sub">

                        <TextField id="standard-basic" label="Subcategory" variant="standard" value={text} onChange={(e) => {
                            setText(e.target.value)
                        }} />
                        <Button variant="contained" id="addBtn" onClick={() => {
                            if (text.length !== 0) {
                                dispatch(addSubCategory({ text, categoryQuery })).then(() => { dispatch(getSubCategories()) })
                                setOpen(false)
                                setText("")
                            } else {
                                alert("you must add subcategory")
                            }

                        }}>Add</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default SubCategories