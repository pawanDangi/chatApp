import React from 'react';
import zenscroll from 'zenscroll';
import NavigationIcon from '@material-ui/icons/Navigation';
import {
  TextField,
  Button
} from '@material-ui/core/';

class MessageBox extends React.Component {
  constructor () {
    super();
    this.state = {
      messageText: ''
    };
  }

  componentDidMount () {
    this.scrollToView()
  }

  componentDidUpdate () {
    this.scrollToView();
  }

  scrollToView = () => {
    const { user } = this.props
    if (user && user.messages.length) {
      let msgDiv = document.getElementById('chatting-message');
      let msgScroller = zenscroll.createScroller(msgDiv)
      let lastDiv = document.getElementById(`message-${user.messages.length}`);
      msgScroller.intoView(lastDiv)
    }
  }

  sendMessage =(id, text) => {
    this.props.sendMessage(id, text);
    this.setState({messageText: ''})
  }

  textChange = (e) => {
    this.setState({messageText: e.target.value})
  }

  render() {
    const { user, crossChat } = this.props;
    const { messageText } = this.state
    return (
      <div>
        <div className="message-window">
          <span>{`${user.firstName} ${user.lastName}`}</span>
          <span className="message-cross"><button onClick={() => crossChat()}>&#10006;</button></span>
        </div>
        <div className="chatting-message" id="chatting-message">
          {
            user.messages && user.messages.length ?
              user.messages.map((m, index) => {
                return m.type === 'sender' ?
                <div className="sender-message" key={index} id={`message-${index + 1}`}>
                  <p>{m.text}</p>
                </div> :
                <div className="receiver-message" key={index} id={`message-${index + 1}`}>
                  <p>{m.text}</p>
                </div>
              })
            : ''
          }
        </div>
        <div className="send-block">
          <div>
            <TextField
              value={messageText}
              className="message-input"
              id="bootstrap-input"
              InputProps={{
                disableUnderline: true
              }}
              InputLabelProps={{
                shrink: true
              }}
              placeholder="Type message...."
              onChange={(e) => this.textChange(e)}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  this.sendMessage(user.id, messageText)
                }
              }}
            />
          </div>
          <div className="messg-send-btn">
            <Button
              variant="extendedFab"
              aria-label="Delete"
              className="send-btn"
              onClick={() => this.sendMessage(user.id, messageText)}
            >
              <NavigationIcon className="rotation" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBox;
