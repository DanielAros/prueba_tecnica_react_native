import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import CardTrack from "../components/CardTrack";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({route, navigation}) {

    const [data, setData] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('lastSongs');
              const lastSongs = JSON.parse(value);
              if (value !== null) {
                setData(lastSongs.reverse());
              }
            } catch (e) {
              console.log(e);
            }
        };
        getData();  
    }, [])


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Last songs played</Text>
            <FlatList
                data={data}
                renderItem={({item}) => <CardTrack data={item} onPress={() => navigation.navigate('Details', {...route, item})}/>}
                keyExtractor={item => item.mbid}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#162238',
        width: '100%',
        height: '100%',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        margin: 20
    }
});