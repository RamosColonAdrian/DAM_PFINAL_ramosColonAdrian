"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const collectionsRoutes_1 = require("./routes/collectionsRoutes");
//index
const main = async () => {
    const { action } = await inquirer_1.default.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'Con que colección quieres interactuar',
            choices: ['Champion', 'Player', 'Team', 'Salir'],
        },
    ]);
    switch (action) {
        case 'Champion':
            (0, collectionsRoutes_1.championRoute)();
            break;
        case 'Player':
            (0, collectionsRoutes_1.playerRoute)();
            break;
        case 'Team':
            (0, collectionsRoutes_1.teamRoute)();
            break;
        case 'Salir':
            await inquirer_1.default.prompt([
                {
                    type: "confirm",
                    message: "Seguro que quieres salir?",
                    name: "exit"
                }
            ])
                .then(async (input) => {
                if (!input.exit)
                    (0, exports.main)();
                else
                    return;
            });
    }
};
exports.main = main;
(0, exports.main)();
