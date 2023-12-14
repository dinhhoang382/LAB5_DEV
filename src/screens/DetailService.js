import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const DetailService = ({ route }) => {
  const { name, price, admin, createdAt, finalUpdate } = route.params.product;
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Tên dịch vụ: {name}</Text>
        <Text style={styles.detailText}>Giá: {price} Đồng</Text>
        <Text style={styles.detailText}>Tạo bởi: {admin}</Text>
        {createdAt && (
          <Text style={styles.detailText}>
            Ngày tạo: {createdAt.toDate().toLocaleDateString()}
          </Text>
        )}
        {finalUpdate && (
          <Text style={styles.detailText}>
            Ngày cập nhật: {finalUpdate.toDate().toLocaleString()}
          </Text>
        )}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default DetailService;
