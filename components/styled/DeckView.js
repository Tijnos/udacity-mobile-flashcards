import React, {Component} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {lightGrey} from "../../utils/colors";

class DeckView extends Component {
    render() {
        const {title, questionCount} = this.props;

        return (
            <ListItem>
                <ListItemTitle>{title}</ListItemTitle>
                <ListItemSubtitle>{questionCount} {questionCount === 1 ? 'card' : 'cards'}</ListItemSubtitle>
            </ListItem>
        );
    }
}

const ListItem = styled.View`
    border: 1px solid ${lightGrey};
    border-radius: 4px;
    margin: 10px 0;
    padding: 30px; 10px;
    background: white;
`;

const ListItemTitle = styled.Text`
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 13px;
`;

const ListItemSubtitle = styled.Text`
    text-align: center;
    font-size: 14px;
`;

export default DeckView;