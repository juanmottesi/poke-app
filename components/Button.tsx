import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  text: string;
} & TouchableOpacity['props'];

const Button = ({ text, onPress, style, ...props }: ButtonProps) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
    <Text>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    alignSelf: 'center'
  }
})

export default Button;
