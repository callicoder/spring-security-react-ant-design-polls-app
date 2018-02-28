import React, { Component } from 'react';
import './Poll.css';
import { Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';

import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class Poll extends Component {
    calculatePercentage = (choice) => {
        if(this.props.poll.totalVotes === 0) {
            return 0;
        }
        return (choice.voteCount*100)/(this.props.poll.totalVotes);
    };

    isSelected = (choice) => {
        return this.props.poll.selectedChoice === choice.id;
    }

    getWinningChoice = () => {
        return this.props.poll.choices.reduce((prevChoice, currentChoice) => 
            currentChoice.voteCount > prevChoice.voteCount ? currentChoice : prevChoice, 
            {voteCount: -Infinity}
        );
    }

    getTimeRemaining = (poll) => {
        const expirationTime = new Date(poll.expirationDateTime).getTime();
        const currentTime = new Date().getTime();
    
        var difference_ms = expirationTime - currentTime;
        var seconds = Math.floor( (difference_ms/1000) % 60 );
        var minutes = Math.floor( (difference_ms/1000/60) % 60 );
        var hours = Math.floor( (difference_ms/(1000*60*60)) % 24 );
        var days = Math.floor( difference_ms/(1000*60*60*24) );
    
        let timeRemaining;
    
        if(days > 0) {
            timeRemaining = days + " days left";
        } else if (hours > 0) {
            timeRemaining = hours + " hours left";
        } else if (minutes > 0) {
            timeRemaining = minutes + " minutes left";
        } else if(seconds > 0) {
            timeRemaining = seconds + " seconds left";
        } else {
            timeRemaining = "less than a second left";
        }
        
        return timeRemaining;
    }

    render() {
        const pollChoices = [];
        if(this.props.poll.selectedChoice || this.props.poll.expired) {
            const winningChoice = this.props.poll.expired ? this.getWinningChoice() : null;

            this.props.poll.choices.forEach(choice => {
                pollChoices.push(<CompletedOrVotedPollChoice 
                    key={choice.id} 
                    choice={choice}
                    isWinner={winningChoice && choice.id === winningChoice.id}
                    isSelected={this.isSelected(choice)}
                    percentVote={this.calculatePercentage(choice)} 
                />);
            });                
        } else {
            this.props.poll.choices.forEach(choice => {
                pollChoices.push(<Radio className="poll-choice-radio" key={choice.id} value={choice.id}>{choice.text}</Radio>)
            })    
        }        
        return (
            <div className="poll-content">
                <div className="poll-header">
                    <div className="poll-creator-info">
                        <Link className="creator-link" to={`/users/${this.props.poll.createdBy.username}`}>
                            <Avatar className="poll-creator-avatar" 
                                style={{ backgroundColor: getAvatarColor(this.props.poll.createdBy.name)}} >
                                {this.props.poll.createdBy.name[0]}
                            </Avatar>
                            <span className="poll-creator-name">
                                {this.props.poll.createdBy.name}
                            </span>
                            <span className="poll-creator-username">
                                @{this.props.poll.createdBy.username}
                            </span>
                            <span className="poll-creation-date">
                                {formatDateTime(this.props.poll.creationDateTime)}
                            </span>
                        </Link>
                    </div>
                    <div className="poll-question">
                        {this.props.poll.question}
                    </div>
                </div>
                <div className="poll-choices">
                    <RadioGroup 
                        className="poll-choice-radio-group" 
                        onChange={this.props.handleVoteChange} 
                        value={this.props.currentVote}>
                        { pollChoices }
                    </RadioGroup>
                </div>
                <div className="poll-footer">
                    { 
                        !(this.props.poll.selectedChoice || this.props.poll.expired) ?
                        (<Button className="vote-button" disabled={!this.props.currentVote} onClick={this.props.handleVoteSubmit}>Vote</Button>) : null 
                    }
                    <span className="total-votes">{this.props.poll.totalVotes} votes</span>
                    <span className="separator">•</span>
                    <span className="time-left">
                        {
                            this.props.poll.expired ? "Final results" :
                            this.getTimeRemaining(this.props.poll)
                        }
                    </span>
                </div>
            </div>
        );
    }
}

function CompletedOrVotedPollChoice(props) {
    return (
        <div className="cv-poll-choice">
            <span className="cv-poll-choice-details">
                <span className="cv-choice-percentage">
                    {Math.round(props.percentVote * 100) / 100}%
                </span>            
                <span className="cv-choice-text">
                    {props.choice.text}
                </span>
                {
                    props.isSelected ? (
                    <Icon
                        className="selected-choice-icon"
                        type="check-circle-o"
                    /> ): null
                }    
            </span>
            <span className={props.isWinner ? 'cv-choice-percent-chart winner': 'cv-choice-percent-chart'} 
                style={{width: props.percentVote + '%' }}>
            </span>
        </div>
    );
}


export default Poll;