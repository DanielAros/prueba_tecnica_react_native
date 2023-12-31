import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as ScreenOrientation  from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Details({route, navigation}) {
    const {item} = route.params;

    const [duration, setDuration] = useState(`${Math.floor(item.duration / 60)}:${item.duration % 60}`);
    const [playing, setPlaying] = useState(false);

    const [orientation, setOrientation] = useState(false);

  useEffect(() => {
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('lastSongs');
            if(value !== null){
                const lastSongs = JSON.parse(value);
                if(lastSongs.length === 10){
                    lastSongs.shift();
                }
                const result = lastSongs.find(song => song.mbid === item.mbid);

                if(result == undefined){
                    lastSongs.push(item);
                    const jsonValue = JSON.stringify(lastSongs);
                    await AsyncStorage.setItem('lastSongs', jsonValue);
                }
            }
        } catch (e) {
          console.log(e);
        }
    };
    getData();

    const updateOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      
      if (currentOrientation === 3 || currentOrientation === 4) {
        setOrientation(true);
      } else {
        setOrientation(false);
      }
    };

    updateOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(updateOrientation);

    return () => {
      subscription.remove();
    };
  }, []);

    return (
        <View style={styles.container}>
            <View style={orientation ? {...styles.card, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'} : {...styles.card, borderTopLeftRadius: 80, borderTopRightRadius: 80, justifyContent: 'center'}}>
                <View style={styles.containerImage}>
                    <Image
                        style={orientation ? {...styles.image, width: 200, height: 200} : {...styles.image, width: 250,height: 250}} 
                        source={{uri: `${item.image[0]['#text']}`}} 
                    />
                </View>
                <View style={orientation ? {width: '50%'} : {width: '100%', height: '40%', marginTop: 20}}>
                    <View style={{marginBottom: 30}}>
                        <Text style={{textAlign: 'center', fontSize: 25, fontWeight: '600', lineHeight: 45}}>{item.name}</Text>
                        <Text style={{textAlign: 'center', color: 'grey'}}>{item.artist.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:  'center'}}>
                        <Text>00:00</Text>
                        <View style={{backgroundColor: 'grey', width: 250, height: 5, borderRadius: 10, marginHorizontal: 10}}></View>
                        <Text>{duration}</Text>
                    </View>
                    <View style={orientation ? {...styles.playerControls, marginTop: 15, marginBottom: 15} : {...styles.playerControls, marginTop: 30, marginBottom: 30}}>
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
    },
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 50,
    },
    playerControls: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    containerMoreOptions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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