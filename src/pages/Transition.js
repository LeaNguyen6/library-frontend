import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import Button from '@material-ui/core/Button';

export default function Transition(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'User', field: 'user', lookup: props.listUsers },
      { title: 'Book', field: 'book', lookup: props.listBooks },
      { title: 'Time Start', field: 'timeStart', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { city1: 'İstanbul', city2: 'Şanlıdddurfa' },
      },
    ],
    data: [
      { user: 'Mehmet', book: 'Baran', birthYear: 1987, birthCity: 'city2' },
      {
        user: 'Zerya Betül',
        book: 'Baran',
        birthYear: 2017,
        birthCity: 'city1',
      },
    ],
  });
  useEffect(() => {
    // axios({
    //   method: 'get',
    //   url: 'https://27--rest-api.glitch.me/api/book/all',
    // })
    //   .then(function (res) {
    //     //console.log(res.data)
    //    // let listBooks = {}
    //     for (let i = 0; i < res.data.length; i++) {
    //       state.listBooks[res.data[i]._id] = res.data[i].title
    //     }
    //   //  console.log(listBooks)
    //     //let listBook=res.data.map(x=>{return {_id:x._id,user:'name',book:x.book.title,timeStart:x.timeStart.slice(0, 10)}})
    //    // setState({ ...state, columns: [...state.columns, { title: 'Book', field: 'book' }] })
    //     console.log(state)
    //   })
    //   .catch(err => console.log(err));
    //get transition
    axios({
      method: 'get',
      url: 'https://27--rest-api.glitch.me/api/transaction/all',
    })
      .then(function (res) {
        //console.log(res.data)
        //  let data = res.data.map(x => { return { _id: x._id, user: 'name', book: x.book._id, timeStart: x.timeStart.slice(0, 10) } })
        setState({ ...state, data: res.data })
      })
      .catch(err => console.log(err)).then(() => console.log(state));

  }, [])
  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) => {
          console.log(newData)
          return axios({
            method: 'post',
            url: 'https://27--rest-api.glitch.me/api/transaction',
            data: newData
          }).then(res => {
            console.log(res)
            setState((prevState) => {
              const data = [...prevState.data];
              data.push({...newData,timeStart:new Date().toISOString()});
              return { ...prevState, data };
            });
          })
        }
        ,
        onRowUpdate: (newData, oldData) =>
          axios({
            method: 'put',
            url: `https://27--rest-api.glitch.me/api/transaction/${oldData._id}`,
            data: newData
          })
            .then(res => {
              console.log(res)
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }),
        onRowDelete: (oldData) =>
          axios({
            method: 'delete',
            url: `https://27--rest-api.glitch.me/api/transaction/${oldData._id}`,

          }).then(res => {
            //  console.log(res)
            // if (oldData) {
            setState((prevState) => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });
            // }
          })
      }}
    />
  );
}
