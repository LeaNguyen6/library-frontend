import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

import apiCaller from '../apiCaller'

export default function Table() {
    const [state, setState] = useState({
        columns: [
            {
                title: 'Avatar',
                field: 'avatar',
                width: 50,
                render: rowData => (
                    <img
                        style={{ height: 36, borderRadius: '50%' }}
                        alt='avatar'
                        src={rowData.avatar || 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'}
                    />
                ),
            },
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },

        ],
        data: [],
    });
    //Didmount always
    useEffect(() => {
        apiCaller('auth/user', 'get').then((res) => {
            setState({ ...state, data: res.data })
        }).catch(err => { console.log(err) })

    }, [state])



    return (
        <MaterialTable
            title="List Users"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) => apiCaller('api/register', 'post', newData).then((res) => {
                    //  console.log(res.status, res.data, user)
                    setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                    })
                })
                    .catch(err => { console.log(err) })
                ,
                onRowUpdate: (newData, oldData) =>
                    apiCaller(`api/user/${oldData._id}`, 'put', newData).then((res) => {
                        if (oldData) {
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                            });
                        }
                    }).catch(err => { console.log(err) })
                ,
                onRowDelete: (oldData) => {
                    return apiCaller(`api/user/${oldData._id}`, 'delete').then((res) => {
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        });
                    }).catch(err => { console.log(err) })
                }

            }}
        />
    );
}
