const { Client, Collection, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const fetch = require("node-fetch");
const Discord = require("discord.js");


client.on("guildCreate", async guild => {

let owner = await guild.fetchOwner().then(owner => owner.user)
owner.send("Hello **" + owner.username + "**, \n\nYou or someone else just added me to **" + guild.name + "** \n\nto set up logs channel do ``.setup`` in your server!\n\nyou can manually create log channel but please make sure that channel name is ``chat-log``")


});





client.on("ready", () => {

console.log("done - " + client.user.tag)
client.user.setActivity(".setup | Watching your messages");

})



client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

  console.log(file + ": Loaded.")
  client.commands.set(command.help.name, command);

}



var prefix = "."
client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.type == "dm") return;


    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = client.commands.get(command.slice(prefix.length));
    if (cmd) {    
    if(cmd.help.help == "skip") return;
    cmd.run(client, message, args);    
    }

      


})


client.on("messageDelete", async message => {

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = client.commands.get("messageDelete");
    if (cmd) {    
    cmd.run(client, message, args);    
    }

});


client.on("messageUpdate", async message => {

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = client.commands.get("messageUpdate");
    if (cmd) {    
    cmd.run(client, message, args);    
    }


});

client.login(process.env.BOT_TOKEN);
