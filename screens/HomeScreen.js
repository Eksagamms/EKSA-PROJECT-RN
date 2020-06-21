import React, { Component } from 'react';

import { StyleSheet, Text, PanResponder, View, ScrollView, TouchableOpacity } from 'react-native';
<<<<<<< HEAD
import { Chip, Badge, RadioButton, ActivityIndicator, Colors, Divider, Subheading, List, Caption, IconButton, Button } from 'react-native-paper'
=======
import { Chip, Badge, RadioButton, ActivityIndicator, Colors, Divider, Subheading, List, Caption, IconButton } from 'react-native-paper'
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
import { Overlay, colors } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle'

import Header from '../components/Header'
import Search from '../components/Search'
import BannerScreen from '../components/Banner'
import Chips from '../components/Chips'
import AnalysisProgress from '../components/AnalysisProgress'
<<<<<<< HEAD
import CompareProgress from '../components/CompareProgress'
=======
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d

import { observer } from 'mobx-react';
import AnalysisStore from '../src/store/AnalysisStore';
import LoginStore from '../src/store/LoginStore';
import { FlatList } from 'react-native-gesture-handler';


@observer
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            overlayData: [],
            checked: "first",
            selectedAnalysisId: null,
            selectedAnalysisSessionId: null,
<<<<<<< HEAD
            userIdentityId: null,
            compare: false
        }
    }

    componentDidMount() {
        console.log(LoginStore.kisi.userIdentityNumber);
        this.setState({ userIdentityId: LoginStore.kisi.userIdentityNumber })
        console.log('Burada 2');
        console.log(this.props);
=======
            userIdentityId:null
        }
    }

    componentDidMount()
    {
        console.log(LoginStore.kisi.userIdentityNumber);
        this.setState({userIdentityId:LoginStore.kisi.userIdentityNumber})
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
        //Useridentity
    }

    toggleOverlay = () => {
        this.setState({ visible: false });
    };

    onclickBadge = (data) => {
        if (data.length == 0) {
            alert('Tahlil Bulunamadı !')
<<<<<<< HEAD
            this.setState({ selectedAnalysisId: null,compare:false });
            AnalysisStore.changeAnalysisSelectedSessionData(null);
            AnalysisStore.changeCompareData();
=======
            this.setState({ selectedAnalysisId: null });
            AnalysisStore.changeAnalysisSelectedSessionData(null);
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
        }
        else {
            this.setState({ overlayData: data, visible: true });
            console.log(this.state.overlayData);
        }
    }

    skeletonData = () => {
        if (this.state.selectedAnalysisId == null) {
<<<<<<< HEAD
            if (this.state.compare == false) {
                return (
                    <View>
                        <View>
                            <Caption style={{ textAlign: "center" }}>Tahlil Seçiniz</Caption >
                        </View>
                        <View style={{ backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, margin: 10, borderRadius: 20, padding: 10, flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <ProgressCircle
                                    percent={0}
                                    radius={40}
                                    borderWidth={8}
                                    color="gray"
                                    shadowColor="#dfdfdf"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 18, color: colors.grey0 }}>0</Text>
                                </ProgressCircle>
                            </View>
                            <View style={{ justifyContent: 'center', padding: 5, width: '70%', marginLeft: 10 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Subheading style={{ color: 'green', backgroundColor: '#dfdfdf' }}></Subheading><Caption style={{ backgroundColor: '#dfdfdf', width: 60 }}></Caption>
                                    <Text style={{ backgroundColor: '#dfdfdf', height: 50, marginTop: 10 }}></Text>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Subheading style={{ color: 'green', backgroundColor: '#dfdfdf' }}></Subheading><Caption style={{ backgroundColor: '#dfdfdf', width: 60 }}></Caption>
                                    <Text style={{ backgroundColor: '#dfdfdf', height: 50, marginTop: 10 }}></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            }

=======
            return (
                <View>
                    <View>
                        <Caption style={{ textAlign: "center" }}>Tahlil Seçiniz</Caption >
                    </View>
                    <View style={{ backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, margin: 10, borderRadius: 20, padding: 10, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <ProgressCircle
                                percent={0}
                                radius={40}
                                borderWidth={8}
                                color="gray"
                                shadowColor="#dfdfdf"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 18, color: colors.grey0 }}>0</Text>
                            </ProgressCircle>
                        </View>
                        <View style={{ justifyContent: 'center', padding: 5, width: '70%', marginLeft: 10 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Subheading style={{ color: 'green', backgroundColor: '#dfdfdf' }}></Subheading><Caption style={{ backgroundColor: '#dfdfdf', width: 60 }}></Caption>
                                <Text style={{ backgroundColor: '#dfdfdf', height: 50, marginTop: 10 }}></Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Subheading style={{ color: 'green', backgroundColor: '#dfdfdf' }}></Subheading><Caption style={{ backgroundColor: '#dfdfdf', width: 60 }}></Caption>
                                <Text style={{ backgroundColor: '#dfdfdf', height: 50, marginTop: 10 }}></Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
        }
    }

    overlaySelectedData = (id, session) => {
        this.setState({ selectedAnalysisId: id, selectedAnalysisSessionId: session, visible: false })
<<<<<<< HEAD
        AnalysisStore.changeCompareData();
        AnalysisStore.analysisValues(session);
    }

    compareClick = () => {
        this.setState({ visible: false, compare: true, selectedAnalysisId: null })
        AnalysisStore.changeAnalysisSelectedSessionData(null);
        AnalysisStore.getCompareAnalysis();
    }

    compare = () => {
        if (AnalysisStore.analysisHemogramData.length > 1) {
            return (
                <Button icon="compare" color={'green'} mode="contained" onPress={() => this.compareClick()}>
                    Karşılaştır
                </Button>
            )
        }
    }

=======
        AnalysisStore.analysisValues(session);
    }

>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
    data = () => {
        return (
            <View>
                <Subheading style={{ textAlign: "center" }}>Tahlil Tarihi Seçiniz</Subheading >
                <FlatList
<<<<<<< HEAD

=======
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
                    numColumns={1}
                    data={this.state.overlayData == [] ? null : this.state.overlayData}
                    renderItem={({ item }) => (


                        <View>
                            <TouchableOpacity onPress={() => { this.overlaySelectedData(item.Id, item.AnalysisSessionId); }}>
                                <List.Section >
                                    <Caption>Tarih - Saat</Caption>
                                    <List.Item
                                        title={item.DateTime.substring(0, 10)}
                                        left={props => <List.Icon {...props} icon="calendar-range" />}
                                    />
                                    <List.Item
                                        title={item.DateTime.substring(11, 16)}
                                        left={props => <List.Icon {...props} icon="timer-sand-empty" />}
                                    />
                                </List.Section>
                                <Divider />
                            </TouchableOpacity>
                        </View>

                    )}
                    keyExtractor={item => item.id}
                />
<<<<<<< HEAD
                {this.compare()}
=======
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
            </View>
        )
    }

    render() {
        if (AnalysisStore.dataState) {
            return (
                <ActivityIndicator
                    size='large'
                    animating={AnalysisStore.dataState}
                    color={Colors.black}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            )
        }
        else {
            return (
                <ScrollView>
                    <View>
<<<<<<< HEAD
                        <Header username={'Mehmet Uğur'} />
                        <Search value="ugur" />
                        <Chips props={this.props} />
=======
                        <Header username={LoginStore.kisi.userPersonalName} />
                        <Search value="ugur" />
                        <Chips />
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
                        <BannerScreen />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <View style={{ position: "absolute", left: 0 }}>
                            <IconButton
                                icon="refresh"
                                color={Colors.black}
                                size={20}
                                onPress={() => { AnalysisStore.start() }}
                            />
                        </View>
                        <View style={{ marginRight: 10, marginLeft: 10, marginBottom: 10 }}>
                            <Badge style={{ top: 7, zIndex: 2, backgroundColor: AnalysisStore.analysisHemogramData.length == 0 ? '#CD0000' : 'green' }}>{AnalysisStore.analysisHemogramData.length}</Badge>
                            <Chip icon="invert-colors" style={styles.chip} mode="outlined" onPress={() => this.onclickBadge(AnalysisStore.analysisHemogramData)}>Hemogram</Chip>
                        </View>
                        <View style={{ marginRight: 10, marginBottom: 10 }}>
                            <Badge style={{ top: 7, zIndex: 2, backgroundColor: AnalysisStore.analysisIdrarData.length == 0 ? '#CD0000' : 'green' }}>{AnalysisStore.analysisIdrarData.length}</Badge>
                            <Chip icon="google-fit" style={styles.chip} mode="outlined" onPress={() => this.onclickBadge(AnalysisStore.analysisIdrarData)}>İdrar</Chip>
                        </View>
                        <View style={{ marginRight: 10, marginBottom: 10 }}>
                            <Badge style={{ top: 7, zIndex: 2, backgroundColor: AnalysisStore.analysisHepatitData.length == 0 ? '#CD0000' : 'green' }}>{AnalysisStore.analysisHepatitData.length}</Badge>
                            <Chip icon="tune-vertical" style={styles.chip} mode="outlined" onPress={() => this.onclickBadge(AnalysisStore.analysisHepatitData)}>Hepatit</Chip>
                        </View>
                    </View>

                    <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}>
                        {this.data()}
                    </Overlay>

                    <View>
                        {this.skeletonData()}
                    </View>

                    <AnalysisProgress data={AnalysisStore.analysisSelectedSessionData} />
<<<<<<< HEAD
                    <CompareProgress data={AnalysisStore.compareAllData} />
=======
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
                </ScrollView >

            );
        }
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'grey',
        height: 200,
    },
    lastAppoinment: {
        width: '90%',
        height: '30%',
        margin: '5%',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 20,
        flexDirection: 'row'
    },
});
export default Home;