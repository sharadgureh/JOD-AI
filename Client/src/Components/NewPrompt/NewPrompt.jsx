import { useCallback, useRef } from "react";
import "./NewPrompt.css";
import { useEffect } from "react";
import Upload from "../Uploads/Upload";
import { useState } from "react";
import { IKImage } from "imagekitio-react";
import model from "../../lib/Gemini";
import Markdown from "react-markdown";

function NewPrompt() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const formHandler = useCallback(async (e) => {
    e.preventDefault();
    const text = e.target.newPrompt.value;
    if (!text) return;
    add(text);

  });
  const [img, setImg] = useState({
    isloading: false,
    error: "",
    dbdata: {},
    aidata: {},
  });
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
    formHandler()
  }, [prompt, answer, img.dbdata, formHandler]);

  const chat= model.startChat({
    history:[
      {
        role:"user",
        parts:[{'text':'Hello,  i have 2 dogs in my house'}]
      },{
        role:"model",
        parts:[{'text':'Great to meet you. what would you like to know?'}]
      },
    ],
    generationConfig:{
      // maxOutputTokens:100,
    }
  });

  const add = async (text) => {
    setPrompt(text);
    const result = await chat.sendMessageStream(
      Object.entries(img.aidata).length ? [img.aidata, prompt] : [prompt]
    );
    setPrompt("")
    let generatedText=''
    for await(const chunk of result.stream){
      const chunkText=chunk.text()
      generatedText += chunkText;
      setAnswer(generatedText)
    }

    // const response = await result.response;
    console.log(text);
    setImg({
      isloading: false,
      error: "",
      dbdata: {},
      aidata: {},
    })
  };


  return (
    <>
      {img.dbdata.filePath && (
        <div style={{ width: "100%" }}>
          <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbdata.filePath}
            width="380"
            // transformation={[{ width: 880 }]}
            style={{
              borderRadius: "0px",
              height: "400px",
              width: "400px",
              borderColor: "white",
              borderWidth: "3px",
              borderStyle: "solid",
            }}
          />
        </div>
      )}
      {prompt && <div className="message user">{prompt}</div>}
      {answer && (
        <div className="message">
          {" "}
          
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endchat" ref={endRef}></div>
      <form className="newForm" onSubmit={formHandler}>
        <Upload setImg={setImg} img={img} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Ask anything..." name="newPrompt" />
        <button>
          <img src="/arrow.png" alt="arrow" />
        </button>
      </form>
    </>
  );
}

export default NewPrompt;
