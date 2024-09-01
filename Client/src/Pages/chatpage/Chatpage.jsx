import "./chatpage.css";
import NewPrompt from "../../Components/NewPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

function Chatpage() {
  var path = useLocation().pathname
  let id=path.split("/").pop();
  const { isPending, error, data } = useQuery({
    queryKey: ["userchat", path],
    queryFn: () =>
      fetch(`http://localhost:8000/api/chats/${id}`, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });
  console.log(data)

  return (
    <div className="Chatpage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
            ? "something went wrong"
            : data?.history?.map((message, index) => (
                <>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height={300}
                      width={400}
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div className={message.role === "user" ? "message user" : "message"}key={index} >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </>
              ))}

          <NewPrompt />
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
