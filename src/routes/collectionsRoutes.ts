import inquirer from "inquirer";
import { main } from "../index";
import {
  allChamps,
  readChampion,
  updateChampion,
} from "../helpers/processChamps";
import {
  readPlayer,
  allPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  kda
} from "../helpers/porcessPlayer";

import {
  readTeam,
  allTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  expenses,
} from "../helpers/processTeams";

export const championRoute = async () => {
  const { action } = await inquirer.prompt([
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
      await readChampion();
      break;
    case "Leer todos los campeones":
      await allChamps();
      break;
    case "Editar":
      await updateChampion();
      break;
    case "Volver":
      main();
      break;
  }
};

export const playerRoute = async () => {
  const { action } = await inquirer.prompt([
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
      readPlayer();
      break;
    case "Leer todos los Jugadores":
      allPlayers();
      break;
    case "Crear":
      createPlayer();
      break;
    case "Editar":
      updatePlayer();
      break;
    case "Borrar":
      deletePlayer();
      break;
    case "KDA de los juagadores":
      kda();
      break;
    case "Volver":
      main();
  }
};

export const teamRoute = async () => {
  const { action } = await inquirer.prompt([
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
      readTeam();
      break;
    case "Leer todos los equipos":
      allTeams();
      break;
    case "Crear":
      createTeam();
      break;
    case "Editar":
      updateTeam();
      break;
    case "Borrar":
      deleteTeam();
      break;
    case "Gastos":
      expenses();
      break;
    case "Volver":
      main();
      break;
  }
};
