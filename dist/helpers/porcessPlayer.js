"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kda = exports.deletePlayer = exports.updatePlayer = exports.createPlayer = exports.allPlayers = exports.readPlayer = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const __1 = require("..");
const Champion_1 = require("../classes/Champion");
const Player_1 = require("../classes/Player");
const database_1 = require("../database/database");
const playerSchema_1 = require("../schema/playerSchema");
const validatorsHelper_1 = require("./validatorsHelper");
async function readPlayer() {
    const { typeFind } = await inquirer_1.default.prompt([
        {
            name: "typeFind",
            type: "list",
            message: "Por que campo desea buscar",
            choices: ["Nombre del jugador", "NickName"],
        },
    ]);
    switch (typeFind) {
        case "Nombre del jugador":
            await inquirer_1.default
                .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "> introduzca el nombre del jugador: ",
                },
            ])
                .then(async (answers) => {
                await database_1.db.conectarBD();
                await playerSchema_1.Players.find({
                    name: answers.name,
                })
                    .then((queryOne) => {
                    if (queryOne.length == 0) {
                        console.log("Error. No existe dicho jugador");
                        (0, __1.main)();
                    }
                    else {
                        queryOne.forEach((element) => {
                            let player = new Player_1.Player(element.playerID, element.name, element.nickName, element.rank, element.salary, element.nationality, element.position, element.birthdate, element.region, element.team, element.kills, element.deaths, element.assists);
                            console.log(player);
                        });
                        return (0, __1.main)();
                    }
                })
                    .catch((err) => console.log("Error: " + err));
            })
                .catch((error) => {
                console.log(error);
            });
            break;
        case "NickName":
            await inquirer_1.default
                .prompt([
                {
                    type: "input",
                    name: "nick",
                    message: "> introduzca el nick name del jugador: ",
                },
            ])
                .then(async (answers) => {
                await database_1.db.conectarBD();
                await playerSchema_1.Players.findOne({
                    nickName: answers.nick,
                })
                    .then((queryOne) => {
                    if (queryOne == null) {
                        console.log("Error. No existe dicho campeon");
                        (0, __1.main)();
                    }
                    else {
                        let player = new Player_1.Player(queryOne.name, queryOne.playerID, queryOne.nickName, queryOne.rank, queryOne.salary, queryOne.nationality, queryOne.position, queryOne.birthdate, queryOne.region, queryOne.team, queryOne.kills, queryOne.deaths, queryOne.assists);
                        console.log(player);
                        return (0, __1.main)();
                    }
                })
                    .catch((err) => console.log("Error: " + err));
            })
                .catch((error) => {
                console.log(error);
            });
            break;
    }
}
exports.readPlayer = readPlayer;
async function allPlayers() {
    await database_1.db
        .conectarBD()
        .then(async () => {
        await playerSchema_1.Players.aggregate([
            {
                $lookup: {
                    from: "champions",
                    localField: "championPool",
                    foreignField: "idChamp",
                    as: "champions",
                },
            },
        ])
            .then((query) => {
            query.forEach((element) => {
                let player = new Player_1.Player(element.playerID, element.name, element.nickName, element.rank, element.salary, element.nationality, element.position, element.birthdate, element.region, element.team, element.kills, element.deaths, element.assists);
                let champion = new Champion_1.Champion(element.champions[0].name, element.champions[0].position, element.champions[0].type);
                champion.skills = element.champions[0].skills;
                player.championPool = champion;
                let str = JSON.stringify(player);
                str = JSON.stringify(player, null, 4);
                console.log(str);
            });
            (0, __1.main)();
        })
            .catch((err) => {
            console.log("Error: " + err);
            (0, __1.main)();
        });
    })
        .catch((error) => {
        console.log(error);
    });
}
exports.allPlayers = allPlayers;
async function createPlayer() {
    await database_1.db
        .conectarBD()
        .then(async () => {
        await inquirer_1.default
            .prompt([
            {
                type: "input",
                name: "name",
                message: "> Introduzca el nombre del jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "input",
                name: "id",
                message: "> Introduzca el ID del jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "input",
                name: "nick",
                message: "> Introduzca el nick del jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "list",
                name: "rank",
                message: "> Rank: ",
                choices: [
                    "iron",
                    "bronze",
                    "silver",
                    "gold",
                    "platinum",
                    "diamond",
                    "master",
                    "challenger",
                ],
            },
            {
                type: "input",
                name: "salary",
                message: "> Introduzca el salario mensual: ",
                validate: (input) => (0, validatorsHelper_1.validateVoidAndisNan)(input),
            },
            {
                type: "input",
                name: "nationality",
                message: "> Introduzca la nacionalidad del jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "list",
                name: "position",
                message: "> Posicion en la que juega: ",
                choices: ["top", "jungler", "mid", "adc", "support"],
            },
            {
                type: "input",
                name: "birthdate",
                message: "> Cumpleaños: (YYYY/MM/DD)",
                validate: (input) => (0, validatorsHelper_1.validateDateAndVoid)(input),
            },
            {
                type: "input",
                name: "region",
                message: "> Introduzca la region del jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "input",
                name: "team",
                message: "> Introduzca el equipo al que pertenece el jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
            {
                type: "input",
                name: "kills",
                message: "> Asesinatos totales del jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoidAndisNan)(input),
            },
            {
                type: "input",
                name: "deaths",
                message: "> Muertes totales del jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoidAndisNan)(input),
            },
            {
                type: "input",
                name: "assists",
                message: "> Asistencias totales del jugador: ",
                validate: (input) => (0, validatorsHelper_1.validateVoidAndisNan)(input),
            },
            {
                type: "input",
                name: "champion",
                message: "> Campeon habitual: ",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
        ])
            .then(async (answers) => {
            await playerSchema_1.Players.aggregate([
                {
                    $lookup: {
                        from: "teams",
                        localField: "team",
                        foreignField: "teamID",
                        as: "teams",
                    },
                },
                {
                    $match: {
                        "teams.0.name": answers.team,
                    },
                },
            ]).then(async (query1) => {
                await playerSchema_1.Players.aggregate([
                    {
                        $lookup: {
                            from: "champions",
                            localField: "championPool",
                            foreignField: "idChamp",
                            as: "champs",
                        },
                    },
                    {
                        $match: {
                            "champs.0.name": answers.champion,
                        },
                    },
                ])
                    .then(async (query2) => {
                    if (query2.length == 0) {
                        throw new Error("El campeon especificado no existe o no se le ha asignado a ningun jugador");
                    }
                    else if (query1.length == 0) {
                        throw new Error("El Equipo especificado no existe, creelo antes o introduzca uno existente");
                    }
                    let schema = {
                        playerID: answers.id,
                        name: answers.name,
                        nickName: answers.nick,
                        rank: answers.rank,
                        salary: answers.salary,
                        nationality: answers.nationality,
                        position: answers.position,
                        birthdate: answers.birthdate,
                        region: answers.region,
                        team: query1[0].teams[0].teamID,
                        kills: answers.kills,
                        deaths: answers.deaths,
                        assists: answers.assists,
                        championPool: query2[0].champs[0].idChamp,
                    };
                    try {
                        let chmapSchema = new playerSchema_1.Players(schema);
                        await chmapSchema.save();
                        console.log("documento salvado en BD");
                    }
                    catch (error) {
                        console.log(`Error ${error} salvando documento en BD:`);
                    }
                    let champion = new Champion_1.Champion(query2[0].champs[0].name, query2[0].champs[0].position, query2[0].champs[0].type);
                    champion.skills = query2[0].champs[0].skills;
                    let player = new Player_1.Player(answers.name, answers.id, answers.nick, answers.rank, answers.salary, answers.nationality, answers.position, answers.birthdate, answers.region, answers.team, answers.kills, answers.deaths, answers.assists);
                    player.championPool = champion;
                    let str = JSON.stringify(player);
                    str = JSON.stringify(player, null, 4);
                    console.log(str);
                    (0, __1.main)();
                })
                    .catch((error) => {
                    console.log(error.message, "\n");
                    (0, __1.main)();
                });
            });
        });
    })
        .catch((error) => {
        console.log(error);
    });
}
exports.createPlayer = createPlayer;
async function updatePlayer() {
    await inquirer_1.default
        .prompt([
        {
            name: "id",
            type: "input",
            message: "> Introduzca el ID del jugador a modificar: ",
            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
        },
        {
            name: "checkbox",
            type: "checkbox",
            message: "Que campo quieres modificar?",
            choices: ["Rank", "Salario", "Posicion", "Equipo", "NickName"],
        },
    ])
        .then(async (answers) => {
        for (let index = 0; index < answers.checkbox.length; index++) {
            switch (answers.checkbox[index]) {
                case "Rank":
                    await inquirer_1.default.prompt([
                        {
                            type: "list",
                            name: "rank",
                            choices: [
                                "iron",
                                "bronze",
                                "silver",
                                "gold",
                                "platinum",
                                "diamond",
                                "master",
                                "challenger",
                            ],
                            message: "> Introduce el nuevo rango del juagdor: "
                        }
                    ])
                        .then(async (result) => {
                        await database_1.db.conectarBD()
                            .then(async () => {
                            let modify = result.rank;
                            await playerSchema_1.Players.findOneAndUpdate({
                                playerID: answers.id
                            }, {
                                rank: modify
                            })
                                .then(async (result) => {
                                console.log("Jugador modificado con exito");
                                database_1.db.desconectarBD();
                            }).catch((err) => {
                                console.log(err.message);
                            });
                        }).catch((err) => {
                        });
                    }).catch((err) => {
                        console.log(err.message);
                    });
                    break;
                case "Salario":
                    await inquirer_1.default.prompt([
                        {
                            type: "number",
                            name: "rank",
                            message: "> Introduce el nuevo salario del juagdor: ",
                            validate: (input) => (0, validatorsHelper_1.validateVoidAndisNan)(input),
                        }
                    ])
                        .then(async (result) => {
                        await database_1.db.conectarBD()
                            .then(async () => {
                            let modify = result.rank;
                            await playerSchema_1.Players.findOneAndUpdate({
                                playerID: answers.id
                            }, {
                                salary: modify
                            })
                                .then(async (result) => {
                                console.log("Jugador modificado con exito");
                                database_1.db.desconectarBD();
                            }).catch((err) => {
                                console.log(err.message);
                            });
                        }).catch((err) => {
                        });
                    }).catch((err) => {
                        console.log(err.message);
                    });
                    break;
                case "Posicion":
                    await inquirer_1.default.prompt([
                        {
                            type: "list",
                            name: "rank",
                            choices: ["top", "jungler", "mid", "adc", "support"],
                            message: "> Introduce la nueva posicion del juagdor: "
                        }
                    ])
                        .then(async (result) => {
                        await database_1.db.conectarBD()
                            .then(async () => {
                            let modify = result.rank;
                            await playerSchema_1.Players.findOneAndUpdate({
                                playerID: answers.id
                            }, {
                                position: modify
                            })
                                .then(async (result) => {
                                console.log("Jugador modificado con exito");
                                database_1.db.desconectarBD();
                            }).catch((err) => {
                                console.log(err.message);
                            });
                        }).catch((err) => {
                        });
                    }).catch((err) => {
                        console.log(err.message);
                    });
                    break;
                case "Equipo":
                    await inquirer_1.default.prompt([
                        {
                            type: "number",
                            name: "rank",
                            validate: (input) => (0, validatorsHelper_1.validateVoidAndisNan)(input),
                            message: "> Introduce el ID del nuevo equipo del juegador : "
                        }
                    ])
                        .then(async (result) => {
                        await database_1.db.conectarBD()
                            .then(async () => {
                            let modify = result.rank;
                            await playerSchema_1.Players.findOneAndUpdate({
                                playerID: answers.id
                            }, {
                                team: modify
                            })
                                .then(async (result) => {
                                console.log("Jugador modificado con exito");
                                database_1.db.desconectarBD();
                            }).catch((err) => {
                                console.log(err.message);
                            });
                        }).catch((err) => {
                        });
                    }).catch((err) => {
                        console.log(err.message);
                    });
                    break;
                case "NickName":
                    await inquirer_1.default.prompt([
                        {
                            type: "input",
                            name: "rank",
                            message: "> Introduce el nuevo Nick del jugador : ",
                            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
                        }
                    ])
                        .then(async (result) => {
                        await database_1.db.conectarBD()
                            .then(async () => {
                            let modify = result.rank;
                            await playerSchema_1.Players.findOneAndUpdate({
                                playerID: answers.id
                            }, {
                                nickName: modify
                            })
                                .then(async (result) => {
                                console.log("Jugador modificado con exito");
                                database_1.db.desconectarBD();
                            }).catch((err) => {
                                console.log(err.message);
                            });
                        }).catch((err) => {
                        });
                    }).catch((err) => {
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
exports.updatePlayer = updatePlayer;
async function deletePlayer() {
    await database_1.db
        .conectarBD()
        .then(async () => {
        await inquirer_1.default
            .prompt([
            {
                name: "delete",
                type: "input",
                message: "Introduce el ID del Jugador a eliminar",
                validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
            },
        ])
            .then((result1) => {
            playerSchema_1.Players.findOne({
                playerID: result1.delete,
            })
                .then(async (query) => {
                if (query.length == 0) {
                    console.log("El jugador especificado no existe");
                    (0, __1.main)();
                }
                else {
                    console.log(query);
                    await inquirer_1.default
                        .prompt([
                        {
                            type: "confirm",
                            name: "confirm",
                            message: "Seguro que quieres eliminar este jugador?",
                            validate: (input) => (0, validatorsHelper_1.validateVoid)(input),
                        },
                    ])
                        .then((result2) => {
                        if (!result2.confirm) {
                            (0, __1.main)();
                        }
                        else {
                            playerSchema_1.Players.deleteOne({
                                playerID: result1.delete,
                            })
                                .then((result) => {
                                console.log("\nJugador eliminado con exito");
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
exports.deletePlayer = deletePlayer;
async function kda() {
    await database_1.db
        .conectarBD()
        .then(async () => {
        await playerSchema_1.Players.aggregate([
            {
                $lookup: {
                    from: "champions",
                    localField: "championPool",
                    foreignField: "idChamp",
                    as: "champions",
                },
            },
        ])
            .then((query) => {
            query.forEach((element) => {
                let player = new Player_1.Player(element.playerID, element.name, element.nickName, element.rank, element.salary, element.nationality, element.position, element.birthdate, element.region, element.team, element.kills, element.deaths, element.assists);
                let champion = new Champion_1.Champion(element.champions[0].name, element.champions[0].position, element.champions[0].type);
                champion.skills = element.champions[0].skills;
                player.championPool = champion;
                let p = player.kda.toFixed(2);
                console.log(player.name, " KDA: ", p);
            });
            (0, __1.main)();
        })
            .catch((err) => {
            console.log("Error: " + err);
            (0, __1.main)();
        });
    })
        .catch((error) => {
        console.log(error);
    });
}
exports.kda = kda;
