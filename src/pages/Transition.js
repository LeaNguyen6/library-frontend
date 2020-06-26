import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import apiCaller from '../apiCaller'

export default function Transition(props) {
  const [state, setState] = useState({});
  let addData = (newData) => {
    //console.log(newData)
    return apiCaller('api/transaction', 'post', newData).then((res) => {
      //  console.log(res.status, res.data, user)
      setState((prevState) => {
        const data = [...prevState.data];
        data.push({ ...newData, timeStart: new Date().toISOString() });
        return { ...prevState, data };
      })
    })
      .catch(err => { console.log(err) })
  }
  let updateData = (newData, oldData) =>
    apiCaller(`api/user/${oldData._id}`, 'put', newData).then((res) => {
      if (oldData) {
        setState((prevState) => {
          const data = [...prevState.data];
          data[data.indexOf(oldData)] = newData;
          return { ...prevState, data };
        });
      }
    }).catch(err => { console.log(err) })

  let deleteData = (oldData) =>
    apiCaller(`api/user/${oldData._id}`, 'delete').then((res) => {
      setState((prevState) => {
        const data = [...prevState.data];
        data.splice(data.indexOf(oldData), 1);
        return { ...prevState, data };
      });
    }).catch(err => { console.log(err) })

  async function getData() {
    let listUsers = {}
    let listBooks = {}
    let data = []
    await apiCaller('api/user/all', 'get')
      .then(function (res) {
        for (let i = 0; i < res.data.length; i++) {
          listUsers[res.data[i]._id] = res.data[i].name
        }
      })
      .catch(err => console.log(err));
    await apiCaller('api/book/all', 'get')
      .then(function (res) {
        for (let i = 0; i < res.data.length; i++) {
          listBooks[res.data[i]._id] = res.data[i].title
        }
      })
      .catch(err => console.log(err));
    await apiCaller('api/transaction/all', 'get')
      .then(function (res) {
        data = res.data
      })
      .catch(err => console.log(err)).then(() => console.log(state));
    let newData = {
      columns: [
        { title: 'User', field: 'user', lookup: listUsers },
        { title: 'Book', field: 'book', lookup: listBooks },
        {
          title: 'Status',
          field: 'isComplete',
          width: 100,
          render: rowData => (
            <Button
              onClick={(event) => alert(event.target)}
              color="primary"
              variant="contained"
              style={{ textTransform: 'none' }}
              size="small"
            >
              {(rowData.isComplete) || 'done'}

            </Button>

          ),
        },
        { title: 'Time Start', field: 'timeStart', type: 'numeric' },
      ],
      data: data
    }
    setState(newData)

  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <MaterialTable
      title="List Transactions"
      columns={state.columns}
      data={state.data}

      editable={{
        onRowAdd: addData,
        onRowUpdate: updateData,
        onRowDelete: deleteData
      }}
    />
  );
}
