import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import TouchableComponent from "../assets/TouchableComponent";
import { Entypo } from '@expo/vector-icons';
import axios from "axios";

import {API_KEY} from "@env";

export default function CardTrack(props) {
    const data = props.data;
    const [trackInfo, setTrackInfo] = useState();

    // useEffect(() => {
    //     const getTrackInfo = async () => {
    //         console.log('DATA', data)
    //         // const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=${API_KEY}&format=json&limit=20`);
    //         const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${data.artist.name}&track=${data.name}&format=json`);
    //         const data = await response.data.track;
    //         console.log("CARD TRACK", data)
    //         setTrackInfo(data.track);
    //     }
    //     getTrackInfo();
    //     // console.log('INFOASDA', trackInfo)
    // }, []);
    useEffect(() => {
        // console.log(API_KEY)
        console.log('DATA', data.artist.name, data.name)
    }, []);
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

