import React, { Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import PrimaryButton from "./styled/PrimaryButton";
import {addCard} from "../actions/index";
import {addCardToDeck} from "../utils/api";
import LabeledTextInput from "./styled/LabeledTextInput";

class AddCard extends Component {

    static navigationOptions = {
        title: 'Add card',
    };

    constructor(props) {
        super(props);

        this.state = {
            question: {
                value: '',
                error: null
            },
            answer: {
                value: '',
                error: null
            },
        };
    }

    onChangeInput(key, value) {
        this.setState({
            [key]: {
                ...this.state[key],
                value
            }
        })
    }

    setInputError(key, error) {
        this.setState({
            [key]: {
                ...this.state[key],
                error
            }
        })
    }

    submitForm() {
        const {addCard, navigation} = this.props;
        const { deckTitle } = navigation.state.params;

        if (this.validateForm()) {
            addCardToDeck(deckTitle, this.state.question.value, this.state.answer.value).then(() => {
                addCard(deckTitle, this.state.question.value, this.state.answer.value);

                this.props.navigation.goBack();
            });
        }
    }

    validateForm() {
        let valid = true;

        if (this.state.question.value.length === 0) {
            this.setInputError('question', 'Question is required');
            valid = false;
        } else {
            this.setInputError('question', null);
        }

        if (this.state.answer.value.length === 0) {
            this.setInputError('answer', 'Answer is required');
            valid = false;
        } else {
            this.setInputError('answer', null);
        }

        return valid;
    }

    render() {
        return (
            <View style={{marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20}}>
                <LabeledTextInput
                    label="Question"
                    value={this.state.question.value}
                    error={this.state.question.error}
                    onChangeText={(text) => this.onChangeInput('question', text)}
                />

                <LabeledTextInput
                    label="Answer"
                    value={this.state.answer.value}
                    error={this.state.answer.error}
                    onChangeText={(text) => this.onChangeInput('answer', text)}
                />

                <PrimaryButton title="Add card to deck" onPress={() => this.submitForm()} />
            </View>
        );
    }
}

function mapStateToProps(decks) {
    return {
        decks
    };
}

function mapDispatchToProps(dispatch) {
    return  {
        addCard: (deckTitle, question, answer) => dispatch(addCard(deckTitle, question, answer))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCard);
