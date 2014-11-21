var censor = require("censorify");

console.log(censor.getCensoredWords());
console.log(censor.censor("Some text containing mad, bad and sad"));

censor.addCensoredWord("wtf");
console.log(censor.getCensoredWords());
console.log(censor.censor("wtf are you talking about?"));