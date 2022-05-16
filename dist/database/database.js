"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DataBase {
    constructor() {
        this.conectarBD = async (cadenaConexion = this._cadenaConexion) => {
            const promise = new Promise(async (resolve, reject) => {
                await mongoose_1.default
                    .connect(cadenaConexion, {})
                    .then(() => {
                    resolve(`Conectado a ${cadenaConexion}`);
                })
                    .catch((error) => {
                    reject(`Error conectando a ${cadenaConexion}: ${error.code}`);
                });
            });
            return promise;
        };
        this.desconectarBD = async (cadenaConexion = this._cadenaConexion) => {
            const promise = new Promise(async (resolve, reject) => {
                await mongoose_1.default
                    .disconnect()
                    .then(() => resolve(`Desconectado de  ${cadenaConexion}`))
                    .catch((error) => reject(`Error desconectando de ${cadenaConexion}: ${error.code}`));
            });
            return promise;
        };
        this._cadenaConexion =
            "mongodb+srv://admin:admin@db-final.d7cnh.mongodb.net/LeagueOfLegends?retryWrites=true&w=majority";
    }
}
exports.db = new DataBase();
