// in src/MyUrlField.js
import React from 'react';

const MyUrlField = ({ record = {}, source }) =>
    <img src={'http://localhost:3030/thumb/'+record['id']+record[source]} />

export default MyUrlField;