import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import Button from '@material-ui/core/Button';

export default function Transition(props) {
  const [state, setState] = useState({});
  let addData = (newData) => {
    console.log(newData)
    return axios({
      method: 'post',
      url: 'https://27--rest-api.glitch.me/api/transaction',
      data: newData
    }).then(res => {
      console.log(res)
      setState((prevState) => {
        const data = [...prevState.data];
        data.push({ ...newData, timeStart: new Date().toISOString() });
        return { ...prevState, data };
      });
    })
  }
  let updateData = (newData, oldData) =>
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
      })
  let deleteData = (oldData) =>
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
  async function getData() {
    let listUsers = {}
    let listBooks = {}
    let data = []
    await axios.get('https://27--rest-api.glitch.me/api/user')
      .then(function (res) {
        for (let i = 0; i < res.data.length; i++) {
          listUsers[res.data[i]._id] = res.data[i].name
        }
      })
      .catch(err => console.log(err));
    await axios.get('https://27--rest-api.glitch.me/api/book/all')
      .then(function (res) {
        for (let i = 0; i < res.data.length; i++) {
          listBooks[res.data[i]._id] = res.data[i].title
        }
      })
      .catch(err => console.log(err));
    await axios.get('https://27--rest-api.glitch.me/api/transaction/all')
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
          width:100,
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
      title="Editable Example"
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
