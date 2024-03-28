export default class ActionProvider {
    constructor( createChatBotMessage, setStateFunc, createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
    ) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
      this.stateRef = stateRef;
      this.createCustomMessage = createCustomMessage;
    }

    // update chatbot ---------------------------------------------------------------------------------
    updateChatbotState(message) {
      this.setState(prevState => ({
          ...prevState,
          messages: [...prevState.messages, message],
      }))
    }

    greet() {
        const greetingMessage = this.createChatBotMessage("Chào bạn, rất vui khi được trò chuyện cùng bạn");
        this.updateChatbotState(greetingMessage)
    }
    // choose option
    handleOptions = () => {
      const message = this.createChatBotMessage(
        "Dưới đây là tổng quan tất cả những gì tôi có thể giúp bạn",{
          widget: "options",
          loading: true,
          terminateLoading: true,
        }
      )
      this.updateChatbotState(message);
    }

    // find company
    handleCompanyFilter = () => {
      const message = this.createChatBotMessage(
        "Bạn chọn xem danh sách top công ty hoặc nhập tên công ty",{
          widget: "optionsSearchCompanies",
          loading: true,
          terminateLoading: true,
          delay: 1000,
        }
      )
      this.updateChatbotState(message);
    }

    // show list top companies
    handleShowListTopCompanies = () => {
      const message = this.createChatBotMessage("Dưới đây là danh sách top công ty",
        {
          widget: "listTopCompanies",
          loading: true,
          terminateLoading: true,
          delay: 1000,
        }
      )
      this.updateChatbotState(message);
    }

    // thanks------------------------------------------------------------------------------------------
    handleThanks = () => {
      const message = this.createChatBotMessage("Cảm ơn bạn, cần thêm thông tin hay trao đổi thì nhắn vào đây")
      this.updateChatbotState(message);
    }

    
 }
 
