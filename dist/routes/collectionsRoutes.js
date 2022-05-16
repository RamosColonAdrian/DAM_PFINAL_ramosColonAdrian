"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoute = exports.playerRoute = exports.championRoute = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const index_1 = require("../index");
const processChamps_1 = require("../helpers/processChamps");
const porcessPlayer_1 = require("../helpers/porcessPlayer");
const processTeams_1 = require("../helpers/processTeams");
const championRoute = async () => {
    const { action } = await inquirer_1.default.prompt([
        {
            name: "action",
            type: "list",
            message: "Qué quieres hacer con la colección Champion",
            choices: [
                "Leer un campeón",
                "Leer todos los campeones",
                "Editar",
                "Volver",
            ],
        },
    ]);
    switch (action) {
        case "Leer un campeón":
            await (0, processChamps_1.readChampion)();
            break;
        case "Leer todos los campeones":
            await (0, processChamps_1.allChamps)();
            break;
        case "Editar":
            await (0, processChamps_1.updateChampion)();
            break;
        case "Volver":
            (0, index_1.main)();
            break;
    }
};
exports.championRoute = championRoute;
const playerRoute = async () => {
    const { action } = await inquirer_1.default.prompt([
        {
            name: "action",
            type: "list",
            message: "Qué quieres hacer con la colección Jugadores",
            choices: [
                "Leer un Jugador",
                "Leer todos los Jugadores",
                "Crear",
                "Editar",
                "Borrar",
                "KDA de los juagadores",
                "Volver",
            ],
        },
    ]);
    switch (action) {
        case "Leer un Jugador":
            (0, porcessPlayer_1.readPlayer)();
            break;
        case "Leer todos los Jugadores":
            (0, porcessPlayer_1.allPlayers)();
            break;
        case "Crear":
            (0, porcessPlayer_1.createPlayer)();
            break;
        case "Editar":
            (0, porcessPlayer_1.updatePlayer)();
            break;
        case "Borrar":
            (0, porcessPlayer_1.deletePlayer)();
            break;
        case "KDA de los juagadores":
            (0, porcessPlayer_1.kda)();
            break;
        case "Volver":
            (0, index_1.main)();
    }
};
exports.playerRoute = playerRoute;
const teamRoute = async () => {
    const { action } = await inquirer_1.default.prompt([
        {
            name: "action",
            type: "list",
            message: "Qué quieres hacer con la colección Equipos",
            choices: [
                "Leer un equipo",
                "Leer todos los equipos",
                "Crear",
                "Editar",
                "Borrar",
                "Gastos",
                "Volver",
            ],
        },
    ]);
    switch (action) {
        case "Leer un equipo":
            (0, processTeams_1.readTeam)();
            break;
        case "Leer todos los equipos":
            (0, processTeams_1.allTeams)();
            break;
        case "Crear":
            (0, processTeams_1.createTeam)();
            break;
        case "Editar":
            (0, processTeams_1.updateTeam)();
            break;
        case "Borrar":
            (0, processTeams_1.deleteTeam)();
            break;
        case "Gastos":
            (0, processTeams_1.expenses)();
            break;
        case "Volver":
            (0, index_1.main)();
            break;
    }
};
exports.teamRoute = teamRoute;
