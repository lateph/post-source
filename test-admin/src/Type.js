import React, { Component }  from 'react';
import { Create, SimpleForm, TextInput, LongTextInput, List, Datagrid, TextField, Edit } from 'react-admin';

export const TypesList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="desc" />
            <TextField source="total" />
        </Datagrid>
    </List>
);

export const TypesCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <LongTextInput source="desc" />
        </SimpleForm>
    </Create>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};
    
export const TypesEdit = props => (
    <Edit title={<PostTitle />} {...props} undoable={false}>
        <SimpleForm>
            <TextInput source="name" />
            <LongTextInput source="desc" />
        </SimpleForm>
    </Edit>
);