import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../ui/Text';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className='border-2 border-gray-500 p-3 text-xl rounded-xl'
      >
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}