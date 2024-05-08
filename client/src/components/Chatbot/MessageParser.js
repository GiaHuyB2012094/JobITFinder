export default class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
        // trim whitespace
        const lowerCaseMessage = (function greeting() {
            let messageTemp = message.toLowerCase();
            let wsRegex = /\s+/g

            messageTemp = messageTemp.trim();
            return messageTemp.replace(wsRegex, " ");
        })();

        // hello----------------------------------------------------------------------------
        if (lowerCaseMessage.includes("chào bạn") || 
            // lowerCaseMessage.includes("hi") ||
            lowerCaseMessage.includes("chào") ||
            lowerCaseMessage.includes("xin chào") ||
            lowerCaseMessage.includes("hello")
        ) {
            return  this.actionProvider.greet()
        }
        
        // thanks---------------------------------------------------------------------------
        if (lowerCaseMessage.includes("cảm ơn") 
            || lowerCaseMessage.includes("thanks")
            || lowerCaseMessage.includes("thank you")
            // || lowerCaseMessage.includes("ok")
            // || lowerCaseMessage.includes("oke")
        ) {
            return  this.actionProvider.handleThanks()
        }
        
        // options--------------------------------------------------------------------------
        if (lowerCaseMessage.includes("options") ||
            lowerCaseMessage.includes("các lựa chọn") ||
            lowerCaseMessage.includes("cần giúp đỡ") ||
            lowerCaseMessage.includes("help") ||
            lowerCaseMessage.includes("cần hỗ trợ")
        ) {
           return this.actionProvider.handleOptions({ withAvatar: true })
        }

        // find companies--------------------------------------------------------------------------
        if (lowerCaseMessage.includes("tìm công ty") ||
            lowerCaseMessage.includes("company") ||
            lowerCaseMessage.includes("firm") ||
            lowerCaseMessage.includes("companies") ||
            lowerCaseMessage.includes("tìm kiếm công ty")
            ) {
            return this.actionProvider.handleCompanyFilter({ withAvatar: true })
        }

        // find show list top companies--------------------------------------------------------------------------
        if (lowerCaseMessage.includes("top công ty") ||
            lowerCaseMessage.includes("danh sách công ty") ||
            lowerCaseMessage.includes("các công ty")
            ) {
            return this.actionProvider.handleShowListTopCompanies({ withAvatar: true })
        }

        // bất kỳ---------------------------------------------------------------------------
        return (this.actionProvider.handleOptions({ withAvatar: true}));
    }
}