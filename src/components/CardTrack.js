import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import TouchableComponent from "../assets/TouchableComponent";
import { Entypo } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CardTrack(props) {
    const data = props.data;
    return (
        <TouchableComponent onPress={props.onPress}>
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        style={styles.image} 
                        source={{uri: `${data.image[3]['#text']}`}} 
                    />
                    <View style={styles.containerTrack}>
                        <View style={styles.details}>
                            <Text style={{color: 'gray'}}>19d °</Text>
                            <Text style={{color: 'gray'}}>#hiphop</Text>
                        </View>
                        <Text style={{color: '#fff', fontSize: 16}}>{data.name}</Text>
                        <Text style={{color: 'gray'}}>{data.artist.name}</Text>
                    </View>
                </View>
                <View>
                    <Entypo name="dots-three-horizontal" size={24} color="grey"/>
                </View>
            </View>
        </TouchableComponent> 
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#162238',
        width: '100%',
        height: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerTrack: {
        paddingLeft: 10,
        paddingBottom: 12,
        justifyContent: 'space-between',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    details: {
        flexDirection: 'row',
    }
})

