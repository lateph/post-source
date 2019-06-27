const Type = require('../../models/type');
const Account = require('../../models/account');
const { isAuthenticated } = require('./auth-helper')

module.exports = {
    type: (_id, req) => {
        isAuthenticated(req)
        return Type.findById(_id)
    },
    types: (args, req) => {
        isAuthenticated(req)
        return Type.find().skip(args.pagination.skip).limit(args.pagination.limit).exec()
    },
    updateType: async ({_id, input}, req) => {
        isAuthenticated(req)
        const type = await Type.findByIdAndUpdate(_id, input);
        if (!type) {
            throw new Error('Type not found')
        }
        return await Type.findById(_id);
    },
    createType: async (args, req) => {
        isAuthenticated(req)
        const type = new Type(args.input);
        return newType = await type.save()
    },
    deleteType: async (_id, req) => {
        isAuthenticated(req)
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