import { View, Pressable } from "react-native";
import { Input } from "../../components/Input";
import { Container } from "./styles";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format, getHours } from "date-fns";

export function NewMeal() {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [mealDate, setMealDate] = useState(format(date, "dd.MM.yyyy"));
  const [mealHour, setMealHour] = useState(
    `${hour.getHours()}:${hour.getMinutes()}`
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);

  function toggleDatePicker() {
    setShowDatePicker(!showDatePicker);
  }
  function toggleHourPicker() {
    setShowHourPicker(!showHourPicker);
  }
  const handleDateInput = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const { type } = event;

    if (type === "set") {
      toggleDatePicker();
      setDate(selectedDate!);
      setMealDate(format(selectedDate!, "dd.MM.yyyy"));
    } else {
      toggleDatePicker();
    }
  };
  const handleHourInput = (event: DateTimePickerEvent, selectedHour?: Date) => {
    const { type } = event;

    if (type === "set") {
      toggleHourPicker();
      setHour(selectedHour!);
      setMealHour(`${selectedHour!.getHours()}:${selectedHour!.getMinutes()}`);
    } else {
      toggleHourPicker();
    }
  };

  return (
    <Container>
      <Input label="Nome" height={48} />
      <Input label="Descrição" height={120} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={date}
            display="spinner"
            onChange={handleDateInput}
          />
        )}
        <Pressable onPress={toggleDatePicker}>
          <Input
            label="Data"
            height={48}
            width={140}
            editable={false}
            value={mealDate}
          />
        </Pressable>
        {showHourPicker && (
          <DateTimePicker
            mode="time"
            value={hour}
            display="spinner"
            onChange={handleHourInput}
          />
        )}
        <Pressable onPress={toggleHourPicker}>
          <Input
            label="Hora"
            height={48}
            width={140}
            editable={false}
            value={mealHour}
          />
        </Pressable>
      </View>
    </Container>
  );
}
