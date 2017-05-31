import React, {Component} from 'react';

class ChatBar extends Component {


  state = {
    content: ''
  }



  handleKeyPressMessage = (event) => {
    if(event.key == 'Enter'){
      this.props.onEnter(this.state.content);
      this.setState({content: ''});
    }
  }

  handleKeyPressName = (event) => {
    this.props.onNameChange(event.target.value);
  }

  handleMessage = (event) => {
    this.setState({content: event.target.value});
  }

  render() {
    return (
      <footer className="chatbar">
        <input onChange={this.handleKeyPressName} className="chatbar-username" defaultValue={this.props.currentUser ?  this.props.currentUser.name : undefined} placeholder="Your Name (Optional)" />
        <input onChange={this.handleMessage} onKeyPress={this.handleKeyPressMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} />
      </footer>
    );
  }
}
export default ChatBar;


