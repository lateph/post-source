import React from 'react';
import { List, Datagrid, ReferenceField, ReferenceInput,SelectInput,
    TextField, EmailField, Edit, SimpleForm, DisabledInput, TextInput, Create, FormDataConsumer, Labeled, FileInput, FileField,
    LongTextInput, RadioButtonGroupInput, ImageInput, ImageField, ReferenceArrayInput,SelectArrayInput,ChipField, ReferenceArrayField, SingleFieldList } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import MyImgField from './MyImgField'
import Typography from '@material-ui/core/Typography';

export const SourcesList = props => (
    <List   {...props}  bulkActionButtons={false}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <ReferenceField label="User" source="creator" reference="users">
                <TextField source="email" />
            </ReferenceField>
            <TextField source="category" />
            <ReferenceField label="Type" source="type" reference="types">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField label="Tags" reference="tags" source="tags">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </Datagrid>
    </List>
);

export const SourcesEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <TextInput source="title" />
            <LongTextInput source="shortDesc" />
            <RichTextInput source="desc" />
            <RadioButtonGroupInput source="category" choices={[
                { id: 'Free', name: 'Free' },
                { id: 'Trial', name: 'Trial' },
                { id: 'Paid', name: 'Paid' },
            ]} />
            <ReferenceInput label="Type" source="type" reference="types">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceArrayInput reference="tags" source="tags" label="Tags">
                <SelectArrayInput>
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>
            <ImageInput source="thumb" label="Thumbnail" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <FileInput source="file" label="File" placeholder={<p>Drop your file here</p>}>
                <FileField source="src" title="title" />
            </FileInput>
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
            <ReferenceInput label="Type" source="type" reference="types">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceArrayInput reference="tags" source="tags" label="Tags">
                <SelectArrayInput>
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>
            <ImageInput source="thumb" label="Thumbnail" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <FileInput source="file" label="File" placeholder={<p>Drop your file here</p>}>
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);
