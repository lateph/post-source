import React, { Component }  from 'react';
import { Create, SimpleForm, TextInput, LongTextInput, List, Datagrid, TextField, Edit } from 'react-admin';

export const TagsList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="desc" />
            <TextField source="total" />
        </Datagrid>
    </List>
);

export const TagsCreate = props => (
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
    
export const TagsEdit = props => (
    <Edit title={<PostTitle />} {...props} undoable={false}>
        <SimpleForm>
            <TextInput source="name" />
            <LongTextInput source="desc" />
        </SimpleForm>
    </Edit>
);