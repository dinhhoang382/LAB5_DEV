import React, { useState, useEffect, useContext, } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TextInput, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign";
import { useMyContextController, createNewService, deleteService, editService } from '../context';



const Home = ({ navigation }) => {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [services, setServices] = useState([]);
  const [controller, dispatch] = useMyContextController();

  useEffect(() => {
    const unsubscribe = firestore().collection('SERVICE')
      .onSnapshot(querySnapshot => {
        const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(servicesData);
      });

    return () => unsubscribe();
  }, []);

  const handleAddService = () => {
    if (serviceName.trim() === '' || servicePrice.trim() === '') {
      Alert.alert('Thông báo!', 'Nhập trường dữ liệu tên và giá!');
      return;
    }

    const newService = {
      name: serviceName,
      price: servicePrice,
    };

    createNewService(newService);
    setServiceName('');
    setServicePrice('');
  };
  const handleEditService = (serviceId, serviceName, servicePrice) => {
    navigation.navigate('EditServiceScreen', { serviceId, serviceName, servicePrice });
  };
  const renderItem = ({ item }) => (
    <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 10, flexDirection: 'row', padding: 5, width: '200' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailServiceScreen', { product: item })}
        onLongPress={() => {
          Alert.alert(
            'Xóa sản phẩm',
            'Bạn có chắc chắn muốn xóa sản phẩm này?',
            [
              { text: 'Hủy bỏ' },
              { text: 'Xóa', onPress: () => deleteService(item.id) },
            ]
          );
        }}
      >
        <View style={styles.serviceItem}>
          <Text style={{ fontWeight: 'bold', width: 150 }}>{item.name}</Text>
          <Text style={{ width: 100 }}>{item.price} vnđ</Text>
        </View>
      </TouchableOpacity>
      {/* sửa */}
      <TouchableOpacity onPress={() => handleEditService(item.id, item.name, item.price)}>
        <Text style={{ padding: 8, color: 'blue' }}>Sửa</Text>
      </TouchableOpacity>
    </View>

  );

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 15 }}>Tên dịch vụ <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        mode='outlined'
        style={styles.input}
        placeholder="Tên dịch vụ"
        value={serviceName}
        onChangeText={text => setServiceName(text)}
      />
      <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 15 }}>Giá <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        mode='outlined'
        style={styles.input}
        placeholder="Giá"
        value={servicePrice}
        onChangeText={text => setServicePrice(text)}
        keyboardType="numeric"
      />

      <Button mode='outlined' style={{ borderRadius: 5 }} onPress={handleAddService}>Thêm SP</Button>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: 'purple', fontSize: 20, marginRight: 150, marginBottom: 5 }}>
          Danh mục sản phẩm</Text>
        <TouchableOpacity onPress={() => { Alert.alert("Trợ giúp", "- Nhấn để hiện chi tiết sản phẩm\n- Giữ để xoá sản phẩm") }}>
          <View>
            <Icon name='question' size={20} />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    gap: 10,
    alignItems: 'center',
    // Add other styling as needed
  },
  input: {
    width: '90%'
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Home;

