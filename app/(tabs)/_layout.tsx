// import { Tabs } from "expo-router";
// import Octicons from '@expo/vector-icons/Octicons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import Feather from '@expo/vector-icons/Feather';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// export default function TabsLayout() {
//     return (
//         <Tabs screenOptions={{ headerShown: false, }}>
//             <Tabs.Screen name="todo" options={{
//                 tabBarLabel: "Todo",
//                 tabBarIcon: () => <Octicons name="tasklist" size={24} color="black" />
//             }} />
//             <Tabs.Screen name="create" options={{
//                 tabBarLabel: "Create",
//                 tabBarIcon: () => <FontAwesome name="plus-square-o" size={24} color="black" />
//             }} />
//             <Tabs.Screen name="search" options={{
//                 tabBarLabel: "Search",
//                 tabBarIcon: () => <Feather name="search" size={24} color="black" />
//             }} />
//             <Tabs.Screen name="done" options={{
//                 tabBarLabel: "Done",
//                 tabBarIcon: () => <FontAwesome6 name="square-check" size={24} color="black" />
//             }} />
//         </Tabs>
//     )
// }

import { Tabs } from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const GREY = '#9ca3af';
const BLUE = '#60a5fa';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: BLUE,
            tabBarInactiveTintColor: GREY,
            tabBarStyle: {
                borderTopWidth: 1,
                borderTopColor: '#e5e7eb',
            },
        }}>
            <Tabs.Screen name="todo" options={{
                tabBarLabel: "Todo",
                tabBarIcon: ({ color }) => <Octicons name="tasklist" size={24} color={color} />
            }} />
            <Tabs.Screen name="create" options={{
                tabBarLabel: "Create",
                tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={24} color={color} />
            }} />
            <Tabs.Screen name="search" options={{
                tabBarLabel: "Search",
                tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />
            }} />
            <Tabs.Screen name="done" options={{
                tabBarLabel: "Done",
                tabBarIcon: ({ color }) => <FontAwesome6 name="square-check" size={24} color={color} />
            }} />
        </Tabs>
    )
}