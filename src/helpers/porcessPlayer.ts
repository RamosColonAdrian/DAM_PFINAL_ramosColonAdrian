import inquirer from "inquirer";
import { main } from "..";
import { Champion } from "../classes/Champion";
import { Player } from "../classes/Player";
import { db } from "../database/database";
import { Players } from "../schema/playerSchema";
import {
  validateVoid,
  validateVoidAndisNan,
  validateDateAndVoid,
} from "./validatorsHelper";


export async function readPlayer() {
  const { typeFind } = await inquirer.prompt([
    {
      name: "typeFind",
      type: "list",
      message: "Por que campo desea buscar",
      choices: ["Nombre del jugador", "NickName"],
    },
  ]);
  switch (typeFind) {
    case "Nombre del jugador":
      await inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "> introduzca el nombre del jugador: ",
          },
        ])
        .then(async (answers) => {
          await db.conectarBD();
          await Players.find({
            name: answers.name,
          })
            .then((queryOne) => {
              if (queryOne.length == 0) {
                console.log("Error. No existe dicho jugador");
                main();
              } else {
                queryOne.forEach((element) => {
                  let player = new Player(
                    element.playerID,
                    element.name,
                    element.nickName,
                    element.rank,
                    element.salary,
                    element.nationality,
                    element.position,
                    element.birthdate,
                    element.region,
                    element.team,
                    element.kills,
                    element.deaths,
                    element.assists
                  );
                  console.log(player);
                });
                return main();
              }
            })
            .catch((err: any) => console.log("Error: " + err));
        })
        .catch((error: any) => {
          console.log(error);
        });
      break;
    case "NickName":
      await inquirer
        .prompt([
          {
            type: "input",
            name: "nick",
            message: "> introduzca el nick name del jugador: ",
          },
        ])
        .then(async (answers) => {
          await db.conectarBD();
          await Players.findOne({
            nickName: answers.nick,
          })
            .then((queryOne) => {
              if (queryOne == null) {
                console.log("Error. No existe dicho campeon");
                main();
              } else {
                let player = new Player(
                  queryOne.name,
                  queryOne.playerID,
                  queryOne.nickName,
                  queryOne.rank,
                  queryOne.salary,
                  queryOne.nationality,
                  queryOne.position,
                  queryOne.birthdate,
                  queryOne.region,
                  queryOne.team,
                  queryOne.kills,
                  queryOne.deaths,
                  queryOne.assists
                );
                console.log(player);
                return main();
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

export async function allPlayers() {
  await db
    .conectarBD()
    .then(async () => {
      await Players.aggregate([
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
            
            let player = new Player(
              element.playerID,
              element.name,
              element.nickName,
              element.rank,
              element.salary,
              element.nationality,
              element.position,
              element.birthdate,
              element.region,
              element.team,
              element.kills,
              element.deaths,
              element.assists
            );
            let champion = new Champion(
              element.champions[0].name,
              element.champions[0].position,
              element.champions[0].type
            );
            champion.skills = element.champions[0].skills;
            player.championPool = champion;
            let str = JSON.stringify(player);
            str = JSON.stringify(player, null, 4);
            console.log(str);
            main();
          });
        })
        .catch((err: any) => {
          console.log("Error: " + err);
          main();
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function createPlayer() {
  await db
    .conectarBD()
    .then(async () => {
      await inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "> Introduzca el nombre del jugador: ",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "input",
            name: "id",
            message: "> Introduzca el ID del jugador: ",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "input",
            name: "nick",
            message: "> Introduzca el nick del jugador: ",
            validate: (input: any) => validateVoid(input),
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
            validate: (input: any) => validateVoidAndisNan(input),
          },
          {
            type: "input",
            name: "nationality",
            message: "> Introduzca la nacionalidad del jugador: ",
            validate: (input: any) => validateVoid(input),
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
            validate: (input: string) => validateDateAndVoid(input),
          },
          {
            type: "input",
            name: "region",
            message: "> Introduzca la region del jugador: ",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "input",
            name: "team",
            message: "> Introduzca el equipo al que pertenece el jugador: ",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "input",
            name: "kills",
            message: "> Asesinatos totales del jugador: ",
            validate: (input: any) => validateVoidAndisNan(input),
          },
          {
            type: "input",
            name: "deaths",
            message: "> Muertes totales del jugador: ",
            validate: (input: any) => validateVoidAndisNan(input),
          },
          {
            type: "input",
            name: "assists",
            message: "> Asistencias totales del jugador: ",
            validate: (input: any) => validateVoidAndisNan(input),
          },
          {
            type: "input",
            name: "champion",
            message: "> Campeon habitual: ",
            validate: (input: any) => validateVoid(input),
          },
        ])
        .then(async (answers) => {
          await Players.aggregate([
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
            await Players.aggregate([
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
                  throw new Error("El campeon especificado no existe");
                } else if (query1.length == 0) {
                  throw new Error(
                    "El Equipo especificado no existe, creelo antes o introduzca uno existente"
                  );
                }

                let schema: any = {
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
                  let chmapSchema = new Players(schema);
                  await chmapSchema.save();
                  console.log("documento salvado en BD");
                } catch (error) {
                  console.log(`Error ${error} salvando documento en BD:`);
                }
                let champion = new Champion(
                  query2[0].champs[0].name,
                  query2[0].champs[0].position,
                  query2[0].champs[0].type
                );
                champion.skills = query2[0].champs[0].skills;

                let player = new Player(
                  answers.name,
                  answers.id,
                  answers.nick,
                  answers.rank,
                  answers.salary,
                  answers.nationality,
                  answers.position,
                  answers.birthdate,
                  answers.region,
                  answers.team,
                  answers.kills,
                  answers.deaths,
                  answers.assists
                );

                player.championPool = champion;
                let str = JSON.stringify(player);
                str = JSON.stringify(player, null, 4);
                console.log(str);
                
                main();
              })
              .catch((error) => {
                console.log(error.message, "\n");
                main();
              });
          });
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function updatePlayer() {
  await inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "> Introduzca el ID del jugador a modificar: ",
        validate: (input: any) => validateVoid(input),
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
        switch  (answers.checkbox[index]) {
          case "Rank":
            await inquirer.prompt([
              {
                type:"list",
                name:"rank",
                choices:[
                  "iron",
                  "bronze",
                  "silver",
                  "gold",
                  "platinum",
                  "diamond",
                  "master",
                  "challenger",
                ],
                message:"> Introduce el nuevo rango del juagdor: "
              }
            ])
            .then(async(result) => {
              await db.conectarBD()
              .then(async() => {
                let modify = result.rank
                await Players.findOneAndUpdate(
                  {
                    playerID: answers.id
                  },
                  {
                    rank: modify
                  }
                )
                .then(async (result) => {
                  console.log("Jugador modificado con exito")
                  db.desconectarBD()
                }).catch((err) => {
                  console.log(err.message)
                });
              }).catch((err) => {
                
              });
            }).catch((err) => {
              console.log(err.message)
            });
            break;
          case "Salario":
            await inquirer.prompt([
              {
                type:"number",
                name:"rank",
                message:"> Introduce el nuevo salario del juagdor: ",
                validate: (input: any) => validateVoidAndisNan(input),
              }
            ])
            .then(async(result) => {
              await db.conectarBD()
              .then(async() => {
                let modify = result.rank
                await Players.findOneAndUpdate(
                  {
                    playerID: answers.id
                  },
                  {
                    salary: modify
                  }
                )
                .then(async (result) => {
                  console.log("Jugador modificado con exito")
                  db.desconectarBD()
                }).catch((err) => {
                  console.log(err.message)
                });
              }).catch((err) => {
                
              });
            }).catch((err) => {
              console.log(err.message)
            });
            break;
          case "Posicion":
            await inquirer.prompt([
              {
                type:"list",
                name:"rank",
                choices:["top", "jungler", "mid", "adc", "support"],
                message:"> Introduce la nueva posicion del juagdor: "
              }
            ])
            .then(async(result) => {
              await db.conectarBD()
              .then(async() => {
                let modify = result.rank
                await Players.findOneAndUpdate(
                  {
                    playerID: answers.id
                  },
                  {
                    position: modify
                  }
                )
                .then(async (result) => {
                  console.log("Jugador modificado con exito")
                  db.desconectarBD()
                }).catch((err) => {
                  console.log(err.message)
                });
              }).catch((err) => {
                
              });
            }).catch((err) => {
              console.log(err.message)
            });
            break;
          case "Equipo":
            await inquirer.prompt([
              {
                type:"number",
                name:"rank",
                validate: (input: any) => validateVoidAndisNan(input),
                message:"> Introduce el ID del nuevo equipo del juegador : "
              }
            ])
            .then(async(result) => {
              await db.conectarBD()
              .then(async() => {
                let modify = result.rank
                await Players.findOneAndUpdate(
                  {
                    playerID: answers.id
                  },
                  {
                    team: modify
                  }
                )
                .then(async (result) => {
                  console.log("Jugador modificado con exito")
                  db.desconectarBD()
                }).catch((err) => {
                  console.log(err.message)
                });
              }).catch((err) => {
                
              });
            }).catch((err) => {
              console.log(err.message)
            });
            break;
          case "NickName":
            await inquirer.prompt([
              {
                type:"input",
                name:"rank",
                message:"> Introduce el nuevo Nick del jugador : ",
                validate: (input: any) => validateVoid(input),
              }
            ])
            .then(async(result) => {
              await db.conectarBD()
              .then(async() => {
                let modify = result.rank
                await Players.findOneAndUpdate(
                  {
                    playerID: answers.id
                  },
                  {
                    nickName: modify
                  }
                )
                .then(async (result) => {
                  console.log("Jugador modificado con exito")
                  db.desconectarBD()
                }).catch((err) => {
                  console.log(err.message)
                });
              }).catch((err) => {
                
              });
            }).catch((err) => {
              console.log(err.message)
            });
            break;
        }
      }
    })
    .catch((err) => {
      console.log(err.message)
    });

}

export async function deletePlayer() {
  await db
    .conectarBD()
    .then(async () => {
      await inquirer
        .prompt([
          {
            name: "delete",
            type: "input",
            message: "Introduce el ID del Jugador a eliminar",
            validate: (input: any) => validateVoid(input),

          },
        ])
        .then((result1) => {
          Players.findOne({
            playerID: result1.delete,
          })
            .then(async (query) => {
              if (query.length == 0) {
                console.log("El jugador especificado no existe");
                main();
              } else {
                console.log(query);
                await inquirer
                  .prompt([
                    {
                      type: "confirm",
                      name: "confirm",
                      message: "Seguro que quieres eliminar este jugador?",
                      validate: (input: any) => validateVoid(input),

                    },
                  ])
                  .then((result2) => {
                    if (!result2.confirm) {
                      main();
                    } else {
                      Players.deleteOne({
                        playerID: result1.delete,
                      })
                        .then((result) => {
                          console.log("\nJugador eliminado con exito");
                          main();
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

export async function kda(){

}

