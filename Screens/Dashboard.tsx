import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from './DashboardContainer.styles'

import { wsConnect, wsDisconnect } from '../Store/actions';
const groupingValues = [0.5, 1, 2.5, 5, 10, 25, 50, 100]

function Dashboard() {

  const { asks, bids, error } = useSelector(state => state.orderBook);
  const dispatch = useDispatch();
  const connectSocket = () => dispatch(wsConnect());
  const disconnectSocket = () => dispatch(wsDisconnect());
  const [_bids, setBids] = useState([]);
  const [_asks, setAsks] = useState([]);
  const [groupIndex, setGroupIndex] = useState(0)

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    //console.log('asks updated: ', asks)
    handleGrouping(asks)
  }, [asks]);

  useEffect(() => {
    //console.log('bids updated: ', bids)
    handleGroupingBids(bids)
  }, [bids]);

  const handleGrouping = (input: any[]) => {

    if (groupingValues[groupIndex] === groupingValues[0])
      return setAsks(input.slice(0, 5))

    const newArr = [];
    let currentElement = 0;
    let total = 0;

    input.forEach((element: number[]) => {
      let value = Math.ceil(element[0] / groupingValues[groupIndex])
      if (currentElement === 0 || value === currentElement) {
        currentElement = value;
        total += element[1]
      }
      if (value > currentElement) {
        if (total > 0)
          newArr.push([currentElement * groupingValues[groupIndex], total])
        total = 0;
        currentElement = value;
      }
    }
    )

    setAsks(newArr.slice(0, 5))
  }

  const handleGroupingBids = (input: any[]) => {

    if (groupingValues[groupIndex] === groupingValues[0])
      return setBids(input.slice(0, 5))

    const newArr = [];
    let currentElement = 0;
    let total = 0;

    input.forEach(element => {
      let value = Math.ceil(element[0] / groupingValues[groupIndex])
      if (currentElement === 0 || value === currentElement) {
        currentElement = value;
        total += element[1]
      }
      if (value < currentElement) {
        if (total > 0)
          newArr.push([currentElement * groupingValues[groupIndex], total])
        total = 0;
        currentElement = value;
      }
    }
    )

    setBids(newArr.slice(0, 5))
  }

  const onPress = () => {
    setGroupIndex(prevCount => prevCount === groupingValues.length - 1 ? groupingValues.length - 1 : prevCount + 1)
  };

  const onPressMinus = () => {
    setGroupIndex(prevCount => prevCount === 0 ? 0 : prevCount - 1)
  };

  const renderItems = ({ item, index }) =>
    (
      <View key={item[0]} style={{ width: 300, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ flex: 1, color: 'red', fontWeight: 'bold' }}>{item[0]}</Text>
        <Text style={{ flex: 1, color: 'lightgray' }}>{item[1]}</Text>
        <Text style={{ flex: 1, color: 'lightgray' }}>{_asks.slice(0, index + 1).reduce((a, b) => a + b[1], 0)}</Text>
      </View>
    );

  const renderItemsBids = ({ item, index }) =>
    (
      <View key={item[0]} style={{ width: 300, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ flex: 1, color: 'lightgreen', fontWeight: 'bold' }}>{item[0]}</Text>
        <Text style={{ flex: 1, color: 'lightgray' }}>{item[1]}</Text>
        <Text style={{ flex: 1, color: 'lightgray' }}>{_bids.slice(0, index + 1).reduce((a, b) => a + b[1], 0)}</Text>
      </View>
    );

  const getItemLayout = (data: any, index: number) => (
    { length: 10, offset: 10 * index, index }
  );

  if (error !== '')
    return (
      <>
        <View style={styles.container}>
          <Text style={{
            width: '90%',fontSize: 16,
             color: 'aliceblue', fontWeight: 'bold'
          }}>{error}</Text>
        </View>
      </>
    )

  return (
    <>
      <View style={styles.container}>
        <Text style={{
          width: '90%', textDecorationStyle: 'dotted', fontSize: 16,
          textDecorationLine: 'underline', color: 'aliceblue', fontWeight: 'bold'
        }}>Orderbook</Text>
        <View style={{ width: 300, flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-between' }}>
          <Text style={{ flex: 1, textDecorationStyle: 'dotted', textDecorationLine: 'underline', color: 'aliceblue' }}>Price</Text>
          <Text style={{ flex: 1, textDecorationStyle: 'dotted', textDecorationLine: 'underline', color: 'aliceblue' }}>Amount</Text>
          <Text style={{ flex: 1, textDecorationStyle: 'dotted', textDecorationLine: 'underline', color: 'aliceblue' }}>Total</Text>
        </View>
        <FlatList
          data={_asks}
          renderItem={renderItems}
          keyExtractor={(item, index) => item[0]}
          inverted={true}
          windowSize={10}
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={10}
        />
        <View style={{ width: 200, flexDirection: 'row', paddingVertical: 20, justifyContent: 'center' }}>
          <TouchableOpacity style={{ flex: 3 }}>
            <Text style={{ textDecorationStyle: 'dotted', textDecorationLine: 'underline', color: 'aliceblue' }}>Group {groupingValues[groupIndex]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={onPressMinus}><Text style={{ color: 'aliceblue' }}>-</Text></TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={onPress}><Text style={{ color: 'aliceblue' }}>+</Text></TouchableOpacity>
        </View>
        <FlatList
          data={_bids}
          renderItem={renderItemsBids}
          keyExtractor={(item, index) => item[0]}
          windowSize={10}
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={10}
        />
      </View>
    </>
  )
}

export default Dashboard