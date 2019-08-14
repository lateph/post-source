import fetcher from './fetcherRest';
import fetcherQL from './fetcher';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

export const sourceService = {
    create,
    find
};

const convertFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

async function create({ title, shortDesc, editorState, category, type, tags, file, thumb, update, _id}) {
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
    
    if(!update){
      return await fetcher('sources',params, {})
    }
    else{
      return await fetcher(`sources/${_id}`,params, {
        'method': 'PATCH'
      })
    }
}

async function find({ slug }) {
  const requestBody = {
    query: `
      query BlogDetail($slug: String!){
        sourceSlug(slug: $slug){
          _id
          title
          shortDesc
          desc
          category
          thumb
          thumbUrl
          file
          fileUrl
          slug
          createdAt
          type{
            _id
          }
          creator{
            firstName
            lastName
          }
          tags{
            _id
            name
          }
          type{
            name
          }
        }
      }
      `,
      variables: {
        slug: slug,
      }
  };

  return fetcherQL(requestBody)
    .then(resData => {
        return resData.data.sourceSlug
    //   this.setState({ types: resData.data.types, tags: resData.data.tags, isLoading: false, source: resData.data.sourceSlug,
    //     blog: {
    //       free: resData.data.free,
    //       trial: resData.data.trial,
    //       paid: resData.data.paid,
    //     }
    //   });

      // const events = resData.data.events;
      // if (this.isActive) {
      //   this.setState({ events: events, isLoading: false });
      // }
    })
}