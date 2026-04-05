import { format } from "date-fns";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import DatePicker from "react-native-date-picker";

export default function DataPicker({
    value,
    onChange,
}: {
    value: Date;
    onChange?: (date: Date) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Pressable style={style.textInput} onPress={() => setOpen(true)}>
                <Text>{format(value, "dd/MM/yyyy")}</Text>
            </Pressable>

            <DatePicker
                mode="date"
                locale="pt-BR"
                title={"Selecionar data"}
                confirmText={"Confirmar"}
                cancelText={"Cancelar"}
                modal
                open={open}
                date={value}
                onConfirm={(date) => {
                    setOpen(false);
                    onChange?.(date);
                }}
                onCancel={() => setOpen(false)}
            />
        </>
    );
}

const style = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: '#ccc',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
    }
});