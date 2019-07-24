import React from 'react';
import { List, Datagrid, 
    TextField, EmailField, Edit, SimpleForm, DisabledInput, TextInput, Create, 
    LongTextInput, RadioButtonGroupInput, ImageInput, ImageField, ReferenceArrayInput,SelectArrayInput,ChipField } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import MyImgField from './MyImgField'

export const SourcesList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <TextField source="shortDesc" />
            <MyImgField source="thumb" title="title" />
        </Datagrid>
    </List>
);

export const SourcesEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Edit>
);


export const SourcesCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <LongTextInput source="shortDesc" />
            <RichTextInput source="desc" />
            <RadioButtonGroupInput source="category" choices={[
                { id: 'Free', name: 'Free' },
                { id: 'Trial', name: 'Trial' },
                { id: 'Paid', name: 'Paid' },
            ]} />
            <ReferenceArrayInput reference="tags" source="tags" label="Tags">
                <SelectArrayInput>
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>
            <ImageInput source="thumb" label="Thumbnail" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Create>
);
