#!/usr/bin/env node
import 'dotenv/config';
import inquirer from 'inquirer';
import { init } from './init.js';
import { choices } from './choices.js';
import { fullProcess } from './fullProcess.js';
// import { parityCheck } from './parityCheck.js';
import {
  singleBackup,
  singleCleanSource,
  singleVideoCompression,
} from './singleSteps.js';

global.globals = init();

// check if sourceisEmpty
if (globals.sourceIsEmpty) {
  async function emptySourceQuestions() {
    const answer = await inquirer.prompt({
      type: 'list',
      name: 'emptySourceQuestions',
      message: 'What do want to do?',
      choices: choices.emptySource,
    });

    return handleMainAnswers(answer.emptySourceQuestions);
  }
  await emptySourceQuestions();
} else {
  async function mainQuestion() {
    const answer = await inquirer.prompt({
      type: 'list',
      name: 'mainQuestion',
      message: 'What do want to do?',
      choices: choices.main,
    });

    return handleMainAnswers(answer.mainQuestion);
  }
  await mainQuestion();
}

async function singleSteps() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'singleSteps',
    message: 'Which single step?',
    choices: choices.single,
  });

  return handleSingleAnswers(answer.singleSteps);
}

async function handleMainAnswers(response) {
  if (response === choices.main[0]) {
    await fullProcess();
  }

  if (response === choices.main[1]) {
    await singleSteps();
  }

  if (response === choices.main[2]) {
    parityCheck();
  }
}

async function handleSingleAnswers(response) {
  if (response === choices.single[0]) {
    await singleBackup();
  }

  if (response === choices.single[1]) {
    await singleCleanSource();
  }

  if (response === choices.single[2]) {
    await singleVideoCompression();
  }
}
