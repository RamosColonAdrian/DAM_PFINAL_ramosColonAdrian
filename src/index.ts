import inquirer from 'inquirer';
import { validateVoid } from './helpers/validatorsHelper';
import { championRoute, playerRoute, teamRoute  } from "./routes/collectionsRoutes";



 //index
export const main = async () => {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'Con que colección quieres interactuar',
      choices: ['Champion', 'Player', 'Team', 'Salir'],
      validate: (input: any) => validateVoid(input),
    },
  ]);
  switch (action) {
    case 'Champion':
      championRoute();
      break;
    case 'Player':
      playerRoute();
      break;
    case 'Team':
      teamRoute();
      break;
    case 'Salir':
      await inquirer.prompt([
        {
          type: "confirm",
          message:"Seguro que quieres salir?",
          name :"exit",
          validate: (input: any) => validateVoid(input),
        }
      ])
      .then(async (input) =>{
        if(!input.exit)
          main();
        else
        process.exit(1)
      })
      
  }
};
main();

