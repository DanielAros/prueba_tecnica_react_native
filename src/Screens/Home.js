import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import CardTrack from "../components/CardTrack";
import axios from "axios";
import {API_KEY} from "@env";

export default function Home() {

    const [fetchData, setFetchData] = useState();

    useEffect(() => {
        const getTopTracks = async () => {
            const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=mexico&api_key=${API_KEY}&format=json&limit=10`);
            const data = await response.data;
            setFetchData(data.tracks.track);
        }
        getTopTracks();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{color: '#fff', fontSize: 18}}>Top Tracks from mexico</Text>
            </View>
            <FlatList
                data={fetchData}
                renderItem={({item}) => <CardTrack data={item}/>}
                keyExtractor={item => item.mbid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#162238',
        width: '100%',
        height: '100%',
        marginTop: 30,
    },
    header: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});