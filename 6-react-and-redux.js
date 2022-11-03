1 - GETTING STARTED WITH REACT REDUX

class DisplayMessages extends React.Component {
    // Change code below this line
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            messages: []
        }
    }
    // Change code above this line
    render() {
        return <div />
    }
};


2 - MANAGE STATE LOCALLY FIRST

class DisplayMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        }
    }
    // Add handleChange() and submitMessage() methods here

    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                { /* Render an input, button, and ul below this line */}

                { /* Change code above this line */}
            </div>
        );
    }
};

// Solution:

class DisplayMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        }
    }
    // Add handleChange() and submitMessage() methods here
    handleChange(event) {
        this.setState({
            input: event.target.value,
            messages: this.state.messages
        })
    }

    submitMessage() {
        this.setState({
            input: '',
            messages: [...this.state.messages, this.state.input]
        })
    }

    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                { /* Render an input, button, and ul below this line */}
                <input onChange={this.handleChange.bind(this)} value={this.state.input} />
                <button onClick={this.submitMessage.bind(this)}>Submit</button>
                <ul>
                    {this.state.messages.map((x, i) => {
                        return <li key={i}>{x}</li>
                    })}
                </ul>
                { /* Change code above this line */}
            </div>
        );
    }
};


3 - EXTRACT STATE LOGIC TO REDUX

// Define ADD, addMessage(), messageReducer(), and store here:
const ADD = "ADD";
const addMessage = message => {
    return {
        type: ADD,
        message
    };
};

// Use ES6 default paramter to give the 'previousState' parameter an initial value.
const messageReducer = (previousState = [], action) => {
    // Use switch statement to lay out the reducer logic in response to different action type
    switch (action.type) {
        case ADD:
            // Use ES6 spread operator to return a new array where the new message is added to previousState
            return [...previousState, action.message];
            break;

        default:
            // A default case to fall back on in case if the update to Redux store is not for this specific state.
            return previousState;
    }
};

const store = Redux.createStore(messageReducer);


4 - USE PROVIDER TO CONNECT REDUX TO REACT

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
    return {
        type: ADD,
        message
    }
};

const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};

const store = Redux.createStore(messageReducer);

// React:

class DisplayMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessage() {
        this.setState((state) => {
            const currentMessage = state.input;
            return {
                input: '',
                messages: state.messages.concat(currentMessage)
            };
        });
    }
    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                <input
                    value={this.state.input}
                    onChange={this.handleChange} /><br />
                <button onClick={this.submitMessage}>Submit</button>
                <ul>
                    {this.state.messages.map((message, idx) => {
                        return (
                            <li key={idx}>{message}</li>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
    // Render the Provider below this line
    render() {
        return (
            <Provider store={store}>
                <DisplayMessages />
            </Provider>
        );
    }
    // Change code above this line
};


5 - MAP STATE TO PROPS

const state = [];

// Change code below this line
const mapStateToProps = (state) => {
    return {
        messages: state
    }
}


6 - MAP DISPATCH TO PROPS

const addMessage = (message) => {
    return {
        type: 'ADD',
        message: message
    }
};

// Change code below this line
const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (message) => {
            dispatch(addMessage(message))
        }
    }
}


7 - CONNECT REDUX TO REACT

const addMessage = (message) => {
    return {
        type: 'ADD',
        message: message
    }
};

const mapStateToProps = (state) => {
    return {
        messages: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (message) => {
            dispatch(addMessage(message));
        }
    }
};

class Presentational extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h3>This is a Presentational Component</h3>
    }
};

const connect = ReactRedux.connect;
// Change code below this line
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational)


8 - CONNECT REDUX TO THE MESSAGES APP

const defaultState = {
    authenticated: false
};

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
    return {
        type: ADD,
        message: message
    }
};

const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};

const store = Redux.createStore(messageReducer);

// React:
class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessage() {
        this.setState((state) => {
            const currentMessage = state.input;
            return {
                input: '',
                messages: state.messages.concat(currentMessage)
            };
        });
    }
    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                <input
                    value={this.state.input}
                    onChange={this.handleChange} /><br />
                <button onClick={this.submitMessage}>Submit</button>
                <ul>
                    {this.state.messages.map((message, idx) => {
                        return (
                            <li key={idx}>{message}</li>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }
};

// React-Redux:
const mapStateToProps = (state) => {
    return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (newMessage) => {
            dispatch(addMessage(newMessage))
        }
    }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Define the Container component here:


class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // Complete the return statement:
        return (null);
    }
};

// Solution:

const defaultState = {
    authenticated: false
};

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
    return {
        type: ADD,
        message: message
    }
};

const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};

const store = Redux.createStore(messageReducer);

// React:
class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessage() {
        this.setState((state) => {
            const currentMessage = state.input;
            return {
                input: '',
                messages: state.messages.concat(currentMessage)
            };
        });
    }
    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                <input
                    value={this.state.input}
                    onChange={this.handleChange} /><br />
                <button onClick={this.submitMessage}>Submit</button>
                <ul>
                    {this.state.messages.map((message, idx) => {
                        return (
                            <li key={idx}>{message}</li>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }
};

// React-Redux:
const mapStateToProps = (state) => {
    return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (newMessage) => {
            dispatch(addMessage(newMessage))
        }
    }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Define the Container component here:
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational)

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // Complete the return statement:
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
};


9 -

  // Redux:
const ADD = 'ADD';

const addMessage = (message) => {
    return {
        type: ADD,
        message: message
    }
};

const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};

const store = Redux.createStore(messageReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Change code below this line
class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessage() {
        this.setState((state) => ({
            input: '',
            messages: state.messages.concat(state.input)
        }));
    }
    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                <input
                    value={this.state.input}
                    onChange={this.handleChange} /><br />
                <button onClick={this.submitMessage}>Submit</button>
                <ul>
                    {this.state.messages.map((message, idx) => {
                        return (
                            <li key={idx}>{message}</li>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }
};
// Change code above this line

const mapStateToProps = (state) => {
    return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (message) => {
            dispatch(addMessage(message))
        }
    }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
};

// Solution:

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
    return {
        type: ADD,
        message: message
    }
};

const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};

const store = Redux.createStore(messageReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Change code below this line
class Presentational extends React.Component {
    constructor(props) {
        super(props);

        // Remove property 'messages' from Presentational's local state
        this.state = {
            input: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessage() {

        // Call 'submitNewMessage', which has been mapped to Presentational's props, with a new message;
        // meanwhile, remove the 'messages' property from the object returned by this.setState().
        this.props.submitNewMessage(this.state.input);
        this.setState({
            input: ''
        });
    }
    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                <input
                    value={this.state.input}
                    onChange={this.handleChange} /><br />
                <button onClick={this.submitMessage}>Submit</button>
                <ul>
                    {/* The messages state is mapped to Presentational's props; therefore, when rendering,
                 you should access the messages state through props, instead of Presentational's
                 local state. */}
                    {this.props.messages.map((message, idx) => {
                        return (
                            <li key={idx}>{message}</li>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }
};
// Change code above this line

const mapStateToProps = (state) => {
    return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (message) => {
            dispatch(addMessage(message))
        }
    }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
};


10 - MOVING FORWARD FROM HERE

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
* /

// Only change code below this line
console.log('Now I know React and Redux!')
