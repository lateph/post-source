import { authHeader } from '../_helpers';
import fetcher from './fetcherRest';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

export const sourceService = {
    create
};

const convertFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

async function create({ title, shortDesc, editorState, category, type, tags, file, thumb }) {
    let params = { 
      title, 
      shortDesc, 
      category, 
      type, 
      tags : tags.map(t => t.value),
      desc: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    };
    if(params.type === ""){
      delete params['type']
    }
    if(file){
      params['file'] = {
        title: file.name,
        uri: await convertFileToBase64(file)
      }
    }
    if(thumb){
      params['thumb'] = {
        title: thumb.name,
        uri: await convertFileToBase64(thumb)
      }
    }
    
    return await fetcher('sources',params, {})
}