import React, {Component} from 'react';

function isImageUrl(string) {
  return string.match(/https?:\/\/.+\.(jpg|png|gif)/);
}

//split messages up to text and images
function messageSplit(string) {
  let messageList = [];
  let currentMessage = '';
  string.split(" ").map((word) => {
    if (!isImageUrl(word)) {
      currentMessage = currentMessage + " " + word;
    } else {
      if (currentMessage) {
        messageList.push(currentMessage)
      }
      messageList.push(word);
      currentMessage = '';
    }
  });
  if (currentMessage) {
    messageList.push(currentMessage);
  }
  return messageList;
}

class Message extends Component {
  render() {
    if(this.props.username) {
      return (
        <div>
          {messageSplit(this.props.content).map((message, index) => {
              if (isImageUrl(message)) {
                return <div className="message" key={this.props.keypass+index.toString()}>
                         <span className="message-username" style={{color:this.props.color}}>
                           {index ? "" : this.props.username}
                         </span>
                         <span className="message-content">
                           <img src={message} alt="Image Not Found"/>
                         </span>
                       </div>
              } else {
                return <div className="message" key={this.props.keypass+index.toString()}>
                         <span className="message-username" style={{color:this.props.color}}>
                           {index ? "" : this.props.username}
                         </span>
                         <span className="message-content">
                           {message}
                         </span>
                       </div>
              }
            })
          }
        </div>
      );
    } else {
      return (
        <div className="message system">
         {this.props.content}
        </div>
)
    }

  }
}
export default Message;



