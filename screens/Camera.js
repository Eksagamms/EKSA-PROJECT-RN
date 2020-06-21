import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Button, ActivityIndicator, Colors, Avatar } from 'react-native-paper'
import User from '../models/User';


export default class CemaraScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: true,
            type: Camera.Constants.Type.back,
            loading: false
        };
    }
    async checkMultiPermissions() {
        const { status, expires, permissions } = await Permissions.getAsync(
            Permissions.CAMERA
        );
        if (status !== 'granted') {
            alert('Hey! You have not enabled selected permissions');
            this.setState({ hasPermission: false });
        }
        else {
            this.setState({ hasPermission: true });
        }
    }

    uploadImage = (image_uri) => {


        try {

            var path = 'ocrdata' +Math.floor(Math.random() * 101).toString() + '.jpg';
            // var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "multipart/form-data; boundary=--------------------------984885506527086886394027");


            var formdata = new FormData();
            formdata.append('Files', { type: 'image/jpg', uri: image_uri, name: path })

            var requestOptions = {
                method: 'POST',
                // headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            this.setState({ loading: true })

            fetch("https://www.matmaca.com/api/ocr/upload", requestOptions)
                .then(response => {
                    this.setState({ loading: false })
                    fetch("https://www.matmaca.com/api/ocr/get?fileName=" + path)
                        .then(response => {
                            this.setState({ loading: false })
                            if (response.text() == "Wrong data !") {
                                alert('Başarısız !');
                            }
                            else if (response.text() == "Success") {
                                alert('Başarılı !');
                            }
                            else {
                                console.log(response.text());
                            }
                        })
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                })
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error);
        }

    }


    componentWillMount() {
        this.checkMultiPermissions();
    }

    takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo);
            this.uploadImage(photo.uri);
        }
    }

    handleCameraType = () => {
        const { cameraType } = this.state

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }


    render() {
        const { hasPermission } = this.state
        if (hasPermission === false) {
            return <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Text style={{ marginTop: '60%', marginBottom: 10 }}>No access to camera</Text>
                <Avatar.Image size={200} source={require('../assets/cancel2.png')} />
            </View>;
        } else if (hasPermission === null) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>

                    <Camera style={{ flex: 1, justifyContent: 'center' }} type={this.state.cameraType} ref={ref => {
                        this.camera = ref;
                    }}>
                        <ActivityIndicator animating={this.state.loading} color={Colors.white} />
                        <Button icon="camera" color="black"
                            style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                position: 'absolute',
                                bottom: '10%',
                            }} onPress={() => { this.takePicture() }}>
                            <Text>Take !</Text>
                        </Button>
                        <Button icon="autorenew" color="black"
                            style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: '5%',
                                left: '5%',
                                borderRadius: 20
                            }} onPress={() => { this.handleCameraType() }}>
                            <Text>Flip !</Text>
                        </Button>
                        <Button icon="camera-burst" color="black"
                            style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: '5%',
                                right: '5%',
                                borderRadius: 20
                            }} onPress={() => { this.handleCameraType() }}>
                            <Text>Album !</Text>
                        </Button>
                    </Camera>
                </View>
            );
        }
    }

}