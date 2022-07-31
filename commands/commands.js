function chinoise(message) {
    let newWord = "";
    for (var i = 0; i < message.length; i++) {
        newWord += ((i % 2 == 0) ? message.charAt(i).toUpperCase() : message.charAt(i).toLowerCase());
    }
    return newWord + " 🐍";
}

function snek(channel, messageId) {
    channel.messages.fetch({ around: messageId, limit: 1 }, { cache: false, force: true }).then(message => {
        let myMessage = chinoise(message.get(messageId).content);
        channel.send(myMessage);
    }).catch(error =>
        console.log(error)
    )
}

function help(channel) {
    channel.send("Halp me : 🐍");
}

function addToList(desagreable, word) {
    if (!desagreable.includes(word)) desagreable.push(desagreable);
}

function list(channel, desagreable) {

    const list = desagreable.join(", ");
    const embed = {
        title: "Liste :",
        color: 3447003, 					//couleur bleue claire
        description: `${list}`   //ce qui va etre ecrit
    }
    channel.send({ embed });
}

exports.snek = snek
exports.help = help
exports.list = list
exports.addToList = addToList