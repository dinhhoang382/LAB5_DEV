import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createContext, useContext, useMemo, useReducer } from 'react'

const MyContext = createContext();
MyContext.displayName = "MyContextContext";
//
function reducer(state, action) {
    switch (action.type) {
        case "USER_LOGIN": {
            return { ...state, userLogin: action.value }
        }
        default: {
            throw new Error(`Unhandle action type: ${action.type}`);
        }
    }
}
//react context controller
function MyContextControllerProvider({ children }) {
    const intialState = {
        userLogin: null,
    }
    const [controller, dispatch] = useReducer(reducer, intialState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
function useMyContextController() {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error("useMyContextController should be inside the MyContextControllerProvider ")
    }
    return context;
}
//table
const USER = firestore().collection("USER")
const SERVICE = firestore().collection("SERVICE")
//ACTION
const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email, password).then(
        () =>
            USER.doc(email).onSnapshot(u => {
                const value = u.data()
                console.log("Đăng nhập thành công với user: ", value);
                dispatch({ type: "USER_LOGIN", value })

            })
    )
        .catch(e => alert("Sai username và password"))
}
const logout = (dispatch) => {
    dispatch({ type: "USER_LOGIN", })
}
const createNewService = (newService) => {
    newService.finalUpdate = firestore.FieldValue.serverTimestamp()
    SERVICE.add(newService)
        .then(() => alert("Thêm sản phẩm thành công!"))
        .catch((e) => alert(e))
}
const deleteService = async (serviceId) => {
    try {
        await SERVICE.doc(serviceId).delete();
        console.log("DELETE SERVICE SUCCESSFULLY!");
    } catch (error) {
        console.error(error);
        alert("Error deleting service:", error.message);
    }
}
const editService = async (serviceId, updatedService) => {
    try {
        updatedService.finalUpdate = firestore.FieldValue.serverTimestamp()
        await SERVICE.doc(serviceId).update(updatedService);
        alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
        console.error(error);
        alert("Error updating service:", error.message);
    }
};
export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
    createNewService,
    deleteService,
    editService,
}