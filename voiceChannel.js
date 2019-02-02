let memeList =require("./meme.js")

let play=(memeName,msg)=>{

    if(data.playing){
        data.memeQueue.push(memeName)
        msg.channel.send("A meme has been Queued!")
        return 0
    }

    if(data.memeQueue.length===0){
        data.memeQueue.push(memeName)
    }

    data.dispatcher=data.connection.playFile(`./music/${data.memeQueue[0]}.mp3`)
    data.playing=true
    data.memeQueue.shift()

    data.dispatcher.on("end",()=>{
        data.connection.player.streamingData.pausedTime = 0;
        data.playing=false
        if(data.memeQueue[0]){
            play(data.memeQueue[0])
        }
    })
}

let voiceChannel=async (args,msg)=>{

        if(data.isMemify){
            for(let x=0;x<data.memifyList.length;x++){
                if(data.memifyList[x].name===msg.author.username){
                    data.memifyList[x].count=data.memifyList[x].count+1
                    console.log(data.memifyList[x],data.memeQueue)
                    if(data.memifyList[x].count>=data.memifyList[x].threshold){ 
                        data.memifyList[x].count=0
                        if(!data.connection){
                            data.connection= await msg.member.voiceChannel.join();   
                            play(data.memifyList[x].meme,msg) 
                        }
                        else{
                            play(data.memifyList[x].meme,msg)
                        }
                        
                    }    
                }
            }
        }
    


        if (!msg.guild) return;

        if(args[0]==="vm"){
        if (msg.member.voiceChannel) {

            if(msg.member.voiceChannel.status===0){
                msg.channel.send("Join me to the party first!")
            }

            try{

                    

                    if(args[1]==="join"){
                        data.connection= await msg.member.voiceChannel.join();
                        msg.channel.send("Yoooo ma nigggas!")
                        return
                    }
                    else if(args[1]==="leave"){
                        data.connection= await msg.member.voiceChannel.join();
                        data.connection.disconnect()
                        msg.channel.send("Byeee ma nigggas!")
                    }

                    else if(args[1]==="help"){
                        let message="Meme List\n\n"

                        for(let y=0;y<memeList.length;y++){
                            message=message+`${y+1}. ${memeList[y]}\n`
                        }

                        msg.channel.send(message)
                        return
                    }
                
                    else if(args[1]==="meme"){

                        if(!args[2]){
                            msg.channel.send("Missing meme name!")
                            return 
                        }

                        if(memeList.indexOf(args[2])<0){
                            msg.channel.send("No such meme nigga!")
                            return
                        }

                        play(args[2],msg)

                    }

                    if(data.dispatcher){

                        if(args[1]==="pause"){

                            if(data.dispatcher.paused){
                                msg.channel.send("It's already paused!")
                                return 
                            }

                            if(!data.playing){
                                msg.channel.send("Nothing is being streamed at the moment!")
                                return 
                            }

                            data.dispatcher.pause()
                            msg.channel.send("It has been paused!")
                        }

                        if(args[1]==="resume"){

                            if(!data.dispatcher.paused || !data.playing){
                                msg.channel.send("It's already playing or there is nothing being played at all!")
                                return 
                            }

                            data.dispatcher.resume()
                            msg.channel.send("It has been resumed!")
                        }

                        if(args[1]==="stop"){

                            if(!data.playing){
                                msg.channel.send("Nothing is being streamed at the moment!")
                                return 
                            }

                            data.dispatcher.end()
                            data.playing=false
                            msg.channel.send("I stopped it!")
                        }
                    }

            }
                
            catch(err){
                console.log(err)
            }
            
            
          } else {
            msg.reply('You need to join a voice channel first!');
          }
        }
}

module.exports=voiceChannel