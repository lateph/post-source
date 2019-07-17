const Tag = require('../../models/tag');
const { isAdmin } = require('../../helpers/is-auth')

module.exports = {
    tag: (_id, req) => {
        return Tag.findById(_id)
    },
    tags: (args, req) => {
        return Tag.find().skip(args.pagination.skip).limit(args.pagination.limit).sort(args.pagination.sort).exec()
    },
    updateTag: async ({_id, input}, req) => {
        isAdmin(req)
        const tag = await Tag.findByIdAndUpdate(_id, input);
        if (!tag) {
            throw new Error('Tag not found')
        }
        return await Tag.findById(_id);
    },
    createTag: async (args, req, context) => {
        console.log(req.user)
        console.log(context.user)
        isAdmin(req)
        const tag = new Tag(args.input);
        return newTag = await tag.save()
    },
    deleteTag: async (_id, req) => {
        isAdmin(req)
        const account = await Account.findOne({ tag: _id })
        if (account) {
            throw new Error('Tag cant be deleted')
        }
        const tag = await Tag.findByIdAndRemove(_id)
        if (!tag) {
            throw new Error('Tag not found')
        }
        return tag;
    },
}