// import Header from '@/components/ui/Header';
// import { View, Text, TextInput } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Feather from '@expo/vector-icons/Feather';

// export default function Search() {
//     return (
//         <SafeAreaView className='px-6 bg-white flex-1'>
//             {/* Header */}
//             <Header />

//             {/* Search bar */}
//             <View className='relative mt-10'>
//                 <Feather className='absolute top-4 left-3' name="search" size={24} color="#60a5fa" />
//                 <TextInput 
//                     placeholder='Search for tasks...'
//                     className='border-2 border-gray-500 focus:outline-1 outline-blue-500 p-3 pl-10 rounded-xl text-xl'
//                 />
//             </View>

//             {/* Display Search Results */}
//         </SafeAreaView>
//     )
// }




import Header from '@/components/ui/Header';
import { View, TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { tasks } from '@/constants/tasks';
import TodoCard from '@/components/todo/TodoCard';
import Text from '@/components/ui/Text';

export default function Search() {
  const [query, setQuery] = useState('');

  const results = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase()) ||
    task.description.toLowerCase().includes(query.toLowerCase())
  );

  const isEmpty = query.length > 0 && results.length === 0;

  return (
    <SafeAreaView className='px-6 bg-white flex-1'>
      <Header />

      {/* Search bar */}
      <View className='relative mt-10 mb-6'>
        <Feather style={{ position: 'absolute', top: 14, left: 12, zIndex: 1 }} name="search" size={20} color="#60a5fa" />
        <TextInput
          placeholder='Search for tasks...'
          value={query}
          onChangeText={setQuery}
          className='border-2 border-gray-200 focus:border-blue-400 p-3 pl-10 rounded-xl text-xl'
        />
        {query.length > 0 && (
          <Feather
            name="x"
            size={20}
            color="#9ca3af"
            style={{ position: 'absolute', top: 14, right: 12 }}
            onPress={() => setQuery('')}
          />
        )}
      </View>

      {/* No query yet */}
      {query.length === 0 && (
        <View className='flex-1 items-center justify-center gap-2'>
          <Feather name="search" size={48} color="#d1d5db" />
          <Text size="lg" weight="semibold" className='text-gray-300'>Search for a task</Text>
          <Text className='text-gray-300 text-center'>Type a task name or keyword above</Text>
        </View>
      )}

      {/* Not found state */}
      {isEmpty && (
        <View className='flex-1 items-center justify-center gap-2'>
          <Image
            source={require("../../assets/images/empty-task.png")}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
          <Text size="lg" weight="semibold" className='text-gray-300'>No tasks found</Text>
          <Text className='text-gray-300 text-center'>No results for "{query}"</Text>
        </View>
      )}

      {/* Results */}
      {!isEmpty && query.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TodoCard task={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingBottom: 32 }}
        />
      )}
    </SafeAreaView>
  );
}