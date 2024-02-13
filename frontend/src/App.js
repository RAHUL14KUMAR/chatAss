import './App.css';
import { BsChatHeartFill} from 'react-icons/bs'
import { useState,useEffect } from 'react';
import Card from './Card';
import { io } from "socket.io-client";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const socket = io.connect(`${"http://localhost:4000"}`);

function App() {
const [name,setName]=useState("");
const [inp,setInp]=useState("");
const [a,setA]=useState([]);

useEffect(()=>{
  socket.emit("userConnected");

  socket.on("messageReceived",(payload)=>{
    setA([...a,{name:payload.name,message:payload.message}])
  })
})
console.log(a)

async function send(){
  if(name===""){
    toast.info("anonmyous user have name");
    return;
  }else if(inp===""){
    toast.info("empty messsage cant send");
    return;
  }else{
    toast.success("your messsage has been send !!");
    socket.emit("messageSend",{name,inp});
    setInp("")
    return
  }
}

return (
  <div className="flex h-screen w-screen items-center justify-center bg-emerald-100">
    <ToastContainer/>
      <div className="flex-col rounded-lg bg-white text-center drop-shadow-2xl p-4 m-4 w-1/4 h-fit">
          <div className="flex-col p-2">
              <div className="mx-auto my-auto flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100">
                  <BsChatHeartFill className="text-4xl text-green-600" />
              </div>
              <h1 className="font-sans font-bold text-green-600">CHAT APP </h1>
          </div>

          <div className="mb-5 text-2xl font-bold">
              <h1>Lets chat !!!</h1>
              <p className="text-base font-mono tracking-widest text-emerald-950">As An Anonymous</p>
          </div>

          <div >
            <input type="text" placeholder="enter your anonymous name" className='text-black border-2 border-emerald-400 p-2 bg-emerald-200 font-mono placeholder:font-mono placeholder:text-black w-3/4' value={name} onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="m-2 flex-col p-5">

            <div className='m-5'>
              <div className="h-64 w-75 border-4 border-emerald-400 bg-emerald-100">
                  {
                    a.map((item)=>{
                      return <Card message={item.message} name={item.name} Nam={name}/>
                    })
                  }
              </div>
            </div>
            <div className='flex justify-center'>
              <input type="text" placeholder="enter your message" className='text-black border-2 border-emerald-400 p-2 bg-emerald-200 font-mono placeholder:font-mono placeholder:text-black' value={inp} onChange={(e)=>setInp(e.target.value)} />
              <button className='bg-emerald-400 hover:bg-emerald-600 text-black
              font-mono p-2 mx-2' onClick={send}>send</button>
            </div>
          </div>
      </div>
  </div>
)
}

export default App;
