import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    phoneInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '30%'
    },
    btnContainer: {
        flexDirection: 'row',
        gap:10
    },
    gIcon: {
        width: 32,
        height: 32,
    },
    gBtnContainer: {
        marginTop: 40,
        gap: 10
    },
    inputContainer: {
        marginBottom: 20,
        gap: 8,
        width: '70%'
    }
})