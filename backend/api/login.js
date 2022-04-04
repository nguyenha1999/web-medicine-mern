const jwt = require('jsonwebtoken');
const ServerError = require('../utils/serverError');

const User = require('../model/user');

module.exports = {
    post_index: async function (username, password, _app_secretKey) {
        const user = await User.findOne({ username: username, activated: true }, '-createdOn -activated')
            .populate({
                path: 'roles',
                populate: {
                    path: 'frontends',
                    match: { activated: true },
                    select: '-_id title url'
                },
                match: { activated: true },
                select: '-_id title frontends'
            });
        if (!user) throw new ServerError('Bad Request', 400);
        if (!user.authenticate(password)) throw new ServerError('Unauthenticated', 401);
        const token = jwt.sign({ userId: user._id, username: user.username }, _app_secretKey, { expiresIn: '2h' });
        user.salt = undefined;
        user.hashedPass = undefined;
        return { token, user }
    }
}
