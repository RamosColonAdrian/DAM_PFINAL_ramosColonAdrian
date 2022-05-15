import inquirer from 'inquirer';
import { championRoute, playerRoute, teamRoute  } from "./routes/collectionsRoutes";



 //index
export const main = async () => {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'Con que colección quieres interactuar',
      choices: ['Champion', 'Player', 'Team', 'Salir'],
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
          name :"exit"
        }
      ])
      .then(async (input) =>{
        if(!input.exit)
          main();
        else
          return
      })
      
  }
};
main();

