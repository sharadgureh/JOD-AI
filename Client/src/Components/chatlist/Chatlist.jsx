import { Link } from "react-router-dom";
import './chatlist.css'
import {useQuery} from '@tanstack/react-query'
function Chatlist() {
  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: () =>
      fetch(`http://localhost:8000/api/userchats`, { credentials: 'include' })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        }),
  });
  
  

  return (
    <div className="Chatlist">
      <span className="title">Dashboard</span>
      <Link to="/">Create a new Chat</Link>
      <Link to="/">Explore JOD AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENTS CHATS</span>
      
      <div className="list">
      { 
        isPending
         ? "Loading..." 
         :error 
         ? "something went wrong"
         : data?.map((chat)=>(
          <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>{chat.title}</Link>
         ))
      }
      </div>

      <hr />

      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Jod AI Pro</span>
          <span>Get Unlimited Access of all feature</span>
        </div>
      </div>
    </div>
  );
}

export default Chatlist;
