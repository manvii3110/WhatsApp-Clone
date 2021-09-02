import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from './firebase';
import {useParams} from "react-router-dom";
import './Chat.css';
import {useStateValue} from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [{user}, dispatch] = useStateValue();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
    if (roomId) {
      db.collection("Rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          if (snapshot.data()) {
            setRoomName(snapshot.data().name);
          }
        });
      db.collection("Rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((resultsnap) => {
          setMessages(
            resultsnap.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("Rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        //email: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    } else {
      alert("Type something first");
    }
  };
    return (
        <div className="chat">
        <div className="chat__header">
        <Avatar fontSize="large" src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat__headerInfo">
        <h3>{roomName}</h3>
        <p>Last seen{""}
        {
            new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()
        }</p>
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
        {messages.map((message) => (
          <div key={message.timestamp}>
            <p
              className={`chat__message ${
                message.name === user.displayName && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          </div>
        ))}
      </div>
        <div className="chat__footer">
        <InsertEmoticonIcon/>
        <form>
        <input
            required={true}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon/>
        </div>
        </div>
    )
}

export default Chat;