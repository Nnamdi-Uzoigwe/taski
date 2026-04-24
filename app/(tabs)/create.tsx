import DateInput from '@/components/create/DateInput';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import { Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Create() {
    return (
        <SafeAreaView className='px-6 bg-white flex-1'>
            {/* Header */}
            <Header />
            <Text size='xl' weight='regular' className='mt-4'>Add a New Task</Text>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className='flex-1'>

                    {/* Title */}
                    <View className='mt-10 flex gap-2'>
                        <Text size='lg' weight='regular' className='text-gray-500'>Title</Text>
                        <TextInput 
                            placeholder='Add title of task...'
                            className='border-2 border-gray-500 p-3 rounded-xl text-xl'
                        />
                    </View>

                    {/* Description */}
                    <View className='mt-6 flex gap-2'>
                        <Text size='lg' weight='regular' className='text-gray-500'>Description</Text>
                        <TextInput 
                            placeholder='Add description of task...'
                            className='border-2 border-gray-500 placeholder:text-gray-500 p-3 rounded-xl text-xl'
                            numberOfLines={4}
                            multiline
                            style={{ height: 120, textAlignVertical: 'top' }}
                        />
                    </View>

                    {/* Due Date */}
                    <View className='my-6 flex gap-2'>
                        <Text size='lg' weight='regular' className='text-gray-500'>Due Date</Text>
                        <DateInput />
                    </View>

                    <TouchableOpacity className='bg-blue-500 p-3 rounded-xl'>
                        <Text className='text-white text-xl text-center' weight='regular'>Create Task</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}