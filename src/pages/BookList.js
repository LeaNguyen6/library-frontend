import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import CardBook from '../components/CardBook'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';

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

        axios.get('https://27--rest-api.glitch.me/api/book/all').then(res => {
            setData(res.data)
            // console.log(listBooks)
        }
        )
            .catch(err => console.log(err));
    }, [])
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Pagination
               // count={listBooks.length}
                // renderItem={(item) => <PaginationItem {...item}/>}
                color="primary">
                <PaginationItem>1</PaginationItem>
                <PaginationItem>2</PaginationItem>

            </Pagination>
            <Grid container spacing={3}>
                {listBooks.map(x => {
                    return <Grid item xs={4} key={x._id} >
                        <CardBook bookDetail={x} />
                    </Grid>
                })}
            </Grid>
        </div>
    );
}
