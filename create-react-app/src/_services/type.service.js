import fetcher from './fetcher';

export const typeService = {
    getAll,
};

function getAll() {
    const requestBody = {
        query: `
          query{
            types{
              _id
              name
              total
            }
          }
          `,
          variables: {
            // slug: this.props.match.params.slug,
          }
      };
  
      return fetcher(requestBody)
        .then(resData => {
            return resData.data.types
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