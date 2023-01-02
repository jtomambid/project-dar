import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../../components/_common/Button';
import { useNavigation } from "@react-navigation/native";
const Home = () => {

    const navigation = useNavigation();
    
    return (
        <View style={{height: '100%', backgroundColor: '#ffffff'}}>        
           <View style={{backgroundColor: '#F1F1F1', width: '100%', height: 200, borderBottomEndRadius: 80, borderBottomStartRadius: 80, marginBottom: 80}}/>
           <View style={{position: 'absolute', alignSelf: 'center', top: 50}}>
                <Image source={require("../../assets/home.png")} />
           </View>
           <ScrollView style={{height:'100%'}}>
           <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 60}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#000'}}>Want to share your Food and Medicine?</Text>
           </View>
           <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 15,  textAlign: 'center', color: '#000'}}>Choose anyone below</Text>
           </View>
           <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 25}}>
                <TouchableOpacity onPress={() => navigation.navigate("BottomNavigation", {screen: "Donate"})}>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require("../../assets/donor.png")}/>
                        <View style={{width: '70%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 15,  color: '#000', fontWeight: 'bold', textAlign: 'center'}}>Donor</Text>
                            <Text style={{fontSize: 12,  color: '#000', textAlign: 'center'}}>Donate Food and Medicine for needy</Text>
                        </View>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => navigation.navigate("BottomNavigation", {screen: "Statistic"})}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require("../../assets/bank.png")}/>
                        <View style={{width: '70%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 15, color: '#000', fontWeight: 'bold', textAlign: 'center'}}>Resource Bank</Text>
                            <Text style={{fontSize: 12,  color: '#000', textAlign: 'center'}}>All Resource Bank Affiliate</Text>
                        </View>
                    </View>
                </TouchableOpacity>
           </View>
           <TouchableOpacity onPress={() => navigation.navigate("BottomNavigation")}>
                <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                    <Button styles={{width: '50%'}}>
                        <Text style={{fontSize: 17,fontWeight: 'bold'}}>Start Sharing</Text>
                    </Button>
                </View>
           </TouchableOpacity>
           </ScrollView>
           <View style={{justifyContent: 'center', alignContent: 'center', alignSelf: 'center'}}>
                <Image source={require("../../assets/hungry.png")}/>
           </View>
            <View style={{position: 'absolute', bottom: 0, width: '100%', height: "-90%", justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: '#E1E1E1', width: '50%', height: 50, elevation: -1, borderTopRightRadius: 50, borderTopLeftRadius: 50 }}/>
                <View style={{backgroundColor: '#196332', width: '100%', height: 40, elevation: -1}}/>
            </View>
        </View>
    )
}

export default Home;
