"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_model_1 = __importDefault(require("./usuario.model"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_model_1.default.findAll();
    res.json({
        msg: 'getUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario)
            throw new Error(`No existe el usuario con este id ${id}`);
        res.json({
            msg: 'getUsuarios',
            usuario
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `${error}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const exsiteEmail = yield usuario_model_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (exsiteEmail) {
            return res.status(400).json({
                msg: 'Email ya existe en la bd'
            });
        }
        const usuario = yield usuario_model_1.default.create(body);
        if (!usuario) {
            return res.status(400).json({
                msg: 'Error al crear usuario'
            });
        }
        res.status(200).json({
            msg: 'postUsuarios',
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'hable con el admnistrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //eslint-disable-line
    const { body } = req;
    try {
        const exsiteEmail = yield usuario_model_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (exsiteEmail) {
            return res.status(400).json({
                msg: 'Email ya existe en la bd'
            });
        }
        const usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        yield usuario.update(body);
        res.status(200).json({
            msg: 'putUsuarios',
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'hable con el admnistrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_model_1.default.findByPk(id);
    if (!usuario) {
        return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
    yield usuario.update({ estado: false });
    res.json({
        msg: 'deleteUsuarios',
        usuario
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.controller.js.map