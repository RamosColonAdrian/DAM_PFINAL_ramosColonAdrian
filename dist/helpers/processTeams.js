"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenses = exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.allTeams = exports.readTeam = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const __1 = require("..");
const Player_1 = require("../classes/Player");
const Team_1 = require("../classes/Team");
const database_1 = require("../database/database");
const playerSchema_1 = require("../schema/playerSchema");
const teamSchema_1 = require("../schema/teamSchema");
const validatorsHelper_1 = require("./validatorsHelper");
async function readTeam() {
    await database_1.db
        .conectarBD()
        .then(async () => {
        await inquirer_1.default
            .prompt([
            {
                type: "input",
                name: "teamName",
                message: "> Indica el nombre del equipo: ",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input), //callback
            },
        ])
            .then(async (result) => {
            await teamSchema_1.Teams.aggregate([
                {
                    $lookup: {
                        from: "players",
                        localField: "teamID",
                        foreignField: "team",
                        as: "players",
                    },
                },
                {
                    $match: {
                        name: result.teamName,
                    },
                },
            ])
                .then((result) => {
                let str = JSON.stringify(result);
                str = JSON.stringify(result, null, 4);
                console.log(str);
                (0, __1.main)();
            })
                .catch((err) => {
                console.log(err.mesaage);
            });
        })
            .catch((err) => {
            console.log(err.mesaage);
        });
    })
        .catch((err) => {
        console.log(err.mesaage);
    });
}
exports.readTeam = readTeam;
async function allTeams() {
    await database_1.db
        .conectarBD()
        .then(async () => {
        await teamSchema_1.Teams.aggregate([
            {
                $lookup: {
                    from: "players",
                    localField: "teamID",
                    foreignField: "team",
                    as: "players",
                },
            },
        ])
            .then((result) => {
            let arrayTeam = new Array();
            let t = new Team_1.Team("", "", "", "", true, "");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result[i].players.length; j++) {
                    let p = new Player_1.Player(result[i].players[j].name, result[i].players[j].playerID, result[i].players[j].nickName, result[i].players[j].rank, result[i].players[j].salary, result[i].players[j].nationality, result[i].players[j].position, result[i].players[j].birthdate, result[i].players[j].region, result[i].players[j].team, result[i].players[j].kills, result[i].players[j].deaths, result[i].players[j].assists);
                    arrayTeam.push(p);
                }
                t = new Team_1.Team(result[i].name, result[i].teamID, result[i].coach, result[i].region, result[i].playingCurrently, result[i].headquarters);
                t.players = arrayTeam;
                arrayTeam = new Array();
                let str = JSON.stringify(t);
                str = JSON.stringify(t, null, 4);
                console.log(str, "\n");
            }
            (0, __1.main)();
        })
            .catch((err) => {
            console.log(err.mesaage);
        });
    })
        .catch((err) => {
        console.log(err.mesaage);
    });
}
exports.allTeams = allTeams;
async function createTeam() {
    await database_1.db
        .conectarBD()
        .then(async (result) => {
        await inquirer_1.default
            .prompt([
            {
                type: "input",
                name: "name",
                message: "> Introduzca el nombre del equipo:",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "input",
                name: "teamID",
                message: "> Introduzca el ID del equipo:",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "input",
                name: "coach",
                message: "> Introduzca el nombre del entrenador del equipo:",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "input",
                name: "region",
                message: "> Introduzca la region del equipo:",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "confirm",
                name: "playing",
                message: "> El equipo está activo?:",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "input",
                name: "headquarters",
                message: "> Introduzca donde se encuentra la sede del equipo:",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
        ])
            .then(async (answers) => {
            let team = new Team_1.Team(answers.name, answers.teamID, answers.coach, answers.region, answers.playingCurrently, answers.headquarters);
            let schema = {
                teamID: team.teamID,
                name: team.name,
                coach: team.coach,
                region: team.region,
                playingCurrently: team.playingCurrently,
                headquarters: team.headquarters,
            };
            let schemaTeam = new teamSchema_1.Teams(schema);
            await schemaTeam
                .save()
                .then(() => {
                console.log("Documento salvado con exito");
                (0, __1.main)();
            })
                .catch(() => {
                console.log("Error al salvar el docuemnto en la base de datos");
                (0, __1.main)();
            });
        })
            .catch((err) => {
            console.log(err.menssaje);
        });
    })
        .catch((err) => {
        console.log(err.menssaje);
    });
}
exports.createTeam = createTeam;
async function updateTeam() {
    await inquirer_1.default
        .prompt([
        {
            name: "id",
            type: "input",
            message: "> Introduzca el ID del equipo a modificar: ",
            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
        },
        {
            name: "checkbox",
            type: "checkbox",
            message: "Que campos quieres modificar?",
            choices: ["Nombre", "Coach", "Region", "Sede", "Activo"],
        },
    ])
        .then(async (answers) => {
        for (let index = 0; index < answers.checkbox.length; index++) {
            switch (answers.checkbox[index]) {
                case "Nombre":
                    await inquirer_1.default
                        .prompt([
                        {
                            type: "input",
                            name: "name",
                            message: "> Introduce el nuevo nombre del equipo: ",
                            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
                        },
                    ])
                        .then(async (result) => {
                        await database_1.db
                            .conectarBD()
                            .then(async () => {
                            let modify = result.name;
                            await teamSchema_1.Teams.findOneAndUpdate({
                                teamID: answers.id,
                            }, {
                                name: modify,
                            })
                                .then(async (result) => {
                                console.log("Equipo modificado con exito");
                                database_1.db.desconectarBD();
                                (0, __1.main)();
                            })
                                .catch((err) => {
                                console.log(err.message);
                            });
                        })
                            .catch((err) => { });
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                    break;
                case "Coach":
                    await inquirer_1.default
                        .prompt([
                        {
                            type: "input",
                            name: "coach",
                            message: "> Introduce el nuevo entrenador del equipo: ",
                            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
                        },
                    ])
                        .then(async (result) => {
                        await database_1.db
                            .conectarBD()
                            .then(async () => {
                            let modify = result.coach;
                            await playerSchema_1.Players.findOneAndUpdate({
                                teamID: answers.id,
                            }, {
                                coach: modify,
                            })
                                .then(async (result) => {
                                console.log("Equipo modificado con exito");
                                database_1.db.desconectarBD();
                                (0, __1.main)();
                            })
                                .catch((err) => {
                                console.log(err.message);
                            });
                        })
                            .catch((err) => { });
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                    break;
                case "Region":
                    await inquirer_1.default
                        .prompt([
                        {
                            type: "input",
                            name: "region",
                            message: "> Introduce la nueva region del equipo: ",
                            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
                        },
                    ])
                        .then(async (result) => {
                        await database_1.db
                            .conectarBD()
                            .then(async () => {
                            let modify = result.region;
                            await playerSchema_1.Players.findOneAndUpdate({
                                teamID: answers.id,
                            }, {
                                region: modify,
                            })
                                .then(async (result) => {
                                console.log("Equipo modificado con exito");
                                database_1.db.desconectarBD();
                                (0, __1.main)();
                            })
                                .catch((err) => {
                                console.log(err.message);
                            });
                        })
                            .catch((err) => { });
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                    break;
                case "Sede":
                    await inquirer_1.default
                        .prompt([
                        {
                            type: "input",
                            name: "headquarters",
                            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
                            message: "> Introduce donde se encuentra la nueva sede del equipo : ",
                        },
                    ])
                        .then(async (result) => {
                        await database_1.db
                            .conectarBD()
                            .then(async () => {
                            let modify = result.headquarters;
                            await playerSchema_1.Players.findOneAndUpdate({
                                teamID: answers.id,
                            }, {
                                headquarters: modify,
                            })
                                .then(async (result) => {
                                console.log("Equipo modificado con exito");
                                database_1.db.desconectarBD();
                                (0, __1.main)();
                            })
                                .catch((err) => {
                                console.log(err.message);
                            });
                        })
                            .catch((err) => { });
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                    break;
                case "Activo":
                    await inquirer_1.default
                        .prompt([
                        {
                            type: "confirm",
                            name: "active",
                            message: "> El equipo está en activo : ",
                            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
                        },
                    ])
                        .then(async (result) => {
                        await database_1.db
                            .conectarBD()
                            .then(async () => {
                            let modify = result.active;
                            await playerSchema_1.Players.findOneAndUpdate({
                                teamID: answers.id,
                            }, {
                                playingCurrently: modify,
                            })
                                .then(async (result) => {
                                console.log("Equipo modificado con exito");
                                database_1.db.desconectarBD();
                                (0, __1.main)();
                            })
                                .catch((err) => {
                                console.log(err.message);
                            });
                        })
                            .catch((err) => {
                            console.log(err.message);
                        });
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                    break;
            }
        }
    })
        .catch((err) => {
        console.log(err.message);
    });
}
exports.updateTeam = updateTeam;
async function deleteTeam() {
    await database_1.db
        .conectarBD()
        .then(async (result) => {
        await inquirer_1.default
            .prompt([
            {
                name: "delete",
                type: "input",
                message: "Introduce el ID del Equipo a eliminar",
            },
        ])
            .then((result1) => {
            teamSchema_1.Teams.findOne({
                teamID: result1.delete,
            })
                .then(async (query) => {
                if (query.length == 0) {
                    console.log("El Equipo especificado no existe");
                    (0, __1.main)();
                }
                else {
                    console.log(query);
                    await inquirer_1.default
                        .prompt([
                        {
                            type: "confirm",
                            name: "confirm",
                            message: "Seguro que quieres eliminar este Equipo?",
                        },
                    ])
                        .then((result2) => {
                        if (!result2.confirm) {
                            (0, __1.main)();
                        }
                        else {
                            teamSchema_1.Teams.deleteOne({
                                teamID: result1.delete,
                            })
                                .then((result) => {
                                console.log("\nEquipo eliminado con exito");
                                (0, __1.main)();
                            })
                                .catch((err) => {
                                console.log(err.message);
                            });
                        }
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                }
            })
                .catch((err) => {
                console.log(err.message);
            });
        })
            .catch((err) => {
            console.log(err.message);
        });
    })
        .catch((err) => {
        console.log(err.message);
    });
}
exports.deleteTeam = deleteTeam;
async function expenses() {
    await database_1.db
        .conectarBD()
        .then(async () => {
        await teamSchema_1.Teams.aggregate([
            {
                $lookup: {
                    from: "players",
                    localField: "teamID",
                    foreignField: "team",
                    as: "players",
                },
            },
        ])
            .then((result) => {
            let arrayTeam = new Array();
            let t = new Team_1.Team("", "", "", "", true, "");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result[i].players.length; j++) {
                    let p = new Player_1.Player(result[i].players[j].name, result[i].players[j].playerID, result[i].players[j].nickName, result[i].players[j].rank, result[i].players[j].salary, result[i].players[j].nationality, result[i].players[j].position, result[i].players[j].birthdate, result[i].players[j].region, result[i].players[j].team, result[i].players[j].kills, result[i].players[j].deaths, result[i].players[j].assists);
                    arrayTeam.push(p);
                }
                t = new Team_1.Team(result[i].name, result[i].teamID, result[i].coach, result[i].region, result[i].playingCurrently, result[i].headquarters);
                t.players = arrayTeam;
                arrayTeam = new Array();
                console.log("GASTOS DE ", t.name, ": ", t.expenses);
            }
            (0, __1.main)();
        })
            .catch((err) => {
            console.log(err.mesaage);
        });
    })
        .catch((err) => {
        console.log(err.mesaage);
    });
}
exports.expenses = expenses;
