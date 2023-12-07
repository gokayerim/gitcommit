#!/usr/bin/env node

import inquirer from "inquirer";
import select from "@inquirer/select";
import chalk from "chalk";
import { exec } from "child_process";
import { COMMIT_TYPES, JIRA_ID_REGEX } from "./constants.js";

async function mainPrompt() {
  const activity = await selectCommitType();
  const branchName = await inputTaskId();
  const desciption = await inputCommitMessage();
  const argv = [...process.argv.slice(2)].join(" ");

  exec(
    `git commit -m "${activity}: ${branchName} ${desciption}" ${argv}`,
    (_, stdout) => {
      console.log(stdout);
    }
  );
}

async function selectCommitType() {

  const selectedActivity = await select({
    message: "Select Change Type: ",
    choices: COMMIT_TYPES.map((t) => ({
      value: t.key,
      name: `${t.key.padEnd(15, " ")}: ${t.description}`
    }))
  });
  return selectedActivity;
}

async function inputTaskId() {
  return new Promise(function (resolve, reject) {
    exec("git branch --show-current", async (err, stdout) => {
      if (err) {
        reject();
      }
      const jobId = JIRA_ID_REGEX.exec(stdout);

      const { taskId } = await inquirer.prompt({
        type: "input",
        name: "taskId",
        default: jobId?.length && jobId[0],
        message: "Enter Task Id: "
      });

      resolve(taskId);
    });
  });
}
async function inputCommitMessage() {
  const { message } = await inquirer.prompt({
    type: "input",
    name: "message",
    message: "Enter Commit Message: ",
    validate: async (input) => input.length > 2
  });

  return message;
}

exec("git branch", (err) => {
  if (err) {
    console.log(chalk.red("You are not in a git project! 🤦"));
    process.exit(0);
  }
  exec("git diff --name-only --cached", (err, result) => {
    if (!result) {
      console.log(chalk.red("Stage is empty. Nothing to commit! 🤷"))
      process.exit(0);
    }

    mainPrompt();
  })
});
