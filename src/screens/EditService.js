import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useMyContextController, editService } from '../context';

const EditServiceScreen = ({ route, navigation }) => {
    const { serviceId, serviceName: initialServiceName, servicePrice: initialServicePrice } = route.params;
    const [serviceName, setServiceName] = useState(initialServiceName);
    const [servicePrice, setServicePrice] = useState(initialServicePrice);
    const [controller, dispatch] = useMyContextController();

    const handleSave = () => {
        const updatedService = {
            name: serviceName,
            price: servicePrice,
        };
        editService(serviceId, updatedService);
        navigation.goBack();
    };

    return (
        <View style={{ gap: 10, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sửa dịch vụ</Text>
            <Text style={{ fontWeight: 'bold' }}>Tên dịch vụ <Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
                mode='outlined'
                value={serviceName}
                onChangeText={text => setServiceName(text)}
            />
            <Text style={{ fontWeight: 'bold' }}>Giá <Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
                mode='outlined'
                value={servicePrice}
                onChangeText={text => setServicePrice(text)}
                keyboardType="numeric"
            />
            <Button mode='contained' style={{width: 100, alignSelf: 'center'}}onPress={handleSave}>Save</Button>
        </View>
    );
};

export default EditServiceScreen;
