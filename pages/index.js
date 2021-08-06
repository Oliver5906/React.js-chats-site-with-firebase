import React, { useState, useEffect } from 'react'

function Home() {
  const [storage,setStorage] = useState(false)
  const [Lo,setLo] = useState(false)
  const check = () => {
    if(!localStorage.getItem("chats")) return
    // setStorage(JSON.parse(localStorage.getItem("chats")))
    setStorage(JSON.parse(localStorage.getItem("chats")))
  } 
  const [text, setText] = useState('')
  const [Code, setCode] = useState('')
  useEffect(() => {
    check()
  },[])
  useEffect(() => {
    check()
  },[Lo])
  const submit = async () => {
    setLo(true)
    function RandomId(len){
    var text2 = "";

    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < len; i++ )
      text2 += charset.charAt(Math.floor(Math.random() * charset.length));

    return text2;
}
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
const IdRandom = RandomId(40)
if(!localStorage.getItem("chats")){
  const data = [{link: `http://localhost:3000/channels/${IdRandom}`,name:`${text}`}]
  localStorage.setItem("chats",JSON.stringify(data))
}else{
  const data = [...JSON.parse(localStorage.getItem("chats")),{link: `http://localhost:3000/channels/${IdRandom}`,name:`${text}`}]
  localStorage.setItem("chats",JSON.stringify(data))
}
    await fetch('https://channels-3fdab-default-rtdb.firebaseio.com/channels.json', {
      method: 'POST',
      body: JSON.stringify({
        id: IdRandom,
        name: text,
        message: false
      }),
    });
    setCode(IdRandom)
    document.getElementById('id01').style.display='block'
    setLo(false)
  }
  const copy = () => {
    var copyText = document.getElementById("CopyInput");
    var button = document.getElementById("CopyButton");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    button.style.backgroundColor = "red"
    setTimeout(() => {button.style.backgroundColor = "#04AA6D"},1500)
  }
  return (
    <div>
      <style jsx>{`
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  background-color: #76345d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


button:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
#id02{
  display:none;
}
body {font-family: Arial, Helvetica, sans-serif;}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

/* Extra styles for the cancel button */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the image and position the close button */

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)} 
  to {-webkit-transform: scale(1)}
}
  
@keyframes animatezoom {
  from {transform: scale(0)} 
  to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
.form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  margin-bottom: 15px;
}
.form{
	border: green solid 1px;
}
.right{
	float:right;
}
      `}</style>


<h3>Create Channel To Talk With Your Friend</h3>

<div>
  <div>
    <label>Please Enter Channel Name</label>
    <input onKeyUp={(event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("button").click();
       }
    }} type="text" placeholder="Channel Name.." value={text} onChange={(event) => {setText(event.target.value);}}/>
    <button id="button" type="button" onClick={() => submit()}>Create</button>
  </div>
</div>

<div id="id01" className="modal">
  
  <div className="modal-content animate">

    <div className="container">
      <label for="uname"><b>Url</b></label>
      <input id="CopyInput" type="text" value={`localhost:3000/channels/${Code}`} />

      <button type="button" id="CopyButton" onClick={copy}>Copy</button>
      <a href={`localhost:3000/channels/${Code}`} target="_blank"><button type="button" id="CopyButton">Go</button></a>
    </div>

  </div>
</div>

{!storage ? "" : <div>

<h3>Your Chats</h3>
{storage.map(item => 
  <div className="form">
  <form>
    <a href={item.link} target="_blank">{item.link}</a>
    <label className="right">{item.name}</label>
  </form>
</div>
  )}
  </div>}
    </div>
  )
}

export default Home