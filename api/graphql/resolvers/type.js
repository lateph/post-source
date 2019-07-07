const Type = require('../../models/type');
const { isAdmin } = require('../../helpers/is-auth')

module.exports = {
    type: (_id, req) => {
        return Type.findById(_id)
    },
    types: (args, req) => {
        return Type.find().skip(args.pagination.skip).limit(args.pagination.limit).exec()
    },
    updateType: async ({_id, input}, req) => {
        isAdmin(req)
        const type = await Type.findByIdAndUpdate(_id, input);
        if (!type) {
            throw new Error('Type not found')
        }
        return await Type.findById(_id);
    },
    createType: async (args, req, context) => {
        console.log(req.user)
        console.log(context.user)
        isAdmin(req)
        const type = new Type(args.input);
        return newType = await type.save()
    },
    deleteType: async (_id, req) => {
        isAdmin(req)
        const account = await Account.findOne({ type: _id })
        if (account) {
            throw new Error('Type cant be deleted')
        }
        const type = await Type.findByIdAndRemove(_id)
        if (!type) {
            throw new Error('Type not found')
        }
        return type;
    },
}