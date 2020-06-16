import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import CardBook from '../components/CardBook'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function BookList() {
    const [listBooks, setData] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://27--rest-api.glitch.me/api/book/all',
        })
            .then(res => {
                setData(res.data)
                console.log(listBooks)
            }
            )
            .catch(err => console.log(err));
    }, [])
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination count={listBooks.length} color="primary"></Pagination>
            {listBooks.map(x => 
            <CardBook key={x._id} id={x._id} title={x.title} description={x.description} coverUrl={x.coverUrl} />)}
        </div>
    );
}
