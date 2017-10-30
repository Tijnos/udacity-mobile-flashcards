import React, {Component} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {green, white} from "../../utils/colors";

class PrimaryButton extends Component {
    render() {
        const {title, onPress} = this.props;

        return (
            <Button onPress={onPress}>
                <Label>{title}</Label>
            </Button>
        );
    }
}

const Button = styled.TouchableOpacity`
    border-radius: 4px;
    padding: 10px; 20px;
    margin: 10px 0;
    background: ${green};
    
`;

const Label = styled.Text`
    text-align: center;
    color: ${white};
    font-weight: bold;
    font-size: 16px;
`;

export default PrimaryButton;