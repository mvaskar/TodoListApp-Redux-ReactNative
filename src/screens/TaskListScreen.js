import React, { useEffect } from "react";
import {
    SafeAreaView,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    View,
    Alert,
    StyleSheet
} from "react-native";
import { Button } from 'react-native-elements';
import { formatDate } from "../constants";
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTaskAction, resetMessages } from './../redux/actions';

const TaskListScreen = (props) => {
    const { tasks } = useSelector(state => state.tasksReducer);
    const dispatch = useDispatch();
    const fetchTasks = () => dispatch(getTasks());
    const handleDeleteTask = (id) => dispatch(deleteTaskAction(id));
    const handleResetMessages = () => dispatch(resetMessages());

    useEffect(() => {
        fetchTasks()
    }, []);

    taskListHeader = () => {
        return (
            <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#5A90DC", paddingVertical: 10 }}>
                <Text style={{ color: "white", fontWeight: "600", marginHorizontal: 10, fontSize: 14, flex: 1 }}>No.</Text>
                <Text style={{ color: "white", fontWeight: "600", marginHorizontal: 10, fontSize: 14, flex: 4 }}>Title</Text>
                <Text style={{ color: "white", fontWeight: "600", marginHorizontal: 10, fontSize: 14, flex: 7 }}>Due Date</Text>
            </View>
        )
    }

    taskListItem = (index, item) => {
        return (
            <View style={styles.taskItem}>
                <Text style={{ color: "black", fontWeight: "500", fontSize: 14, marginStart: 10, flex: 1 }}>{index + 1}</Text>
                <Text style={{ color: "black", fontWeight: "500", marginStart: 10, fontSize: 14, flex: 4 }}>{item.task}</Text>
                <Text style={{ color: "black", fontWeight: "500", marginStart: 10, fontSize: 14, flex: 3 }}>{formatDate(item.due_date)}</Text>
                <Button title="Edit" style={{ flex: 2, marginStart: 10 }} titleStyle={{
                    color: "white",
                    fontSize: 12,
                }}
                    buttonStyle={{
                        backgroundColor: "#097fed"
                    }}
                    onPress={() => {
                        props.navigation.navigate("AddTask", {
                            pageTitle: "Edit Task",
                            id: item.id,
                            task: item.task,
                            dueDate: new Date(item.due_date)
                        });
                        console.log("on press edit");
                    }
                    }
                />
                <Button title="Delete" style={{ flex: 2, marginStart: 5 }} titleStyle={{
                    color: "white",
                    fontSize: 12,
                }}
                    buttonStyle={{
                        backgroundColor: "red",
                        marginStart: 7
                    }}
                    onPress={() =>
                        Alert.alert("Delete", "Do you want to delete the task?", [{
                            text: "No",
                            onPress: () => {
                                console.log("No")
                            }
                        }, {
                            text: "Yes",
                            onPress: () => {
                                handleDeleteTask(item.id)
                                Alert.alert("Deleted", "Task has been deleted successfully", [{
                                    text: "Ok",
                                }])
                            }
                        }])
                    }
                />
                <View style={{
                    height: 1,
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "#d6d6d6",
                }} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#5A90DC"
                translucent={true}
            />
            <Text style={styles.headerText}>Tasks</Text>
            <FlatList
                style={{ marginTop: 20 }}
                contentContainerStyle={{ paddingBottom: 100 }}
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => taskListItem(index, item)}
                ListHeaderComponent={taskListHeader}
                ListEmptyComponent={
                    <View style={{
                        marginTop: 50,
                        alignItems: "center"
                    }}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                            }}
                            source={require("../assets/to-do-list.png")}
                        />
                        <Text style={{
                            fontSize: 18,
                            color: "black",
                            fontWeight: "600",
                            marginTop: 30,
                        }}>No tasks yet!</Text>
                    </View>
                }
            />
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("AddTask", {
                        pageTitle: "Add Task",
                    });
                }}
                style={{ position: "absolute", margin: 24, bottom: 32, right: 16 }}
            >
                <Image
                    style={{
                        width: 50,
                        height: 50,
                    }}
                    source={require("../assets/plus-icon.png")}
                ></Image>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    headerText: {
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginTop: 24,
        marginStart: 24,
    },
    taskItem: {
        flexDirection: "row",
        backgroundColor: "#f7f7f7",
        padding: 10,
        marginTop: 1,
        flex: 1,
        alignItems: "center"
    }
})

export default TaskListScreen;