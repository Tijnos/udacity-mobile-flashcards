import React, { Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import PrimaryButton from "./styled/PrimaryButton";
import {addDeck} from "../actions/index";
import {saveDeckTitle} from "../utils/api";
import LabeledTextInput from "./styled/LabeledTextInput";

class CreateDeck extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: {
                value: '',
                error: null
            }
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
        const {addDeck} = this.props;

        if (this.validateForm()) {
            saveDeckTitle(this.state.title.value).then(() => {
                addDeck(this.state.title.value);

                this.toDeck(this.state.title.value)
            });
        }
    }

    validateForm() {
        const {decks} = this.props;
        let error = null;

        if (this.state.title.value.length === 0) {
            error = 'Title is required';
        } else if (this.state.title.value in decks) {
            error = 'Title already exists';
        }

        this.setInputError('title', error);

        return error === null;
    }

    toDeck = (deckTitle) => {
        this.props.navigation.navigate(
            'Deck',
            { title: deckTitle }
        );
    };

    render() {
        return (
            <View style={{flex:1, marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20}}>
                <LabeledTextInput
                    label="Title"
                    value={this.state.title.value}
                    error={this.state.title.error}
                    onChangeText={(text) => this.onChangeInput('title', text)}
                />
                <PrimaryButton title="Create deck" onPress={() => this.submitForm()} />
            </View>
        );
    }
}

function mapStateToProps(decks) {

    return {
        decks: decks ? decks : {}
    };
}

export default connect(
    mapStateToProps,
    {addDeck}
)(CreateDeck);
