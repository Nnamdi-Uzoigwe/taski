import DateInput from '@/components/create/DateInput';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import { useState } from 'react';
import { Alert, ActivityIndicator, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskStore } from '@/store/taskStore';
import { useRouter } from 'expo-router';

export default function Create() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(new Date());

    const { createTask, isLoading, error, clearError } = useTaskStore();

    const handleCreate = async () => {
        if (!title.trim()) {
            Alert.alert("Missing title", "Please add a title for your task.");
            return;
        }
        const success = await createTask(title.trim(), description.trim(), dueDate);
        if (success) {
            Alert.alert("Task created!");
            setTimeout(() => router.replace("/(tabs)/todo"), 2000);
            setTitle("");
            setDescription("");
            setDueDate(new Date());
        } else {
            Alert.alert("Failed to create task", error ?? "Something went wrong.");
            clearError();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className='px-6 bg-white flex-1'>
                <Header />
                <Text size='xl' weight='regular' className='mt-4'>Add a New Task</Text>

                <View className='flex-1'>
                    <View className='mt-10 flex gap-2'>
                        <Text size='lg' weight='regular' className='text-gray-500'>Title</Text>
                        <TextInput
                            placeholder='Add title of task...'
                            className='border-2 border-gray-500 p-3 rounded-xl text-xl'
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View className='mt-6 flex gap-2'>
                        <Text size='lg' weight='regular' className='text-gray-500'>Description</Text>
                        <TextInput
                            placeholder='Add description of task...'
                            className='border-2 border-gray-500 placeholder:text-gray-500 p-3 rounded-xl text-xl'
                            numberOfLines={4}
                            multiline
                            style={{ height: 120, textAlignVertical: 'top' }}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <View className='my-6 flex gap-2'>
                        <Text size='lg' weight='regular' className='text-gray-500'>Due Date</Text>
                        <DateInput date={dueDate} onChange={setDueDate} />
                    </View>

                    <TouchableOpacity
                        onPress={handleCreate}
                        disabled={isLoading}
                        className='bg-blue-500 p-3 rounded-xl'
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className='text-white text-xl text-center' weight='regular'>Create Task</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}