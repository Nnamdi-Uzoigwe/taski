import { View, TouchableOpacity } from 'react-native';
import Text from '../ui/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

interface Props {
  date: Date;
  onChange: (date: Date) => void;
}

export default function DateInput({ date, onChange }: Props) {
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
            if (selectedDate) onChange(selectedDate);
          }}
        />
      )}
    </View>
  );
}