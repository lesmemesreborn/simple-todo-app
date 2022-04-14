import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";

interface IToDo {
  text: string;
  completed: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const handleOkay = (): void => {
    if (value.trim())
      setToDos([...toDoList, { text: value, completed: false }]);
    else showError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDos(newToDoList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>МайТуДушка</Text>
      <Text style={styles.subtitleFirst}>A simple ToDo app by rejoyzxc</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Какой у тебя план?"
          value={value}
          onChangeText={e => {
            setValue(e);
            showError(false);
          }}
          style={styles.inputBox}
        />
       <TouchableOpacity style={styles.addButton} onPress={handleOkay}>
      НОВАЯ ЗАДАЧА
      </TouchableOpacity>
      </View>
      {error && (
        <Text style={styles.error}>А где буквы? Введи их, пожалуйста...</Text>
      )}
      <Text style={styles.subtitleSecond}>Что надо сделать:</Text>
      {toDoList.length === 0 && <Text style={styles.noTaskText}>На данный момент задач нет. Придумай что-нибудь с:</Text>}
      {toDoList.map((toDo: IToDo, index: number) => (
        <View style={styles.listItem} key={`${index}_${toDo.text}`}>
          <Text
            style={[
              styles.task,
              { textDecorationLine: toDo.completed ? "line-through" : "none" }
            ]}
          >
            {toDo.text}
          </Text>
          <Button
            title={toDo.completed ? "Completed" : "Complete"}
            onPress={() => toggleComplete(index)}
            color='navy'
          />
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            color="red"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: "center",
    backgroundColor: '#85C1E9',
    flex: 1
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  inputBox: {
    width: 200,
    borderColor: "#154360",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
    backgroundColor: "#5499C7"
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: '#154360',
    letterSpacing: 2
  },
  subtitleFirst: {
    fontSize: 10,
    fontStyle: "italic",
    marginBottom: 40,
  },
  subtitleSecond: {
    fontSize: 20,
    marginBottom: 20,
    color: "#154360"
  },
  noTaskText: {
    fontSize: 10,
    marginBottom: 20,
    fontStyle: "italic"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    marginBottom: 10,
    backgroundColor: "#5499C7",
    textWeight: '300'
  },
  addButton: {
    alignItems: "flex-end",
    backgroundColor: '#5DADE2',
    borderWidth: 1,
    width: 100,
    height: 45,
    textAlign: "center",
    alignContent: "center",
    marginLeft: 10,
    color: "#154360",
    fontWeight: "bold",
    borderRadius: 2,
    paddingTop: 3
  },
  completeButton: {
    alignItems: "flex-end",
    backgroundColor: '#5DADE2',
  },
  task: {
    width: 200,
    textAlign: "center"
  },
  error: {
    color: "crimson"
  }
});