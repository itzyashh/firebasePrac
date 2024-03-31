import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameContainer: {
        flexDirection: 'row',
        gap: 20
    },
    inputContainer: {
        marginBottom: 20,
        gap: 28,
        width: '90%'
    },
    input: {
        borderRadius:15
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        gap:10
    },
    btn: {
        borderRadius: 15
    },
    
})