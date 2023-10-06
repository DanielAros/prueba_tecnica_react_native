import { Platform, TouchableOpacity, TouchableNativeFeedback } from "react-native";

export default function TouchableComponent(props) {
    const TouchabelCmp = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return(
        <TouchabelCmp onPress={props.onPress}>
            {props.children}
        </TouchabelCmp>
    )
}