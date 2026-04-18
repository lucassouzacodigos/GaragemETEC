import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { css } from '../Components/Styles'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Services/FirebaseParams";

export default function SelectPessoa({ onSelect }) {
  const [pessoas, setPessoas] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "pessoas"));

        const lista = snapshot.docs.map(doc => ({
          label: doc.data().nome + " " + doc.data().sobrenome,
          value: doc.id,
        }));

        setPessoas(lista);
      } catch (error) {
        console.log("Erro ao buscar pessoas:", error);
      }
    };

    fetchPessoas();
  }, []);

  return (
    <View style={[styles.container, {width: "90%"}]}>
        <Text style={{paddingLeft:"1%", fontWeight:"bold"}}>Selecione o dono: </Text>
      <Dropdown
        style={css.dropdown}
        data={pessoas}
        labelField="label"
        valueField="value"
        placeholder="Selecione o usuário"
        value={value}
        onChange={(item) => {
          setValue(item.value);

          if (onSelect) {
            onSelect(item.value); // ID da pessoa
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
