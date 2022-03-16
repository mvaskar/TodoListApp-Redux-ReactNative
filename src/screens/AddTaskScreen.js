import React, { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    Pressable,
    Alert,
    StyleSheet
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from 'react-native-elements';
import { formatDate, convertToSQLiteDate } from "../constants";
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAction, editTaskAction, resetMessages } from './../redux/actions';

const AddTaskScreen = (props) => {

    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.tasksReducer);
    const handleAddTask = (task, dueDate) => dispatch(addTaskAction(task, dueDate));
    const handleEditTask = (id, task, dueDate) => dispatch(editTaskAction(id, task, dueDate));

    const [task, setTask] = useState(props.route.params.task ?? "");
    const [dueDate, setDueDate] = useState(props.route.params.dueDate);
    const [dueDateString, setDueDateString] = useState(formatDate(props.route.params.dueDate));
    const [show, setShow] = useState(false);
    const id = props.route.params.id;
    const today = new Date();

    const showDatePicker = () => {
        setShow(true);
    };

    const hideDatePicker = () => {
        setShow(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setDueDate(date);
        setDueDateString(formatDate(date));
    };

    return (
        <SafeAreaView>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#5A90DC"
                translucent={true}
            />
            <Text style={styles.formHeader}>Task Title</Text>
            <TextInput style={styles.taskTitleField}
                placeholder="Enter the task title"
                maxLength={50}
                keyboardType="default"
                multiline={false}
                onChangeText={
                    (task) => setTask(task)
                }
                value={task}
            ></TextInput>
            <Text style={styles.formHeader}>Due Date</Text>
            <Pressable onPress={() => { showDatePicker() }}>
                <TextInput
                    style={{
                        fontSize: 15,
                        height: 40,
                        marginTop: 10,
                        marginHorizontal: 30,
                        borderWidth: 1,
                        borderRadius: 2,
                        padding: 5,
                        borderColor: "black",
                        color: "black",
                    }}
                    placeholder="Select the due date"
                    keyboardType="default"
                    multiline={false}
                    onChangeText={
                        (dueDate) => setDueDate(dueDate)
                    }
                    value={dueDateString}
                    editable={false}
                    selectTextOnFocus={false}
                    pointerEvents="none"
                ></TextInput>
            </Pressable>

            <Button title="Save"
                style={{
                }}
                containerStyle={{
                    backgroundColor: "#2575e6",
                    borderRadius: 3,
                    marginTop: 25,
                    marginHorizontal: 30,
                }} titleStyle={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "800",
                    width: "100%"
                }}
                onPress={() => {
                    console.log("on press");
                    console.log(dueDate)
                    console.log(convertToSQLiteDate(dueDate))
                    if (task === null || task === "" || dueDate === null || dueDate === undefined) {
                        Alert.alert("Validation failed", "Please fill the form", [{
                            text: "Ok"
                        }])
                    } else {
                        if (id === undefined) {
                            handleAddTask(task, convertToSQLiteDate(dueDate))
                            Alert.alert("Added", "New task has been added successfully", [{
                                text: "Ok",
                                onPress: () => {
                                    props.navigation.pop()
                                }
                            }])
                        } else {
                            handleEditTask(id, task, convertToSQLiteDate(dueDate))
                            Alert.alert("Edited", "Edited successfully", [{
                                text: "Ok",
                                onPress: () => {
                                    props.navigation.pop()
                                }
                            }])
                        }
                    }
                }
                } />
            <DateTimePickerModal
                isVisible={show}
                mode="date"
                date={dueDate ?? today}
                minimumDate={today}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    formHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 25,
        marginHorizontal: 30,
    },
    taskTitleField: {
        fontSize: 15,
        height: 40,
        marginTop: 10,
        marginHorizontal: 30,
        borderWidth: 1,
        borderRadius: 2,
        padding: 5,
        borderColor: "black",
    }
})


export default AddTaskScreen;