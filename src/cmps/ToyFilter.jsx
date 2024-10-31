// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target

        if (type === 'select-multiple') {
            console.log(target.selectedOptions)
            value = Array.from(target.selectedOptions, option => option.value || [])
            console.log('value:', value)
        }

        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Search name" variant="outlined" type="text"
                    name="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <TextField id="outlined-basic" label="Max price" variant="outlined" type="number"
                    name="maxPrice"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <FormControl sx={{ m: 1, width: 300 }}>

                    <InputLabel id="demo-multiple-checkbox-label">Labels</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        onChange={handleChange}
                        input={<OutlinedInput label="Labels" />}
                        renderValue={(selected) => Array.isArray(selected)? selected.join(', ') : selected}
                        MenuProps={MenuProps}

                        name="labels"
                        value={[...filterByToEdit.labels]}
                    >
                        {toyService.getLabelsList().map((label) => (
                            <MenuItem key={label} value={label}>
                                <Checkbox checked={filterByToEdit.labels.includes(label)} />
                                <ListItemText primary={label} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>

                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Status"
                        name="inStock"
                        value={filterByToEdit.inStock}
                        onChange={handleChange}
                    >
                        <MenuItem value="">All</MenuItem >
                        <MenuItem value="inStock">In Stock</MenuItem >
                        <MenuItem value="outOfStock">Out of Stock</MenuItem >

                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Sort by</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Age"
                        name="sortBy"
                        value={filterByToEdit.sortBy}
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="price">Lowest Price to highest</MenuItem>
                        <MenuItem value="createdAt">Newest to oldest</MenuItem>

                    </Select>
                </FormControl>


            </Box>
        </section>
    )
}