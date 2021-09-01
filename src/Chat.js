import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const sendMessage= (e)=>{
        e.preventDefault();
        console.log("You typedn >>> ",input);
    }
    return (
        <div className="chat">
        <div className="chat__header">
        <Avatar fontSize="large" src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat__headerInfo">
        <h3>Room name</h3>
        <p>Last seen at ...</p>
        </div>
        <div className="chat_headerRight">
        <IconButton>
        <SearchOutlined/>
        </IconButton>
        <IconButton>
        <AttachFile/>
        </IconButton>
        <IconButton>
        <MoreVert/>
        </IconButton></div>
        </div>
        <div className="chat__body">
        <div className={`chat__message ${true && 'chat__reciever'}`}><span className="chat__name">Manvi Singhal</span>Hey Guys
        <span className="chat__timestamp">3:52pm</span></div></div>
        <div className="chat__footer">
        <InsertEmoticonIcon/>
        <form>
        <input value={input} onClick={(e)=> setInput(e.target.value)} placeholder="Type a message" type="text" />
        <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon/>
        </div>
        </div>
    )
}

export default Chat
