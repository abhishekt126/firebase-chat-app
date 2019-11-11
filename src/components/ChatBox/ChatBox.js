import React, { Component } from 'react';
import firebase from '../../config/firebase';
import 'firebase/database';
import './ChatBox.css';
import { connect } from 'react-redux';
import user from '../../assets/user.png';

export class ChatBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
             inputValue: '',
             randomUser: '',
             currentDate: ''
        }
    }

    componentDidMount = ()=>{
        this.setState({
            randomUser: Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 6),
            currentDate: new Date().toJSON().slice(0,10).replace(/-/g,'/')
        });

        const dbRef = firebase.database().ref('/message/');

        dbRef.on('value', snapshot => {
            this.props.updateMsgList(snapshot.val());
        })
    }

    onChangeHandler = (e)=>{
        this.setState({
            inputValue: e.target.value
        })
    }

    onClickHandler = ()=>{
        if(this.state.inputValue && /\S/.test(this.state.inputValue)){
            let obj = {
                user: this.state.randomUser,
                msg: this.state.inputValue,
                date: this.state.currentDate
            }
    
            firebase.database().ref('/message/').push(obj);
            this.setState({
                inputValue: ''
            })
        }
    }

    keyPressed = (e)=>{
        if(e.key === 'Enter'){
            this.onClickHandler();
        }
    }

    listOfAllMsg = (data)=>{
        const items = data.map(item => {
            return (
                item.user === this.state.randomUser?
                (<div class="outgoing-chats">   
                <div class="outgoing-chats-msg">
                        <p>{item.msg}</p>
                        <span class="time">{item.user} | {this.state.currentDate}</span>
                </div>
                <div class="outgoing-chats-img">
                    <img src={user} alt='not-found' />
                </div>
                </div>):
                (
                    <div class="recieved-chats">
                    <div class="recieved-chats-img">
                        <img src={user} alt='not-found' />
                    </div>
                    <div class="recieved-msg">
                        <div class="recieved-msg-inbox">
                            <p>{item.msg}</p>
                            <span class="time">{item.user} | {item.date}</span>
                        </div>
                    </div>
                </div>
                )
            )
        })
        return items;
    }
    

    render() {
        if(this.props.newMsgList){
            var allKeys = Object.keys(this.props.newMsgList);
            var dd = allKeys.map(item=>{
                return this.props.newMsgList[`${item}`];
            })
        }
        console.log("new msg list", dd);
        return (
            <>
                <div class="container">
                    <div class="chat-page">
                        <div class="msg-inbox">
                            <div class="chats">
                                <div class="msg-page">
                                {this.props.newMsgList?
                                <div>
                                    {this.listOfAllMsg(dd)}
                                </div>: null}

                                </div>
                            </div>
                        </div>

                        <div class="msg-bottem">
                            <div class="input-group">
                                <input onKeyPress={e=>this.keyPressed(e)} onChange={(e)=>this.onChangeHandler(e)} value={this.state.inputValue} type="text" class="form-control" placeholder="write message..." />
                                <div class="input-group-append">
                                    <span onClick={this.onClickHandler} class="input-group-text"><i class="fa fa-paper-plane"></i></span>
                                </div> 
                            </div>
                            <div style={{clear: 'both'}}></div>
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state)=>{
    return ({
        newMsgList: state.msgList
    })
}

const mapDispatchToProps = (dispatch)=>{
    return ({
        updateMsgList: (data)=>dispatch({type:'UPDATE', payload: data})
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
