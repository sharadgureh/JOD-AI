import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";


function Dashboard() {
const queryClient = useQueryClient()
const navigate=useNavigate()
  // Mutations
  const mutation = useMutation({
    mutationFn: async (text)=>{
      const res = await fetch('http://localhost:8000/api/chats', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
      });
      return res.json;
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userChats'] })
      navigate(`/dashboard/chats/${id}`)
    },
  })
  async function submitHandler(e){
    e.preventDefault()
    const text=e.target.newPrompt.value;
    if(!text) return;

    mutation.mutate(text)
}
  return (
    <div className="Dashboard">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>JOD AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a new chat</span>
          </div>
          {/*  */}
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze images</span>
          </div>
          {/*  */}
          <div className="option">
            <img src="/code.png" alt="" />
            <span>correct my code</span>
          </div>
        </div>
      </div>
      <div className="formcontainer">
        <form onSubmit={submitHandler}>
          <input type="text" name="newPrompt" placeholder="Ask me Anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
