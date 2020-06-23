import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CardBook from '../components/CardBook'
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import apiCaller from '../apiCaller'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function BookList() {
    const [pagination, setPage] = useState({})
    const [listBooks, setData] = useState([])
    const handleChange = (event, value) => {
//        console.log(value, pagination)
        setPage({ ...pagination, currentPage: value});

    };

    useEffect(() => {
        apiCaller('api/book/all','get').then((res) => {
            setData(res.data)
            let pagination = { perPage: 5, currentPage: 1, count: Math.ceil(res.data.length / 5) }
         //   console.log(pagination)
            setPage(pagination)
            }).catch(err => { console.log(err) })
    }, [])
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography>Page: {pagination.count} {pagination.currentPage}</Typography>
            <Router>
                <Route>
                    {({ location }) => {
                        const query = new URLSearchParams(location.search);
                        const page = parseInt(query.get("page") || "1", 10);
                        return (
                            <Pagination
                                onChange={handleChange}
                                color="primary"
                                page={page}
                                count={pagination.count}
                                renderItem={item => (
                                    <PaginationItem
                                        component={Link}
                                        to={`${item.page === 1 ? "" : `?page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />
                        );
                    }}
                </Route>
            </Router>

            <Grid container spacing={3}>
                {listBooks.slice((pagination.currentPage-1) * pagination.perPage, pagination.currentPage * pagination.perPage).map(x => {
                    return <Grid item xs={4} key={x._id} >
                        <CardBook bookDetail={x} />
                    </Grid>
                })}
            </Grid>
        </div>
    );
}
