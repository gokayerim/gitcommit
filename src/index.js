#!/usr/bin/env node

import inquirer from "inquirer";
import select from "@inquirer/select";
import { exec } from "child_process";

async function mainPrompt() {
  const activity = await selectActivity();
  const branchName = await inputBranchName();
  const desciption = await inputDescription();
  const argv = [...process.argv.slice(2)].join(" ");

  exec(`git commit -m "${activity}: ${branchName} ${desciption}" ${argv}`);
}

async function selectActivity() {
  const types = [
    { key: "feat", description: "A new feature" },
    { key: "fix", description: "A bug fix" },
    {
      key: "chore",
      description: "Updating grunt tasks etc; no production code change"
    },
    { key: "test", description: "Adding missing tests" },
    { key: "refactor", description: "Improve readability of the code" },
    { key: "docs", description: "Only documantation changes" },
    {
      key: "docs",
      description:
        "Formatting, missing semi colons, etc; no production code change"
    }
  ];

  const selectedActivity = await select({
    message: "Select job type: ",
    choices: types.map((t) => ({
      value: t.key,
      name: `${t.key.padEnd(15, " ")}: ${t.description}`
    }))
  });
  return selectedActivity;
}

async function inputBranchName() {
  return new Promise(function (resolve, reject) {
    exec("git branch --show-current", async (err, stdout, stderr) => {
      if (err) {
        reject();
      }
      const def = /(^[A-Z]{1,10}\-\d{3,5})/.exec(stdout);

      const { branchName } = await inquirer.prompt({
        type: "input",
        name: "branchName",
        default: def?.length && def[0],
        message: "Enter job number: "
      });

      resolve(branchName);
    });
  });
}
async function inputDescription() {
  const { desciption } = await inquirer.prompt({
    type: "input",
    name: "desciption",
    message: "Enter description: ",
    validate: async (input) => input.length > 2
  });

  return desciption;
}

exec("git branch", (err) => {
  if (err) {
    console.log("You are not in a git project !!!");
    process.exit(0);
  } else {
    mainPrompt();
  }
});
