import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Sintoma, sintomas } from "../interface/anotacoes-interface";

export default function Dropdown({
  callback,
  initValue,
}: {
  initValue: Sintoma | null;
  callback?: (sintoma: Sintoma) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Sintoma | null>(null);

  const options = Object.entries(sintomas);

  useEffect(() => {
    setSelected(initValue);
  }, [initValue]);

  return (
    <View style={{ position: "relative" }}>
      
      {/* INPUT */}
      <TouchableOpacity
        style={styles.input}
        activeOpacity={0.8}
        onPress={() => setOpen(!open)}
      >
        {selected ? (
          <View style={styles.selectedContainer}>
            <Text style={styles.emoji}>
              {sintomas[selected].emoji}
            </Text>
            <Text style={styles.selectedText}>
              {sintomas[selected].label}
            </Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>
            💭 Selecione como você está se sentindo
          </Text>
        )}
      </TouchableOpacity>

      {/* OVERLAY */}
      {open && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        />
      )}

      {/* DROPDOWN */}
      {open && (
        <View style={styles.dropdown}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {options.map(([key, item]) => {
              const isSelected = selected === key;

              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.7}
                  style={[
                    styles.item,
                    isSelected && {
                      backgroundColor: item.cor + "33",
                    },
                  ]}
                  onPress={() => {
                    setSelected(key as Sintoma);
                    setOpen(false);
                    callback?.(key as Sintoma);
                  }}
                >
                  <View style={styles.itemContent}>
                    <Text style={styles.emoji}>{item.emoji}</Text>
                    <Text style={styles.itemText}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    elevation: 2,
  },

  placeholder: {
    color: "#999",
    fontSize: 14,
  },

  selectedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  selectedText: {
    fontSize: 14,
    color: "#333",
  },

  dropdown: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    maxHeight: 220,
    backgroundColor: "#FFF",
    borderRadius: 16,
    elevation: 5,
    zIndex: 100,
    paddingVertical: 4,
  },

  overlay: {
    position: "absolute",
    top: -1000,
    bottom: -1000,
    left: -1000,
    right: -1000,
  },

  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    fontSize: 14,
    color: "#333",
  },

  emoji: {
    fontSize: 18,
    marginRight: 10,
  },
});