import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {calculate} from './utils/calculator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousNumber, setPreviousNumber] = useState(null);
  const scrollviewRef = useRef();

  const handleContentSizeChange = () => {
    scrollviewRef.current.scrollToEnd({animated: true});
  };

  const handleNumberPress = value => {
    setDisplay(prevDisplay =>
      prevDisplay === '0' ? value : prevDisplay + value,
    );
  };

  const handleOperatorPress = op => {
    if (operator && previousNumber !== null) {
      const result = calculate(
        previousNumber,
        display.split(operator).pop(),
        operator,
      );
      setDisplay(result.toString() + op);
      setPreviousNumber(result.toString());
      setOperator(op);
    } else {
      setPreviousNumber(display);
      setDisplay(display + op);
      setOperator(op);
    }
  };

  const handleEqualPress = () => {
    if (previousNumber !== null && operator !== null) {
      const result = calculate(
        previousNumber,
        display.split(operator).pop(),
        operator,
      );
      setDisplay(result.toString());
      setPreviousNumber(null);
      setOperator(null);
    }
  };

  const handleBackSpacePress = () => {
    setDisplay(prevDisplay =>
      prevDisplay.length > 1 ? prevDisplay.slice(0, -1) : '0',
    );
  };

  const handleClear = () => {
    setDisplay('0');
    setOperator(null);
    setPreviousNumber(null);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView
          style={{
            width: wp('100%'),
            height: hp('45%'),
            paddingVertical: hp('3%'),
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#F8EEEC',
            color: '#060606',
          }}
          ref={scrollviewRef}
          onContentSizeChange={handleContentSizeChange}>
          <Text style={styles.display}>{display}</Text>
        </ScrollView>

        <View style={styles.container}>
          <Pressable
            onPress={() => handleClear('clear')}
            style={styles.clearbutton}>
            <Text style={styles.buttonText}>Clear</Text>
          </Pressable>
          <Pressable
            onPress={() => handleOperatorPress('%')}
            style={styles.button}>
            <Text style={styles.buttonText}>%</Text>
          </Pressable>
          <Pressable
            onPress={() => handleBackSpacePress('back')}
            style={styles.button}>
            <Text style={styles.buttonText}>back</Text>
          </Pressable>

          <Pressable
            onPress={() => handleOperatorPress('/')}
            style={styles.button}>
            <Text style={styles.buttonText}>/</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('7')}
            style={styles.button}>
            <Text style={styles.buttonText}>7</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('8')}
            style={styles.button}>
            <Text style={styles.buttonText}>8</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('9')}
            style={styles.button}>
            <Text style={styles.buttonText}>9</Text>
          </Pressable>
          <Pressable
            onPress={() => handleOperatorPress('×')}
            style={styles.button}>
            <Text style={styles.buttonText}>×</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('4')}
            style={styles.button}>
            <Text style={styles.buttonText}>4</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('5')}
            style={styles.button}>
            <Text style={styles.buttonText}>5</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('6')}
            style={styles.button}>
            <Text style={styles.buttonText}>6</Text>
          </Pressable>
          <Pressable
            onPress={() => handleOperatorPress('-')}
            style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('1')}
            style={styles.button}>
            <Text style={styles.buttonText}>1</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('2')}
            style={styles.button}>
            <Text style={styles.buttonText}>2</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('3')}
            style={styles.button}>
            <Text style={styles.buttonText}>3</Text>
          </Pressable>
          <Pressable
            onPress={() => handleOperatorPress('+')}
            style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('0')}
            style={styles.button}>
            <Text style={styles.buttonText}>0</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('00')}
            style={styles.button}>
            <Text style={styles.buttonText}>00</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('.')}
            style={styles.button}>
            <Text style={styles.buttonText}>.</Text>
          </Pressable>
          <Pressable
            onPress={() => handleEqualPress('=')}
            style={styles.equalButton}>
            <Text style={styles.buttonText}>=</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#57A0D2',
    padding: wp('1%'),
    borderRadius: wp('10%'),
    height: hp('7%'),
    width: wp('19%'),
  },
  equalButton: {
    backgroundColor: '#FFE5B4',
    padding: wp('2%'),
    margin: wp('1%'),
    borderRadius: wp('10%'),
    height: hp('7%'),
    width: wp('19%'),
  },
  clearbutton: {
    backgroundColor: '#E3242B',
    padding: wp('2%'),
    borderRadius: wp('10%'),
    height: hp('7%'),
    width: wp('20%'),
  },
  buttonText: {
    color: '#E7DECC',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#000000',
    margin: hp('0.5%'),
    fontWeight: '400',
    fontSize: hp('3%'), // Increase the font size here
  },
  display: {
    fontWeight: 'bold',
    fontSize: hp('7%'),
    marginBottom: '3%',
    textAlign: 'right',
    margin: wp('2%'),
  },
  container: {
    height: hp('55%'),
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp('2%'),
    rowGap: wp('3%'),
    columnGap: hp('3%'),
    justifyContent: 'space-between',
  },
});
