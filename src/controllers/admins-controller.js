/* eslint-disable consistent-return */
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const repository = require("../repositories/admins-repository");
const { LOG } = require("../services/log");

// list
exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load admins!", e);
        res.status(500).send({ message: "Failed to load admins!" });
    }
};

passport.use(
    new LocalStrategy(async (username, password, next) => {
        // eslint-disable-next-line no-unused-vars
        const data = await repository
            .getUserByUsername(username, (err, admin) => {
                if (err) throw err;

                if (!admin) {
                    return next(null, false, {
                        message: "Usuário ou senha não existentem.",
                    });
                }

                repository.comparePassword(
                    password,
                    admin.password,
                    (error, isMatch) => {
                        if (error) return next(error);
                        if (isMatch) {
                            return next(null, admin);
                        }
                        return next(null, false, {
                            message: "Usuário ou senha inválidos.",
                        });
                    }
                );
            })
            .catch((error) => {
                LOG(error);
            });
    })
);
