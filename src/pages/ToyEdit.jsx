import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@mui/material"

import React from 'react'
import { Formik, Form, Field, useFormik } from 'formik'
import * as Yup from 'yup'

// const { useState, useEffect } = React
// const { Link, useNavigate, useParams } = ReactRouterDOM

const initialValues = {
    name: '',
    price: '',
}

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.number().integer()
        .min(0, 'Below zero')
        .required('Required'),
});

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()


    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            console.log(values);
            onSaveToy()
        }
    })

    console.log(touched)

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => {
                values.name = toy.name
                values.price = toy.price
                setToyToEdit(toy)
            })
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    // function handleChange({ target }) {
    //     let { value, type, name: field } = target
    //     value = type === 'number' ? +value : value
    //     setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    // }

    function onSaveToy() {
        // ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 1000
        setToyToEdit(toyToSave => {
            toyToSave.name = values.name
            toyToSave.price = values.price
            return toyToSave
        })
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }


    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <Formik>
                <Form className="form-edit-toy" onSubmit={handleSubmit} >
                    <label htmlFor="name">Name : </label>
                    <Field type="text"
                        name="name"
                        id="name"
                        placeholder="Enter name..."
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                        <p>{errors.name}</p>
                    )}
                    <label htmlFor="price">Price : </label>
                    <Field type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.price && touched.price && (
                        <p>{errors.price}</p>
                    )}

                    <div>
                        <Button type="submit" variant="contained" >{toyToEdit._id ? 'Save' : 'Add'}</Button>&nbsp;
                        <Button type="button" variant="contained" > <Link to="/toy">Cancel</Link></Button>
                    </div>
                </Form>
            </Formik>
        </section>
    )
}