#!/usr/bin/env node

import inquirer from "inquirer";
import select from "@inquirer/select";
import { exec } from "child_process";

async function mainPrompt() {
  const activity = await selectActivity();
  const branchName = await inputBranchName();
  const desciption = await inputDescription();

  console.log(`${activity}: ${branchName} ${desciption}`);

  exec(`git commit -m "${activity}: ${branchName} ${desciption}"`);
}

async function selectActivity() {
  const types = ["feat", "refactor", "chore"];

  const selectedActivity = await select({
    message: "Aktivite seçiniz: ",
    choices: types.map((t) => ({
      name: t,
      value: t
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

      const def = /(^[A-Z]{1,10}\-\d{3,5})/.exec(stdout)[0];

      const { branchName } = await inquirer.prompt({
        type: "input",
        name: "branchName",
        default: def,
        message: "Branch name giriniz: "
      });

      resolve(branchName);
    });
  });
}
async function inputDescription() {
  const { desciption } = await inquirer.prompt({
    type: "input",
    name: "desciption",
    message: "Açıklama  giriniz: "
  });

  return desciption;
}

mainPrompt();
