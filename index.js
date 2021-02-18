// GIVEN a command-line application that accepts user input
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
// array of questions for user
const questions = [
    // WHEN I am prompted for information about my application repository


    // WHEN I enter my project title
    {
        type: "input",
        name: "project",
        message: "What do we call your project?"
    },
    // WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
    {
        type: "input",
        name: "description",
        message: "Please give a detailed description of your project."
    },
    // WHEN I choose a license for my application from a list of options
    {
        type: "list",
        name: "license",
        message: "What kind of license will your project be under?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    // WHEN I enter my GitHub username
    {
        type: "input",
        name: "username",
        message: "What is your username for GitHub?"
    },
    // WHEN I enter my email address
    {
        type: "input",
        name: "email",
        message: "What is your email address?"
    },
    {
        type: "input",
        name: "install",
        message: "What command should be run to install dependencies?",
        default: "npm install"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to run tests?",
        default: "npm test"
    },
    {
        type: "input",
        name: "user",
        message: "What does the user need to know about using the repo?",
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?",
    }
];

// function to write README file

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
  }
// function to initialize program  
function init() {
    inquirer.prompt(questions)
    .then((inquirerResponses) => {
      console.log("Generating README...");
      writeToFile("README.md", generateMarkdown({...inquirerResponses}));
    })
  }
// function call to initialize program
init();

