import React from 'react';
import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, DisabledInput, TextInput, Create } from 'react-admin';

export const UserList = props => (
    <List {...props}  bulkActionButtons={false}>
        <Datagrid rowClick="edit">
            <EmailField source="email" />
            <TextField source="firstName" />
            <TextField source="lastName" />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Edit>
);


export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Create>
);
