import { useState } from "react";
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import avatarChatBot from '../../assets/Chatbots/chatbot-robo-advisor-chat-bot-robot-like-assistant-concept-of-digital-advisor-avatar-to-help-the-customer-icon-vector.jpg'
import { Chatbot as ChatbotItem}  from "react-chatbot-kit";
import { Popover } from "antd";
import 'react-chatbot-kit/build/main.css'

const Chatbot = () => {
    const [showBot, toggleBot] = useState(false);

    const saveMessages = (messages, HTMLString) => {
      localStorage.setItem("chat_message", JSON.stringify(messages))
    }

    const loadMessages = () => {
      const message = JSON.parse(localStorage.getItem('chat_message'));
      return message;
    }

    function handleUserMessage(message) {
      console.log(message)
    }
    
  return (
    <>
      {showBot && (
          <div className='fixed bottom-24 right-16 transition-all ease duration-500 delay-500'>
              <ChatbotItem 
                headerText="Trò chuyện cùng JobITFinder"
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
                placeholderText="Nhập nội dung bạn muốn hỏi"

                // saveMessages={saveMessages}
                // messageHistory={loadMessages()}
                // runInitialMessagesWithHistory
                handleUserMessage={handleUserMessage}
              />
          </div>
        )}
         <button 
            onClick={() => toggleBot((prev) => !prev)}
            className='fixed bottom-10 right-10  bg-indigo-500 text-white rounded-full w-12 h-12 hover:ring-4 hover:shadow-md'  
          >
            {!showBot
              ? (
                <>
                  <Popover placement="left" content={<p>Trò chuyện cùng <span className="font-bold text-indigo-500">JobITFinder</span></p>}>
                    <img 
                        src={avatarChatBot} 
                        alt="chat-bot"
                        className='absolute right-0 bottom-0 rounded-full w-full '  
                      />
                  </Popover>
                  <span className="animate-ping absolute -z-10 bottom-0 right-0 inline-flex h-full w-full rounded-full bg-indigo-300"></span>
                  <span className="animate-ping absolute -z-10 bottom-1 right-1 inline-flex w-4/5 h-4/5 rounded-full bg-blue-400 "></span>
                </>
                )
              : <p className='font-bold'>X</p>
            }
          </button>
      </>
  )
}

export default Chatbot
