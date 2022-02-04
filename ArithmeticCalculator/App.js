import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      showValue: '',
      size: 40,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  changeFontSize = () => {
    if (this.state.showValue.length >= 25) {
      this.setState({size: 26});
    } else if (this.state.showValue.length >= 22) {
      this.setState({size: 28});
    } else if (this.state.showValue.length >= 18) {
      this.setState({size: 30});
    } else if (this.state.showValue.length >= 15) {
      this.setState({size: 32});
    } else if (this.state.showValue.length >= 12) {
      this.setState({size: 34});
    } else if (this.state.showValue.length >= 9) {
      this.setState({size: 36});
    } else if (this.state.showValue.length >= 7) {
      this.setState({size: 38});
    }
  };

  getValue = (num) => {
    if (this.state.inputValue.length > 15 || this.state.showValue.length > 25) {
      return Alert.alert('Input length exceeded!');
    }
    this.setState({
      inputValue: this.state.inputValue + num,
      showValue: this.state.showValue + num,
    });

    this.changeFontSize();
  };

  clearValue = () => {
    this.setState({inputValue: '', showValue: ''});
    this.changeFontSize();
  };

  deleteValue = () => {
    if (this.state.inputValue === '') {
      this.setState({
        showValue: this.state.showValue.slice(0, -1),
      });
    } else {
      this.setState({
        inputValue: this.state.inputValue.slice(0, -1),
        showValue: this.state.showValue.slice(0, -1),
      });
    }

    this.changeFontSize();
  };

  squareRoot = () => {
    if (this.state.inputValue === '') {
      if (this.state.showValue !== '') {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (format.test(this.state.showValue)) {
          return;
        } else {
          let res = Math.sqrt(parseFloat(this.state.showValue)).toFixed(4);
          this.setState({showValue: res, inputValue: ''});
          return;
        }
      }
      return;
    }
    let res = Math.sqrt(parseFloat(this.state.inputValue)).toFixed(4);
    this.setState({showValue: res, inputValue: ''});
  };

  showResult = () => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let flag = false;
    var exp = this.state.showValue;
    if (format.test(exp[exp.length - 1])) {
      while (format.test(exp)) {
        exp = exp.slice(0, -1);
        flag = true;
      }
    }

    if (flag) {
      try {
        var result = eval(exp).toString();
      } catch (error) {
        return Alert.alert('Decimal value cannot start with zero!');
      }

      this.setState({
        showValue: result,
        inputValue: '',
      });
      return;
    }
    try {
      var result = eval(exp).toString();
    } catch (error) {
      return Alert.alert('Decimal value cannot start with zero!');
    }
    this.setState({
      showValue: result,
      inputValue: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#3a4655" />

        <View style={styles.inputContainer}>
          <Text style={[styles.input, {fontSize: this.state.size}]}>
            {this.state.showValue === '' ? '0' : this.state.showValue}{' '}
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={this.clearValue}>
            <Text style={[styles.btnText, styles.btnTextRed]}>
              {this.state.showValue === '' ? 'AC' : 'C'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.deleteValue}>
            <Image
              source={require('./images/cross.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('%')}>
            <Text
              style={[styles.btnText, styles.btnTextRed, {fontWeight: 'bold'}]}>
              %
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('/')}>
            <Image
              source={require('./images/divide.png')}
              style={{width: 26, height: 26}}
            />
          </TouchableOpacity>

          {/*TODO: Numeric Button */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('7')}>
            <Text style={styles.btnText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('8')}>
            <Text style={styles.btnText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('9')}>
            <Text style={styles.btnText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('*')}>
            <Image
              source={require('./images/multiply.png')}
              style={{width: 22, height: 22}}
            />
          </TouchableOpacity>

          {/*TODO: Numeric Button Row 2 */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('4')}>
            <Text style={styles.btnText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('5')}>
            <Text style={styles.btnText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('6')}>
            <Text style={styles.btnText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('-')}>
            <Text style={[styles.btnText, styles.btnTextRed, {fontSize: 50}]}>
              -
            </Text>
          </TouchableOpacity>

          {/*TODO: Numeric Button Row 3 */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('1')}>
            <Text style={styles.btnText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('2')}>
            <Text style={styles.btnText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('3')}>
            <Text style={styles.btnText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('+')}>
            <Text style={[styles.btnText, styles.btnTextRed, {fontSize: 50}]}>
              +
            </Text>
          </TouchableOpacity>

          {/*TODO: Numeric Button Row 2 */}
          <TouchableOpacity style={styles.btn} onPress={this.squareRoot}>
            <Image
              source={require('./images/root.png')}
              style={{width: 34, height: 34}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('0')}>
            <Text style={styles.btnText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.getValue('.')}>
            <Text style={styles.btnText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.showResult}>
            <View style={styles.equalBtn}>
              <Text
                style={[
                  styles.btnText,
                  styles.btnTextRed,
                  {fontSize: 40, color: '#fff'},
                ]}>
                =
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    backgroundColor: '#3a4655',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#3a4655',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 46,
    color: '#fff',
    marginBottom: 10,
  },
  btnContainer: {
    flex: 1,
    backgroundColor: '#374352',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn: {
    width: '25%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 30,
  },
  btnTextRed: {
    color: '#ee5a5a',
    fontSize: 25,
  },
  equalBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EE5A5A',
    width: 55,
    height: 55,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
