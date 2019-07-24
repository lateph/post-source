import React, { Component }  from 'react';
import { Admin, Resource, ListGuesser, CreateGursser } from 'react-admin';
import feathersClient from './feathersClient';
import { restClient, authClient } from 'ra-data-feathers';
import { TagsCreate, TagsList, TagsEdit } from './tags'
import { TypesCreate, TypesList, TypesEdit } from './Type'
import { UserEdit, UserList, UserCreate } from './users'
import { SourcesEdit, SourcesList, SourcesCreate } from './sources'
import addUploadFeature from './addUploadFeature';

const restClientOptions = {
  id: '_id', // In this example, the database uses '_id' rather than 'id'
  usePatch: true // Use PATCH instead of PUT for updates
};

const authClientOptions = {
    storageKey: 'feathers-jwt',
    authenticate: { strategy: 'local' }
  };

const fdp = restClient(feathersClient, restClientOptions)
const App = () => (
  <Admin
    title='ra-data-feathers Example'
    dataProvider={addUploadFeature(fdp)}
    authProvider={authClient(feathersClient, authClientOptions)}
  >
        {permissions => [
            <Resource name='tags' list={TagsList} create={TagsCreate} edit={TagsEdit} />,
            <Resource name='types' list={TypesList} create={TypesCreate} edit={TypesEdit}/>,
            <Resource name='users' list={UserList} create={UserCreate} edit={UserEdit}/>,
            <Resource name='sources' list={SourcesList} create={SourcesCreate} edit={SourcesEdit}/>
        ]}
  </Admin>
);

// const App = () => (
//   <Admin
//     title='ra-data-feathers Example'
//     dataProvider={restClient(feathersClient, restClientOptions)}
//     authProvider={authClient(feathersClient, authClientOptions)}
//   >
//     {permissions => [
//       <Resource
//         name='a_resource'
//         list={AResourceList}
//       />
//       permissions === 'admin' ? // Only show this resource if the user role is 'admin'
//         <Resource
//           name='another_resource'
//           list={AnotherResourceList}
//         /> : null;
//     ]}
//   </Admin>
// );

export default App;