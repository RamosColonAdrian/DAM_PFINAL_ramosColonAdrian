import inquirer from "inquirer";
import { main } from "..";
import { Champion } from "../classes/Champion";
import { db } from "../database/database";
import { Champions } from "../schema/champSchema";
import { validateVoid } from "./validatorsHelper";

export async function allChamps() {
    await db
      .conectarBD()
      .then(async () => {
        await Champions.find()
          .then((query) => {
            for (let champion of query) {
              console.log(champion);
            }
            main();
          })
          .catch((err: any) => console.log("Error: " + err));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
export async function readChampion() {
const { typeFind } = await inquirer.prompt([
    {
    name: "typeFind",
    type: "list",
    message: "Por que campo desea buscar",
    choices: ["Nombre del campeon", "Posicion", "Tipo"],
    validate: (input: any) => validateVoid(input),
    },
]);
switch (typeFind) {
    case "Nombre del campeon":
    await inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "> introduzca el nombre del campeon: ",
            validate: (input: any) => validateVoid(input),
        },
        ])
        .then(async (answers) => {
        await db.conectarBD();
        await Champions.findOne({
            name: answers.name,
        })
            .then((queryOne) => {
            if (queryOne == null) {
                console.log("Error. No existe dicho campeon");
                main();
            } else {
                let champion = new Champion(
                queryOne.name,
                queryOne.position,
                queryOne.type
                );
                champion.skills = queryOne.skills;
                console.log(champion);
                main();
            }
            })
            .catch((err: any) => console.log("Error: " + err));
        })
        .catch((error: any) => {
        console.log(error);
        });
    break;
    case "Posicion":
    await inquirer
        .prompt([
        {
            type: "input",
            name: "position",
            message: "> Introduzca la posicion por la que buscar: ",
            validate: (input: any) => validateVoid(input),
        },
        ])
        .then(async (answers) => {
        await db.conectarBD();
        await Champions.find({
            position: answers.position,
        })
            .then((query) => {
            if (query.length == 0) {
                console.log("Error. No existe dicha posicion");
                main();
            } else {
                query.forEach((element) => {
                console.log("\n");
                const { name, position, type, skills } = element;
                console.log("Name: ", name);
                console.log("Position: ", position);
                console.log("Type", type);
                skills.forEach((skill: any, index: number) => {
                    console.log(`Skill ${index + 1}`, skill);
                });
                console.log("\n");
                });
                main();
            }
            })
            .catch((err: any) => console.log("Error: " + err));
        })
        .catch((error: any) => {
        console.log(error);
        });

    break;
    case "Tipo":
    await inquirer
        .prompt([
        {
            type: "input",
            name: "type",
            message: "> Introduzca el tipo por el que desea buscar: ",
            validate: (input: any) => validateVoid(input),
        },
        ])
        .then(async (answers) => {
        await db.conectarBD();
        await Champions.find({
            type: answers.type,
        })
            .then((query) => {
            if (query.length == 0) {
                console.log("Error. No existe dicha posicion");
                main();
            } else {
                query.forEach((element) => {
                console.log("\n");
                const { name, position, type, skills } = element;
                console.log("Name: ", name);
                console.log("Position: ", position);
                console.log("Type", type);
                skills.forEach((skill: any, index: number) => {
                    console.log(`Skill ${index + 1}`, skill);
                });
                console.log("\n");
                });
                main();
            }
            })
            .catch((err: any) => console.log("Error: " + err));
        })
        .catch((error: any) => {
        console.log(error);
        });
    break;
}
}
  
export async function updateChampion() {
await inquirer
    .prompt([
    {
        type: "input",
        name: "name",
        message: "> Introduzca el nombre del campeon a modificar:",
        validate: (input: any) => validateVoid(input),
    },
    {
        type: "list",
        name: "position",
        message: "> Introduzca la nueva posicion del campeon: ",
        choices: ["top", "mid", "jungler", "support", "adc"],
        validate: (input: any) => validateVoid(input),
    },
    {
        type: "list",
        name: "type",
        message: "> Introduzca el nuevo tipo de campeon: ",
        choices: ["assassin", "fighter", "mage", "marksman", "tank", "healer"],
        validate: (input: any) => validateVoid(input),
    },
    ])
    .then(async (answers) => {
    await db.conectarBD();
    await Champions.findOneAndUpdate(
        { name: answers.name },
        {
        name: answers.name,
        position: answers.position,
        type: answers.type,
        }
    )
        .then((query) => {
        if (query == null) {
            console.log("No existe ningun campeon con dicho nombre");
            main();
        } else {
            console.log("Campeon modificado");
            main();
        }
        })
        .catch((err) => {
        console.log(err);
        });
    })
    .catch((err: any) => console.log("Error: " + err));
}