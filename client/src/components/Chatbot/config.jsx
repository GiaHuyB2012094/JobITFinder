import { createChatBotMessage } from "react-chatbot-kit";
import AvatarBot from "./Components/AvatarBot";
import avatarChatBot from '../../assets/Chatbots/chatbot-robo-advisor-chat-bot-robot-like-assistant-concept-of-digital-advisor-avatar-to-help-the-customer-icon-vector.jpg'
import { urlAvatarDefault } from "../../constants";
import Options from "./Components/MainOptions/Options";
import OptionsSearchCompanies from "./Components/MainOptions/Options/OptionsSearchCompanies";
import ListTopCompanies from "./Components/ListTopCompanies";

const botName = 'JobITFinder';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const config = {
    botName: botName,

    state: {
        companies: []
    },

    initialMessages: [
        createChatBotMessage(`Chào bạn, tôi là ${botName}! Tôi có thể giúp gì cho bạn không? Bạn có muốn ứng tuyển vào các công ty trên ${botName}`,{
        }),

        createChatBotMessage(`Dưới đây là tổng quan tất cả những gì tôi có thể giúp bạn`,{
            widget: 'options',
            withAvatar: true,
            delay: 1500,
        })
    ],

    widgets: [
        {
            widgetName: 'options',
            widgetFunc: (props) => (
                <Options 
                    title="Các lựa chọn"
                    {...props}
                />
            ),
            mapStateToProps: ["messages", "companies"],
            
        },
        {
            widgetName: 'optionsSearchCompanies',
            widgetFunc: (props) => (
                <OptionsSearchCompanies
                rchCompanies 
                    title="Các lựa chọn"
                    {...props}
                />
            )
        },
        {
            widgetName: 'listTopCompanies',
            widgetFunc: (props) => (
                <ListTopCompanies 
                    title="Danh sách top công ty"
                    {...props}
                />
            )
        },
        
    ],

    customStyles: {
        botMessageBox: {
            backgroundColor: "#6366F1",
        },
        chatButton: {
            backgroundColor: "#6366F1",
        }
    },

    customComponents: {
        botAvatar: (props) => <AvatarBot avatar={avatarChatBot} {...props}/>,
        userAvatar: (props) => <AvatarBot avatar={userInfo?.avatar || urlAvatarDefault} {...props}/>,
      },
}

export default config
