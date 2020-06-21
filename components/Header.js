import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { Avatar, IconButton, Title, Caption } from 'react-native-paper';

<<<<<<< HEAD

=======
import LoginStore from '../src/store/LoginStore'
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d


class Header extends Component {

    componentWillMount() {
        console.log(this.props);
    }


    render() {
        return (
            <View style={styles.lastAppoinment}>
                <View style={{margin:'8%',marginTop:'13%',flexDirection: 'row'}}>
<<<<<<< HEAD
                    <Avatar.Image size={50} source={require('../assets/me.jpg')} />
=======
                    {
                        LoginStore.kisi.userIdentityNumber != '' ? (                   
                             <Avatar.Image size={50} source={{uri:`https://www.matmaca.com/images/${LoginStore.kisi.userIdentityNumber}.jpg`}} />
                        ) : (
                            <Avatar.Image size={50} source={require('../assets/person.png')} />
                        )
                    }
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
                    <Caption style={styles.headerText}>Merhaba, <Title style={{ fontSize: 21, fontWeight: "400" }}>{this.props.username}</Title> </Caption>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    lastAppoinment: {
        opacity: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    headerText: {
        marginTop: '5%',
        marginLeft: '10%',
        fontSize: 17
    }
});
export default Header;