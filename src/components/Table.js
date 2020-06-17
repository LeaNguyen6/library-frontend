import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import './Table.css'
import axios from 'axios'

export default function Table() {
    const [state, setState] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },

        ],
        data: [],
    });
    //Didmount always
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://27--rest-api.glitch.me/api/user',
        })
            .then(function (res) {
                //console.log(res.data)
                setState({ ...state, data: res.data })
            })
            .catch(err => console.log(err));
    }, [])



    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    axios({
                        method: 'post',
                        url: 'https://27--rest-api.glitch.me/api/register',
                        data: newData
                    }).then(res => {
                       // console.log(res)
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return { ...prevState, data };
                        });
                    }),
                onRowUpdate: (newData, oldData) =>
                    axios({
                        method: 'put',
                        url: `https://27--rest-api.glitch.me/api/user/${oldData._id}`,
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
                onRowDelete: (oldData) => {
                    // console.log(oldData)
                    return axios({
                        method: 'delete',
                        url: `https://27--rest-api.glitch.me/api/user/${oldData._id}`,

                    }).then(res => {
                        //  console.log(res)
                        // if (oldData) {
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        });
                        // }
                    });
                }


            }}
        />
    );
}
// onRowDelete: (oldData) => new Promise((resolve) => {
//     setTimeout(() => {
//         resolve();
//         setState((prevState) => {
//             const data = [...prevState.data];
//             data.splice(data.indexOf(oldData), 1);
//             return { ...prevState, data };
//         });
//     }, 600);

//     axios({
//         method: 'delete',
//         url: `https://27--rest-api.glitch.me/api/user/${oldData._id}`,

//     }).then(res => console.log(res));
// }),