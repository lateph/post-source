var _ = require('lodash');
// in addUploadFeature.js
/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

const mapValuesAsync = (obj, asyncFn) => {
    const keys = Object.keys(obj);
    const promises = keys.map(k => {
      return asyncFn(obj[k]).then(newValue => {
        return {key: k, value: newValue};
      });
    });
    return Promise.all(promises).then(values => {
      const newObj = {};
      values.forEach(v => {
        newObj[v.key] = v.value;
      });
      return newObj;
    });
  };

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => async (type, resource, params) => {
    if (type === 'CREATE' && resource === 'sources') {
        console.log(params.data)
        // notice that following condition can be true only when `<ImageInput source="thumb" />` component has parameter `multiple={true}`
        // if parameter `multiple` is false, then data.thumb is not an array, but single object

        const files = _.pickBy(params.data, p => p.rawFile instanceof File)
        const filesMaped = await mapValuesAsync(files, async (file) => {
            console.log(file)
            return {
                title: file.title,
                uri: await convertFileToBase64(file)
            }
        })

        console.log(filesMaped)

        return  requestHandler(type, resource, {
            ...params,
            data: {
                ...params.data,
                ...filesMaped
            }
        })
    }
    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;