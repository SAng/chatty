import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const colors = ["red", "green", "blue", "orange"]

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
                    currentUser: {name: ""},
                    messages: [],
                    color: colors[Math.floor(Math.random()*colors.length)]
                  };
    this.onEnter = this.onEnter.bind(this);
    this.onEnterName = this.onEnterName.bind(this);
    this.onNameChange = this.onNameChange.bind(this);


  }

  onEnter(content) {
      this.socket.send(JSON.stringify({
      type: "postMessage",
      color: this.state.color,
      username: this.state.currentUser.name,
      content: content}));
  }

  onEnterName(oldName, newName) {
      this.socket.send(JSON.stringify({
      type: "postNotification",
      content: (oldName || 'Anon Penguin') + ' has changed name to ' + (newName || 'Anon Penguin')}));
  }

  onNameChange(content) {
    this.setState({currentUser: {name: content}});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    let ws = new WebSocket("ws://localhost:3001/");
    ws.onopen = function (event) {
      console.log("Connected to Server");
    };
    this.socket = ws;
    this.socket.onmessage = (event) => {
      const parsedEvent = JSON.parse(event.data)
      switch(parsedEvent.type) {
        case "incomingMessage":
          this.setState({messages: this.state.messages.concat(parsedEvent)})
          break;
        case "incomingNotification":
          this.setState({messages: this.state.messages.concat(parsedEvent)})
          break;
        case "updateConnections":
          this.setState({connections: parsedEvent.content})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + parsedEvent.type);
      }
    }
  }

  render() {
    this
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-users">{this.state.connections ? `Online Users: ${this.state.connections}` : 'Cannot Establish Connection to Server'} </div>
      </nav>
      <MessageList messages= {this.state.messages}/>
      <ChatBar onEnterName = {this.onEnterName} onNameChange={this.onNameChange} onEnter={this.onEnter} currentUser= {this.state.currentUser}/>
    </div>
    );
  }
}
export default App;






