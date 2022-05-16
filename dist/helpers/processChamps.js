"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChampion = exports.readChampion = exports.allChamps = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const __1 = require("..");
const Champion_1 = require("../classes/Champion");
const database_1 = require("../database/database");
const champSchema_1 = require("../schema/champSchema");
async function allChamps() {
    await database_1.db
        .conectarBD()
        .then(async () => {
        await champSchema_1.Champions.find()
            .then((query) => {
            for (let champion of query) {
                console.log(champion);
            }
            (0, __1.main)();
        })
            .catch((err) => console.log("Error: " + err));
    })
        .catch((error) => {
        console.log(error);
    });
}
exports.allChamps = allChamps;
async function readChampion() {
    const { typeFind } = await inquirer_1.default.prompt([
        {
            name: "typeFind",
            type: "list",
            message: "Por que campo desea buscar",
            choices: ["Nombre del campeon", "Posicion", "Tipo"],
        },
    ]);
    switch (typeFind) {
        case "Nombre del campeon":
            await inquirer_1.default
                .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "> introduzca el nombre del campeon: ",
                },
            ])
                .then(async (answers) => {
                await database_1.db.conectarBD();
                await champSchema_1.Champions.findOne({
                    name: answers.name,
                })
                    .then((queryOne) => {
                    if (queryOne == null) {
                        console.log("Error. No existe dicho campeon");
                        (0, __1.main)();
                    }
                    else {
                        let champion = new Champion_1.Champion(queryOne.name, queryOne.position, queryOne.type);
                        champion.skills = queryOne.skills;
                        console.log(champion);
                        return (0, __1.main)();
                    }
                })
                    .catch((err) => console.log("Error: " + err));
            })
                .catch((error) => {
                console.log(error);
            });
            break;
        case "Posicion":
            await inquirer_1.default
                .prompt([
                {
                    type: "input",
                    name: "position",
                    message: "> Introduzca la posicion por la que buscar: ",
                },
            ])
                .then(async (answers) => {
                await database_1.db.conectarBD();
                await champSchema_1.Champions.find({
                    position: answers.position,
                })
                    .then((query) => {
                    if (query.length == 0) {
                        console.log("Error. No existe dicha posicion");
                        (0, __1.main)();
                    }
                    else {
                        query.forEach((element) => {
                            console.log("\n");
                            const { name, position, type, skills } = element;
                            console.log("Name: ", name);
                            console.log("Position: ", position);
                            console.log("Type", type);
                            skills.forEach((skill, index) => {
                                console.log(`Skill ${index + 1}`, skill);
                            });
                            console.log("\n");
                        });
                    }
                })
                    .catch((err) => console.log("Error: " + err));
            })
                .catch((error) => {
                console.log(error);
            });
            break;
        case "Tipo":
            await inquirer_1.default
                .prompt([
                {
                    type: "input",
                    name: "type",
                    message: "> Introduzca el tipo por el que desea buscar: ",
                },
            ])
                .then(async (answers) => {
                await database_1.db.conectarBD();
                await champSchema_1.Champions.find({
                    type: answers.type,
                })
                    .then((query) => {
                    if (query.length == 0) {
                        console.log("Error. No existe dicha posicion");
                        (0, __1.main)();
                    }
                    else {
                        query.forEach((element) => {
                            console.log("\n");
                            const { name, position, type, skills } = element;
                            console.log("Name: ", name);
                            console.log("Position: ", position);
                            console.log("Type", type);
                            skills.forEach((skill, index) => {
                                console.log(`Skill ${index + 1}`, skill);
                            });
                            console.log("\n");
                        });
                        (0, __1.main)();
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
exports.readChampion = readChampion;
async function updateChampion() {
    await inquirer_1.default
        .prompt([
        {
            type: "input",
            name: "name",
            message: "> Introduzca el nombre del campeon a modificar:",
        },
        {
            type: "list",
            name: "position",
            message: "> Introduzca la nueva posicion del campeon: ",
            choices: ["top", "mid", "jungler", "support", "adc"],
        },
        {
            type: "list",
            name: "type",
            message: "> Introduzca el nuevo tipo de campeon: ",
            choices: ["assassin", "fighter", "mage", "marksman", "tank", "healer"],
        },
    ])
        .then(async (answers) => {
        await database_1.db.conectarBD();
        await champSchema_1.Champions.findOneAndUpdate({ name: answers.name }, {
            name: answers.name,
            position: answers.position,
            type: answers.type,
        })
            .then((query) => {
            if (query == null) {
                console.log("No existe ningun campeon con dicho nombre");
                (0, __1.main)();
            }
            else {
                console.log("Campeon modificado");
                (0, __1.main)();
            }
        })
            .catch((err) => {
            console.log(err);
        });
    })
        .catch((err) => console.log("Error: " + err));
}
exports.updateChampion = updateChampion;
