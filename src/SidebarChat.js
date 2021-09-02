import React, {useState, useEffect} from 'react'
import {Avatar} from "@material-ui/core";
import './SidebarChat.css';
import db from './firebase';
import { Link } from "react-router-dom";

function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
    if (id) {
      db.collection("Rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((resultsnap) => {
          setMessages(
            resultsnap.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const createChat = () => {
    const roomName = prompt("Please enter name for Room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

    return !addNewChat ? (
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
        <Avatar fontSize="large" src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p></div></div>
        </Link>
    ):(
    <div onClick={createChat} className="sidebarChat">
      <h2> Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
