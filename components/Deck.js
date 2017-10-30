import React, { Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PrimaryButton from "./styled/PrimaryButton";
import DeckView from "./styled/DeckView";
import SecondaryButton from "./styled/SecondaryButton";


class Deck extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;

        return {
            title: title
        }
    };

    toAddCard = () => {
        const { title } = this.props.navigation.state.params;

        this.props.navigation.navigate(
            'AddCard',
            {
                deckTitle: title
            }
        )
    };

    toQuiz = () => {
        const { title } = this.props.navigation.state.params;

        this.props.navigation.navigate(
            'Quiz',
            {
                deckTitle: title
            }
        )
    };

    render() {
        const {deck} = this.props;

        return (
            <View style={{marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20}}>
                {deck && (
                    <View>
                        <DeckView title={deck.title} questionCount={deck.questions.length}/>
                        <PrimaryButton title="Add card" onPress={() => this.toAddCard()}/>
                        {deck.questions.length > 0 && (
                            <SecondaryButton title="Start quiz" onPress={() => this.toQuiz()}/>
                        )}
                    </View>
                ) || (
                    <View>
                        <Text>No deck found</Text>
                    </View>
                )}
            </View>
        );
    }
}

function mapStateToProps(decks, {navigation}) {
    const { title } = navigation.state.params;
    const deck = (title in decks) ? decks[title] : null;

    return {
        deck
    };
}

export default connect(
    mapStateToProps
)(Deck);