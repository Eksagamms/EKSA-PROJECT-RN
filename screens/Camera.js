<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Button, ActivityIndicator, Colors, Avatar } from 'react-native-paper'
import User from '../models/User';


export default class CemaraScreen extends React.Component {
=======
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Button, ActivityIndicator, Colors, Avatar, Snackbar } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: true,
<<<<<<< HEAD
            type: Camera.Constants.Type.back,
            loading: false
        };
    }
=======
            scanned: true,
            loading: false,
            visible: false,
            errText:null,
            color:'red'
        };
    }

    _onToggleSnackBar = () => this.setState(state => ({ visible: !state.visible }));

    _onDismissSnackBar = () => this.setState({ visible: false });

    async componentDidMount() {
        this.checkMultiPermissions();
    }

>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
    async checkMultiPermissions() {
        const { status, expires, permissions } = await Permissions.getAsync(
            Permissions.CAMERA
        );
        if (status !== 'granted') {
            alert('Hey! You have not enabled selected permissions');
            this.setState({ hasPermission: false });
<<<<<<< HEAD
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
=======
        } else {
            this.setState({ hasPermission: true });
        }
    }
    async updateControlOne(data) {
        fetch("https://www.matmaca.com/api/ocr/OcrControlUpdateOne?sessionId=" + data)
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log('error', error));
    }

    async updateControlZero(data) {
        fetch("https://www.matmaca.com/api/ocr/OcrControlUpdateZero?sessionId=" + data)
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => 
              this.setState({errText:error,visible:true,color:'red'})   );
    }

    async getValues(data) {
        fetch("https://www.matmaca.com/api/ocr/control?sessionId=" + data)
            .then(response => response.json())
            .then(response => {
                this.setState({ loading: false })
                if(response == 'Success')
                {
                    this.updateControlOne(data);
                    this.setState({errText:response,visible:true,color:'green'});   
                }
                else{
                    this.setState({errText:response,visible:true,color:'red'});   
                }
            })
            .catch(error => 
                this.setState({errText:error,visible:true,color:'red'})   
                );
    }

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return (
                <View
                    style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                    <Text style={{ marginTop: '60%', marginBottom: 10 }}>
                        No access to camera
          </Text>
                </View>
            );
        }
        if (hasCameraPermission === false) {
            return (
                <View
                    style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                    <Text style={{ marginTop: '60%', marginBottom: 10 }}>
                        No access to camera
          </Text>
                </View>
            );
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <ActivityIndicator
                    size='large'
                    animating={this.state.loading}
                    color={Colors.white}
                    style={{ bottom: '50%' }}
                />
                <Snackbar
                    visible={this.state.visible}
                    style={{backgroundColor: this.state.color}}
                    onDismiss={this._onDismissSnackBar}
                >
                    {this.state.errText}
        </Snackbar>
                <Button
                    icon="camera"
                    color="black"
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: '10%',
                    }}
                    onPress={() => {
                        this.setState({ scanned: false, loading: true });
                    }}>
                    <Text>Take !</Text>
                </Button>
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        console.log(data);
        this.getValues(data);
    };
}
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
