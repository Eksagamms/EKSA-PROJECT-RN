import * as React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { Subheading, Caption } from 'react-native-paper';

class CompareProgress extends React.Component {


    onColorChange = (Result) => {
        if (Result == '1') {
            return 'green'
        } else if (Result == '2') {
            return 'red'
        }
        else if(Result == '3')
        {
            return 'orange'
        }
        else {
            return '#407294'
        }
    }

    render() {
        const { data } = this.props;
        return (
            <View>
                <FlatList
                    numColumns={1}
                    data={data == [] ? null : data}
                    renderItem={({ item }) => (

                        <View style={{ backgroundColor: 'white', borderColor: this.onColorChange(item.Result), borderWidth: 1, margin: 10, borderRadius: 20, padding: 10, flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <ProgressCircle
                                    percent={item.Value1 > item.MaxValue ? 100 : item.MaxValue}
                                    radius={40}
                                    borderWidth={8}
                                    color={this.onColorChange(item.Result)}
                                    shadowColor="#dfdfdf"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 18 }}>{item.Value1}</Text>
                                </ProgressCircle>
                            </View>
                            <View style={{ justifyContent: 'flex-end',position:'absolute',top:10,right:10 }}>
                                <ProgressCircle
                                    percent={item.Value2 > item.MaxValue ? 100 : item.MaxValue}
                                    radius={40}
                                    borderWidth={8}
                                    color={this.onColorChange(item.Result)}
                                    shadowColor="#dfdfdf"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 18 }}>{item.Value2}</Text>
                                </ProgressCircle>
                            </View>
                            <View style={{ justifyContent: 'center', padding: 5, width: '50%', marginLeft: 10 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Subheading style={{ color: this.onColorChange(item.Result) }}>{item.Name}</Subheading><Subheading style={{ color: this.onColorChange(item.Result) }}>{item.Yorum}</Subheading><Caption>{item.MinValue} - {item.MaxValue} {item.Type}</Caption>
                                    <Text>{item.Description}</Text>
                                </View>
                            </View>
                        </View>

                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    search: {
        marginLeft: '3%',
        marginRight: '3%'
    }
});
export default CompareProgress;