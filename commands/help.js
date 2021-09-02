const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

        var list = "";


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./${file}`);

            if (!list && command.help.help != "skip") {

                var list = `\`\`${command.help.name}\`\`  :  ${command.help.help}\nUsage : ${command.help.usage}`

            } else if (command.help.help != "skip"){

                var list = list + `\n\n\`\`${command.help.name}\`\`  :  ${command.help.help}\nUsage : ${command.help.usage}`

            }

}







		const commands = new Discord.MessageEmbed()

		.setColor('#0099ff')
		.setTitle("Chat-log commands | prefix is `.`")
		.addField("Commands list", list)
		.addField("NOTE :", "`[]` is required & `{}` is optinal")
		.setFooter('chat-log', client.user.avatarURL());
		
		message.channel.send({ embeds: [commands] })
	


	
    



}

module.exports.help = {
	name: "help",
	help: "Bot commands",
	usage: ".help"
}
