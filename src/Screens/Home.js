import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Dimensions, FlatList, Image } from "react-native";
import CardTrack from "../components/CardTrack";
import axios from "axios";
import {API_KEY} from "@env";
import { AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home({navigation, route}) {

    const [fetchData, setFetchData] = useState();
    const [playing, setPlaying] = useState(false);
    const [song, setSong] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getTopTracks = async () => {
            const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=${API_KEY}&format=json&limit=20`);
            const data = await response.data;
            setFetchData(data.tracks.track);
        }

        getTopTracks();
    }, []);

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('lastSongs');
          const lastSongs = JSON.parse(value);
          if (value !== null) {
            setSong(lastSongs.reverse());
          }
        } catch (e) {
          console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, [showModal]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
            <FlatList
                data={fetchData}
                renderItem={({item}) => <CardTrack data={item} onPress={() => {navigation.navigate('Details', {...route, item}); setShowModal(true)}}/>}
                keyExtractor={item => item.mbid}
            />
            {
                showModal 
                ?
                <View style={styles.cardBottom}>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Image
                                    style={{width: 50, height: 50, borderRadius: 10}}    
                                    source={{uri: `${song[0]?.image[0]['#text']}`}} 
                                />
                                <Text style={{marginLeft: 10}}>{song[0]?.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <AntDesign name="banckward" size={20} color="black" />
                                {
                                    playing 
                                    ? 
                                        <AntDesign name="pause" size={20} color="black" onPress={() => setPlaying(false)}/> 
                                    :
                                        <Entypo name="controller-play" size={24} color="black" onPress={() => setPlaying(true)}/>
                                }
                                <AntDesign name="forward" size={20} color="black" />
                            </View>
                        </View>
                        <View style={{backgroundColor: 'grey', width: '100%', height: 2, borderRadius: 10, marginTop: 10}}></View>
                    </View>
                </View> : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#162238',
        width: '100%',
        height: '100%',
    },
    header: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBottom: {
        width: "100%", 
        height: 120, 
        backgroundColor: '#fff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding: 20,
    }
});