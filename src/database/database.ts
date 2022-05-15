import mongoose from "mongoose";

class DataBase {
  private _cadenaConexion: string;

  constructor() {
    this._cadenaConexion =
      "mongodb+srv://admin:admin@db-final.d7cnh.mongodb.net/LeagueOfLegends?retryWrites=true&w=majority";
  }

  conectarBD = async (cadenaConexion: string = this._cadenaConexion) => {
    const promise = new Promise<string>(async (resolve, reject) => {
      await mongoose
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

  desconectarBD = async (cadenaConexion: string = this._cadenaConexion) => {
    const promise = new Promise<string>(async (resolve, reject) => {
      await mongoose
        .disconnect()
        .then(() => resolve(`Desconectado de  ${cadenaConexion}`))
        .catch((error) =>
          reject(`Error desconectando de ${cadenaConexion}: ${error.code}`)
        );
    });
    return promise;
  };
}

export const db = new DataBase()  
