import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Card, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController, logout } from '../context';
import auth from '@react-native-firebase/auth'

const UserDetailScreen = ({navigation}) => {
    const [userData, setUserData] = useState({});
    const [controller, dispatch] = useMyContextController();

    useEffect(() => {
        const userEmail = controller.userLogin?.email;
        if (userEmail) {
            const unsubscribe = firestore().collection('USER').doc(userEmail)
                .onSnapshot(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        setUserData(documentSnapshot.data());
                    }
                });

            return () => unsubscribe();
        }
    }, [controller.userLogin]);

    const handleLogout = async () => {
        try {
            await auth().signOut();
            dispatch({ type: "USER_LOGIN", value: null });
            navigation.navigate("Login")
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Avatar.Image size={100} source={{ uri: userData.image }} />
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.userName}>{userData.name}</Text>
                    <Text style={styles.userDetails}>Email: {userData.email}</Text>
                    <Text style={styles.userDetails}>Phone: {userData.phone}</Text>
                    <Text style={styles.userDetails}>Address: {userData.address}</Text>
                </Card.Content>
            </Card>
            <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton}>
                Logout
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    card: {
        marginTop: 20,
        width: '90%',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    userDetails: {
        fontSize: 16,
        color: '#777',
        marginBottom: 4,
    },
    logoutButton: {
        marginTop: 20,
    },
});

export default UserDetailScreen;
