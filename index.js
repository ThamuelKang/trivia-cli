#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { triviaQuestions } from "./src/question.js";
// import logUpdate from 'log-update';


// helper function that pauses with specified ms parameters
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// welcome
async function welcome() {
    const animation = chalkAnimation.rainbow('🦆 Duck Trivia 🧠\n');
    await sleep(2000);
    animation.stop();
}

async function askQuestion(questions) {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        const questionObject = questions[i];

        // let secondsLeft = 5;
        // const countdown = setInterval(() => {
        //     logUpdate(`⏳ Time left: ${secondsLeft--}s`);
        // }, 1000);

        console.log('⏳ You have 10 seconds to answer!');

        // used promise race to "race" two promises together, whichever one fufills first, is the select promise
        const result = await Promise.race([
            new Promise(resolve => {
                setTimeout(() => resolve({ timedOut: true }), 10000);
            }),
            inquirer.prompt({
                type: 'list',
                name: 'userAnswer',
                message: questionObject.question,
                choices: questionObject.choices,
            })
        ]);

        // clearInterval(countdown);

        // Skips one instance of for loop and console logs 
        if (result.timedOut) {
            console.log(`\n⌛ Time's up! The correct answer was: ${questionObject.correctAnswer}\n`);
            continue;
        }

        // Assigns userAnswers with selected answer
        const userAnswer = result.userAnswer;

        if (userAnswer === questionObject.correctAnswer) {
            console.log("✅ Correct!\n");
            score++;
        } else {
            console.log(`❌ Incorrect. The correct answer was: ${questionObject.correctAnswer}\n`);
        }
    }

    // Final verdict

    if (score >= 5) {
        console.log(`\n Final score: ${score}! \n Wow! You r ducking smart!`);
    } else {
        console.log(`\n🎯 Final score: ${score}`);
    }

    process.exit();
}


// top level await is only available for es14 and above!
await welcome();
await askQuestion(triviaQuestions);
