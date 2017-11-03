import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from "../actions/index";
import PrimaryButton from './styled/PrimaryButton';
import DeckView from "./styled/DeckView";
import {saveDefaultDecks} from "../utils/api";

class DeckList extends Component {
    componentDidMount() {
        const {getDecks} = this.props;

        getDecks();
    }

    renderItem = (item) => {
        const deck = item.item;

        return (
            <TouchableOpacity onPress={() => this.toDeck(deck)}>
                <DeckView title={deck.title} questionCount={deck.questions.length}/>
            </TouchableOpacity>
        );
    };

    toDeck = (deck) => {
        this.props.navigation.navigate(
          'Deck',
          { title: deck.title }
        );
    };

    toCreateDeck = () => {
        this.props.navigation.navigate(
          'CreateDeck',
        );
    };

    render() {
        const {decks} = this.props;

        if (Object.keys(decks).length === 0) {
            saveDefaultDecks().then(() => getDecks());
        }

        const listData = Object.keys(decks).map((key) => {
             return {
                 ...decks[key],
                 key
             }
        }).sort((a, b) => {
            let aTitle = a.title.toUpperCase(),
                bTitle = b.title.toUpperCase();

            if (aTitle < bTitle) {
                return -1
            }

            if (aTitle > bTitle) {
                return 1
            }

            return 0;

        });

        return (
            <View style={{flex:1, justifyContent: 'center', alignContent: 'center',
                marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20}}>
                <PrimaryButton title="Create new deck" onPress={this.toCreateDeck}/>
                {decks && (
                    <FlatList
                        renderItem={this.renderItem}
                        data={listData}
                    />
                )}
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
    {getDecks}
)(DeckList);