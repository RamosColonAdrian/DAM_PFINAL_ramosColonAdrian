import inquirer from "inquirer";
import { main } from "..";
import { Player } from "../classes/Player";
import { Team } from "../classes/Team";
import { db } from "../database/database";
import { teamRoute } from "../routes/collectionsRoutes";
import { Players } from "../schema/playerSchema";
import { Teams } from "../schema/teamSchema";
import { validateVoid } from "./validatorsHelper";

export async function readTeam() {
  await db
    .conectarBD()
    .then(async () => {
      await inquirer
        .prompt([
          {
            type: "input",
            name: "teamName",
            message: "> Indica el nombre del equipo: ",
            validate: (input: any) => validateVoid(input), //callback
          },
        ])
        .then(async (result) => {
          await Teams.aggregate([
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
              main();
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

export async function allTeams() {
  await db
  .conectarBD()
  .then(async () => {
    await Teams.aggregate([
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
        let arrayTeam = new Array<Player>();
        let t = new Team("", "", "", "", true, "");
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[i].players.length; j++) {
            let p = new Player(
              result[i].players[j].name,
              result[i].players[j].playerID,
              result[i].players[j].nickName,
              result[i].players[j].rank,
              result[i].players[j].salary,
              result[i].players[j].nationality,
              result[i].players[j].position,
              result[i].players[j].birthdate,
              result[i].players[j].region,
              result[i].players[j].team,
              result[i].players[j].kills,
              result[i].players[j].deaths,
              result[i].players[j].assists
            );
            arrayTeam.push(p);
          }
          t = new Team(
            result[i].name,
            result[i].teamID,
            result[i].coach,
            result[i].region,
            result[i].playingCurrently,
            result[i].headquarters
          );
          t.players = arrayTeam
          arrayTeam = new Array<Player>()
          let str = JSON.stringify(t);
          str = JSON.stringify(t, null, 4);
          console.log(str, "\n");
        }
        main();
      })
      .catch((err) => {
        console.log(err.mesaage);
      });
  })
  .catch((err) => {
    console.log(err.mesaage);
  });
}

export async function createTeam() {
  await db
    .conectarBD()
    .then(async (result) => {
      await inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "> Introduzca el nombre del equipo:",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "input",
            name: "teamID",
            message: "> Introduzca el ID del equipo:",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "input",
            name: "coach",
            message: "> Introduzca el nombre del entrenador del equipo:",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "input",
            name: "region",
            message: "> Introduzca la region del equipo:",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "confirm",
            name: "playing",
            message: "> El equipo está activo?:",
            validate: (input: any) => validateVoid(input),
          },
          {
            type: "input",
            name: "headquarters",
            message: "> Introduzca donde se encuentra la sede del equipo:",
            validate: (input: any) => validateVoid(input),
          },
        ])
        .then(async (answers) => {
          let team = new Team(
            answers.name,
            answers.teamID,
            answers.coach,
            answers.region,
            answers.playingCurrently,
            answers.headquarters
          );
          let schema = {
            teamID: team.teamID,
            name: team.name,
            coach: team.coach,
            region: team.region,
            playingCurrently: team.playingCurrently,
            headquarters: team.headquarters,
          };
          let schemaTeam = new Teams(schema);
          await schemaTeam
            .save()
            .then(() => {
              console.log("Documento salvado con exito");
              main();
            })
            .catch(() => {
              console.log("Error al salvar el docuemnto en la base de datos");
              main();
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

export async function updateTeam() {
  await inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "> Introduzca el ID del equipo a modificar: ",
        validate: (input: any) => validateVoid(input),
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
            await inquirer
              .prompt([
                {
                  type: "input",
                  name: "name",
                  message: "> Introduce el nuevo nombre del equipo: ",
                  validate: (input: any) => validateVoid(input),
                },
              ])
              .then(async (result) => {
                await db
                  .conectarBD()
                  .then(async () => {
                    let modify = result.name;
                    await Teams.findOneAndUpdate(
                      {
                        teamID: answers.id,
                      },
                      {
                        name: modify,
                      }
                    )
                      .then(async (result) => {
                        console.log("Equipo modificado con exito");
                        db.desconectarBD();
                        main();
                      })
                      .catch((err) => {
                        console.log(err.message);
                      });
                  })
                  .catch((err) => {});
              })
              .catch((err) => {
                console.log(err.message);
              });
            break;
          case "Coach":
            await inquirer
              .prompt([
                {
                  type: "input",
                  name: "coach",
                  message: "> Introduce el nuevo entrenador del equipo: ",
                  validate: (input: any) => validateVoid(input),
                },
              ])
              .then(async (result) => {
                await db
                  .conectarBD()
                  .then(async () => {
                    let modify = result.coach;
                    await Players.findOneAndUpdate(
                      {
                        teamID: answers.id,
                      },
                      {
                        coach: modify,
                      }
                    )
                      .then(async (result) => {
                        console.log("Equipo modificado con exito");
                        db.desconectarBD();
                        main();
                      })
                      .catch((err) => {
                        console.log(err.message);
                      });
                  })
                  .catch((err) => {});
              })
              .catch((err) => {
                console.log(err.message);
              });
            break;
          case "Region":
            await inquirer
              .prompt([
                {
                  type: "input",
                  name: "region",
                  message: "> Introduce la nueva region del equipo: ",
                  validate: (input: any) => validateVoid(input),
                },
              ])
              .then(async (result) => {
                await db
                  .conectarBD()
                  .then(async () => {
                    let modify = result.region;
                    await Players.findOneAndUpdate(
                      {
                        teamID: answers.id,
                      },
                      {
                        region: modify,
                      }
                    )
                      .then(async (result) => {
                        console.log("Equipo modificado con exito");
                        db.desconectarBD();
                        main();
                      })
                      .catch((err) => {
                        console.log(err.message);
                      });
                  })
                  .catch((err) => {});
              })
              .catch((err) => {
                console.log(err.message);
              });
            break;
          case "Sede":
            await inquirer
              .prompt([
                {
                  type: "input",
                  name: "headquarters",
                  validate: (input: any) => validateVoid(input),
                  message:
                    "> Introduce donde se encuentra la nueva sede del equipo : ",
                },
              ])
              .then(async (result) => {
                await db
                  .conectarBD()
                  .then(async () => {
                    let modify = result.headquarters;
                    await Players.findOneAndUpdate(
                      {
                        teamID: answers.id,
                      },
                      {
                        headquarters: modify,
                      }
                    )
                      .then(async (result) => {
                        console.log("Equipo modificado con exito");
                        db.desconectarBD();
                        main();
                      })
                      .catch((err) => {
                        console.log(err.message);
                      });
                  })
                  .catch((err) => {});
              })
              .catch((err) => {
                console.log(err.message);
              });
            break;
          case "Activo":
            await inquirer
              .prompt([
                {
                  type: "confirm",
                  name: "active",
                  message: "> El equipo está en activo : ",
                  validate: (input: any) => validateVoid(input),
                },
              ])
              .then(async (result) => {
                await db
                  .conectarBD()
                  .then(async () => {
                    let modify = result.active;
                    await Players.findOneAndUpdate(
                      {
                        teamID: answers.id,
                      },
                      {
                        playingCurrently: modify,
                      }
                    )
                      .then(async (result) => {
                        console.log("Equipo modificado con exito");
                        db.desconectarBD();
                        main();
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

export async function deleteTeam() {
  await db
    .conectarBD()
    .then(async (result) => {
      await inquirer
        .prompt([
          {
            name: "delete",
            type: "input",
            message: "Introduce el ID del Equipo a eliminar",
          },
        ])
        .then((result1) => {
          Teams.findOne({
            teamID: result1.delete,
          })
            .then(async (query) => {
              if (query.length == 0) {
                console.log("El Equipo especificado no existe");
                main();
              } else {
                console.log(query);
                await inquirer
                  .prompt([
                    {
                      type: "confirm",
                      name: "confirm",
                      message: "Seguro que quieres eliminar este Equipo?",
                    },
                  ])
                  .then((result2) => {
                    if (!result2.confirm) {
                      main();
                    } else {
                      Teams.deleteOne({
                        teamID: result1.delete,
                      })
                        .then((result) => {
                          console.log("\nEquipo eliminado con exito");
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

export async function expenses() {
  await db
    .conectarBD()
    .then(async () => {
      await Teams.aggregate([
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
          let arrayTeam = new Array<Player>();
          let t = new Team("", "", "", "", true, "");
          for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].players.length; j++) {
              let p = new Player(
                result[i].players[j].name,
                result[i].players[j].playerID,
                result[i].players[j].nickName,
                result[i].players[j].rank,
                result[i].players[j].salary,
                result[i].players[j].nationality,
                result[i].players[j].position,
                result[i].players[j].birthdate,
                result[i].players[j].region,
                result[i].players[j].team,
                result[i].players[j].kills,
                result[i].players[j].deaths,
                result[i].players[j].assists
              );
              arrayTeam.push(p);
            }
            t = new Team(
              result[i].name,
              result[i].teamID,
              result[i].coach,
              result[i].region,
              result[i].playingCurrently,
              result[i].headquarters
            );
            t.players = arrayTeam
            arrayTeam = new Array<Player>()
            console.log("GASTOS DE ",t.name,": ",t.expenses)
          }
          main();
        })
        .catch((err) => {
          console.log(err.mesaage);
        });
    })
    .catch((err) => {
      console.log(err.mesaage);
    });
}