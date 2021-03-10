const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const questions = [
    {
        type: "input",
        name: "project",
        message: "What do we call your project?"
    },
    {
        type: "input",
        name: "description",
        message: "Please give a detailed description of your project."
    },
    {
        type: "list",
        name: "license",
        message: "What kind of license will your project be under?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    {
        type: "input",
        name: "username",
        message: "What is your username for GitHub?"
    },
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
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
  }
function init() {
    inquirer.prompt(questions)
    .then((inquirerResponses) => {
      console.log("Generating README...");
      writeToFile("README.md", generateMarkdown({...inquirerResponses}));
    })
  }
init();

function generateMarkdown(data) {
    return `${data.project}
  ## Description
  ${data.description}
  ## Table of Contents 
  * [Installation](#install)
  * [Usage](#user)
  * [Contributing](#contributing)
  * [Tests](#test)
  * [Questions](#questions)
  ## Installation
  To install necessary dependencies, run the following command:
  \`\`\`
  ${data.install}
  \`\`\`
  ## Usage
  ${data.user}
  ## Contributing
  ${data.contributing}
  ## Tests
  To run tests, run the following command:
  \`\`\`
  ${data.test}
  \`\`\`
  ## Questions
  If you have any questions about the repo, please send me an email at ${data.email}.`
  ;}
  module.exports = generateMarkdown;
  