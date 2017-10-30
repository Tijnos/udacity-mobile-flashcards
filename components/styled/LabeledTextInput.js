import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {lightGrey, red, white} from "../../utils/colors";

class LabeledTextInput extends Component {

    render() {
        const {label, value, error, onChangeText} = this.props;

        return (
            <View>
                <Label>{label}</Label>
                <Input
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={onChangeText}
                    value={value}
                />
                {error !== null && (
                    <Error>{error}</Error>
                )}
            </View>
        );
    }
}

const Label = styled.Text`
    font-weight: bold;
    font-size: 14px;
    line-height: 26px;
`;

const Input = styled.TextInput`
    font-size: 14px;
    line-height: 26px;
    height: 26px;
    border-radius: 4px;
    background: ${white};
    padding: 0 4px;
`;

const Error = styled.Text`
    font-size: 14px;
    line-height: 26px;
    color: ${red};
`;

export default LabeledTextInput;