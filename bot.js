const Discord = require('discord.js');
const utils=require("./utils")
const token=require("./authentication")
const voiceChannelHandler=require("./voiceChannel")


client = new Discord.Client();

data={
    playing:false,
    dispatcher:null,
    connection:null,
    memeQueue:[],
    isMemify:true,
    memifyList:[
                {name:"Prabhat",count:0,meme:"nani",threshold:5},
                {name:"shresthabijay",count:0,meme:"manigga2",threshold:5},
                {name:"karunkop",count:0,meme:"r-nigga",threshold:3},
                {name:"693mankind",count:0,meme:"re",threshold:3},

    ]
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  console.log(msg.author.username)
 
  let operator=msg.content.substring(0,1)
  let args=msg.content.substring(1,msg.content.length).split(" ")

  voiceChannelHandler(args,msg)

  if (operator==="?") {


    if(args[0]==="joke"){
            msg.channel.send("Me: You look sexy in glass Vishant <3\nVishant:rererererererererrerererere :P")
    }

    // if(args[0]==="em"){

    //     let subcommand=command.substring(3,command.length).split("*")
    //     let emojiName=subcommand[0] 

    //     const emoji=client.emojis.find(emo=>{
    //         return emo.name === emojiName
    //     });

    //     let number=1

    //     try{
    //         number=parseInt(subcommand[1])
    //         if(isNaN(number)){
    //             throw err
    //         }
    //     }
    //     catch(err){
    //         console.log(err)
    //         return null
    //     }

    //     let message=""

    //     for(var x=0;x<number;x++){
    //         message=message+" "+emoji
    //     }

    //     if(true){
    //         message=utils.displayPyramid(emoji)
    //     }

    //     msg.channel.send(message)
    // }

    

  }
});

client.login(token);