import React, {Component} from 'react';

class ChatBar extends Component {


  state = {
    content: '',
    name:'',
    newname:''
  }

  handleKeyPressMessage = (event) => {
    if(event.key == 'Enter'){
      (this.state.name === this.state.newname) || this.props.onEnterName(this.state.name, this.state.newname);
      this.setState({name: this.state.newname});
      this.props.onEnter(this.state.content);
      this.setState({content: ''});
    }
  }

  handleChangeName = (event) => {
    this.props.onNameChange(event.target.value);
    this.setState({newname: event.target.value})
  }

  handleMessage = (event) => {
    this.setState({content: event.target.value});
  }

  handleKeyPressName = (event) => {
    if(event.key == 'Enter'){
      (this.state.name === this.state.newname) || this.props.onEnterName(this.state.name, this.state.newname);
      this.setState({name: this.state.newname});
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input onChange={this.handleChangeName}
        onKeyPress={this.handleKeyPressName}
        className="chatbar-username" defaultValue={this.props.currentUser ?  this.props.currentUser.name : undefined} placeholder="Your Name (Optional)" />
        <input onChange={this.handleMessage} onKeyPress={this.handleKeyPressMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} />
      </footer>
    );
  }
}
export default ChatBar;


