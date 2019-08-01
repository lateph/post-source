import React, { Component }  from 'react';
import { Admin, Resource, ListGuesser, CreateGursser } from 'react-admin';
import { TagsCreate, TagsList, TagsEdit } from './tags'
import { TypesCreate, TypesList, TypesEdit } from './Type'
import { UserEdit, UserList, UserCreate } from './users'
import { SourcesEdit, SourcesList, SourcesCreate } from './sources'
import simpleRestProvider from './DataProvider'
import LocalOffer from '@material-ui/icons/LocalOffer';
import People from '@material-ui/icons/People';
import PeopChromeReaderModele from '@material-ui/icons/ChromeReaderMode';

import authProvider from './authProvider';
import addUploadFeature from './addUploadFeature';

const App = () => (
  <Admin
    title='ra-data-feathers Example'
    dataProvider={addUploadFeature(simpleRestProvider)}
    authProvider={authProvider}
  >
    <Resource icon={LocalOffer} name='tags' list={TagsList} create={TagsCreate} edit={TagsEdit} undoable={false}  />
    <Resource name='types' list={TypesList} create={TypesCreate} edit={TypesEdit} undoable={false} />
    <Resource icon={People} name='users' list={UserList} create={UserCreate} edit={UserEdit} undoable={false} />
    <Resource icon={PeopChromeReaderModele} name='sources' list={SourcesList} create={SourcesCreate} edit={SourcesEdit} undoable={false} />
  </Admin>
);

export default App;