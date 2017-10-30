import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import CorrectButton from "./styled/CorrectButton";
import InCorrectButton from "./styled/InCorrectButton";
import styled from 'styled-components/native';
import {red, white} from "../utils/colors";
import PrimaryButton from "./styled/PrimaryButton";
import SecondaryButton from "./styled/SecondaryButton";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";

class Quiz extends Component {

    initialState = {
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        flipping: false,
        finished: false,
        flipAnimatedValue: new Animated.Value(0),
        showAnswer: false
    };

    static navigationOptions = {
        title: 'Quiz',
    };

    constructor(props) {
        super(props);

        this.state = this.initialState;
    }

    flipCard() {
        if (this.state.flipping) {
            return;
        }

        this.setState({
            flipping: true
        });

        Animated.timing(
            this.state.flipAnimatedValue,
            {
                toValue: .5,
                duration: 300
            }
        ).start(() => {
            this.setState({
                showAnswer: !this.state.showAnswer
            });

            Animated.timing(
                this.state.flipAnimatedValue,
                {
                    toValue: 1,
                    duration: 300
                }
            ).start(() => {
                this.setState({
                    flipping: false
                })
            });
        });
    }

    setRandomQuestions() {
        const {deck} = this.props,
            maxQuestions = 5,
            numberOfQuestions = deck.questions.length < maxQuestions ? deck.questions.length : maxQuestions;

        let i,
            randomIndex,
            usedIndices = [],
            randomQuestions = [];

        for (i = 0; i < numberOfQuestions; i++) {
            do {
                randomIndex = Math.floor(Math.random()*(numberOfQuestions));
            } while(usedIndices.indexOf(randomIndex) !== -1);

            usedIndices.push(randomIndex);
            randomQuestions.push(deck.questions[randomIndex]);
        }

        this.setState({
            questions: randomQuestions
        })
    }

    componentDidMount() {
        const {questions} = this.state,
            {deck} = this.props;

        if (deck === null) {
            return;
        }

        if (questions.length === 0) {
            this.setRandomQuestions();
        }
    }

    setCorrect = () => {
        const {questions, currentQuestionIndex, score, showAnswer} = this.state,
            nextQuestionIndex = currentQuestionIndex+1,
            finished = !(nextQuestionIndex in questions);

        if (showAnswer) {
            this.flipCard();
        }

        this.setState({
            currentQuestionIndex: nextQuestionIndex,
            score: score+1,
            finished
        });

        if (finished) {
            clearLocalNotification().then(setLocalNotification);
        }
    };

    setInCorrect = () => {
        const {questions, currentQuestionIndex, score, finished} = this.state,
            nextQuestionIndex = currentQuestionIndex+1;

        this.setState({
            currentQuestionIndex: nextQuestionIndex,
            finished: !(nextQuestionIndex in questions)
        });
    };

    restart = () => {
        this.setState(this.initialState);
        this.setRandomQuestions();
    };

    render() {
        const {deck, navigation} = this.props,
            {questions, currentQuestionIndex, score, finished, flipAnimatedValue, showAnswer} = this.state;

        if (deck === null) {
            return (<Text>...</Text>);
        }

        const flipAnimated = flipAnimatedValue.interpolate({
            inputRange: [0, .5, 1],
            outputRange: ['0deg', '90deg', '0deg']
        });

        return (
            <View style={{flex: 1,
                marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20}}>
                {finished ? (
                    <View style={{flex:1}}>
                        <Title>Finished! Your score is {Math.round((score/questions.length)*100)}%</Title>
                        <PrimaryButton title="Restart" onPress={() => this.restart()}/>
                        <SecondaryButton title="Back to deck" onPress={() => navigation.goBack() }/>
                    </View>
                ) : (
                    <View style={{flex: 1}}>
                        {questions.length === 0 ? (
                            <Text>Loading questions</Text>
                        ) : (
                            <View style={{flex:1}}>
                                <Animated.View style={{flex:1, backgroundColor: white, transform: [{ rotateY: flipAnimated }]}}>
                                    <Text style={{marginTop: 10, marginLeft: 10}}>{currentQuestionIndex+1}/{questions.length}</Text>

                                    <View style={{flex:1, marginTop: 60, marginBottom: 60, marginLeft: 30, marginRight: 30}}>
                                        {showAnswer ? (
                                            <View style={{flex:1}}>
                                                <Title>{questions[currentQuestionIndex].answer}</Title>
                                                <TouchableOpacity onPress={()=> this.flipCard()}>
                                                    <SubTitle>Show question</SubTitle>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <View style={{flex:1}}>
                                                <Title>{questions[currentQuestionIndex].question}</Title>
                                                <TouchableOpacity onPress={()=> this.flipCard()}>
                                                    <SubTitle>Show answer</SubTitle>
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        <View>
                                            <CorrectButton title="Correct" onPress={() => this.setCorrect()}/>
                                            <InCorrectButton title="Incorrect" onPress={() => this.setInCorrect()}/>
                                        </View>
                                    </View>
                                </Animated.View>
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    }
}

const Title = styled.Text`
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
`;

const SubTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${red};
`;

function mapStateToProps(decks, {navigation}) {
    const { deckTitle } = navigation.state.params
        deck = (deckTitle in decks) ? decks[deckTitle] : null;

    return {
        deck
    };
}

export default connect(
    mapStateToProps
)(Quiz);