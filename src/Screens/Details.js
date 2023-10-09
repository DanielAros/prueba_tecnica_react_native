import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function Details({route, navigation}) {
    const {item} = route.params;

    const [playing, setPlaying] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.containerImage}>
                    <Image
                        style={styles.image} 
                        source={{uri: `${item.image[3]['#text']}`}} 
                    />
                </View>
                <View>
                    <Text style={{textAlign: 'center', fontSize: 25, fontWeight: '600', lineHeight: 45}}>{item.name}</Text>
                    <Text style={{textAlign: 'center', color: 'grey'}}>{item.artist.name}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:  'center'}}>
                    <Text>00:00</Text>
                    <View style={{backgroundColor: 'grey', width: 250, height: 5, borderRadius: 10, marginHorizontal: 10}}></View>
                    <Text>00:00</Text>
                </View>
                <View style={styles.playerControls}>
                    <AntDesign name="banckward" size={36} color="black" />
                    {
                        playing ? 
                        <AntDesign name="pause" size={36} color="black" onPress={() => setPlaying(false)}/> :
                        <Entypo name="controller-play" size={36} color="black" onPress={() => setPlaying(true)}/>
                    }
                    <AntDesign name="forward" size={36} color="black" />
                </View>
                <View style={styles.containerMoreOptions}>
                    <View style={styles.actions}>
                        <FontAwesome5 name="long-arrow-alt-up" size={20} color="grey" />
                        <Text style={styles.marginsText}>201</Text>
                        <FontAwesome5 name="long-arrow-alt-down" size={20} color="grey" />
                    </View>
                    <View style={styles.actions}>
                        <MaterialCommunityIcons name="repeat-variant" size={20} color="grey" />
                        <Text style={styles.marginsText}>18</Text>
                    </View>
                    <View style={styles.actions}>
                        <Entypo name="controller-play" size={20} color="grey" />
                        <Text style={styles.marginsText}>2,004</Text>
                    </View>
                    <View style={styles.actions}>
                        <MaterialIcons name="add" size={24} color="black" />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#162238',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    card: {
        width: '100%',
        height: '98%',
        backgroundColor: '#F9FAFE',
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
    },
    containerImage: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 50,
    },
    playerControls: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 30,
    },
    containerMoreOptions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        padding: 20
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    marginsText: {
        marginHorizontal: 5,
    }
});