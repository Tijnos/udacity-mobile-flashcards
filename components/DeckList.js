import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from "../actions/index";

class DeckList extends Component {
    componentDidMount() {
        const {getDecks} = this.props;

        getDecks();
    }

    renderItem(item) {
        const deck = item.item;

        return (
            <View key={deck.title}>
                <Text>{deck.title}</Text>
                <Text>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
            </View>
        );
    }

    render() {
        const {decks} = this.props;

        return (
            <View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
                <FlatList
                    renderItem={this.renderItem}
                    data={Object.keys(decks).map((key) => decks[key])}
                />
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
        getDecks: () => dispatch(getDecks())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckList);
