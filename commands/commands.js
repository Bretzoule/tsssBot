function chinoise(message) {
  let newWord = "";
  for (var i = 0; i < message.length; i++) {
    newWord +=
      i % 2 == 0
        ? message.charAt(i).toUpperCase()
        : message.charAt(i).toLowerCase();
  }
  return newWord + " 🐍";
}

function snek(channel, messageId) {
  channel.messages
    .fetch({ around: messageId, limit: 1 }, { cache: false, force: true })
    .then((message) => {
      let myMessage = chinoise(message.get(messageId).content);
      channel.send(myMessage);
    })
    .catch((error) => console.log(error));
}

function help(channel) {
  const embed = {
    title: "Halp 🐍",
    color: 3066993,
    description: `Bot qui tsss quand DJULO dit des trucs désagréables`,
    fields: [
      {
        name: "**.tss snek `msgID`**",
        value:
          "Envoie un message 'aUtIsTe' 🐍 à partir d'un id de message donné",
      },
      {
        name: "**.tss list**",
        value: "Affiche la liste des mots désagréables qui déclenchent le bot",
      },
    ],
  };
  channel.send({
    embed,
  });
}

function addToList(desagreable, word) {
  if (!desagreable.includes(word)) desagreable.push(word);
}

function removeFromList(desagreable, word) {
  return desagreable.filter((item) => item != word);
}

function list(channel, desagreable) {
  const list = desagreable.join(", ");
  const embed = {
    title: "Liste :",
    color: 3066993, //couleur verte
    description: `${list}`, //ce qui va etre ecrit
  };
  channel.send({ embed });
}

exports.snek = snek;
exports.help = help;
exports.list = list;
exports.addToList = addToList;
exports.removeFromList = removeFromList;
