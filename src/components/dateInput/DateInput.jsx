
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
const Index = ({ list, type, selected, setSelected }) => {
    return (
        <Autocomplete
            options={list}
            value={selected && selected.toString()}
            onChange={
                (...val) => {
                    if (val[1]) {
                        setSelected(Number(val[1]))
                    } else {
                        setSelected(null)

                    }
                }
            }
            renderInput={(params) => {
                return (<TextField
                    placeholder={`انتخاب ${type}`} {...params} />)
            }}
        />
    );
}
export default Index;