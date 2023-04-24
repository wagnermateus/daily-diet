import { Pressable, ScrollView, View } from "react-native";
import { Input } from "../../components/Input";
import {
  Container,
  Content,
  DateTime,
  RadioButton,
  RadioButtonLabel,
  RadioButtons,
} from "./styles";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { MealHeader } from "../../components/MealHeader";
import { Button } from "../../components/Button";
import { Text } from "react-native";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StatusBall } from "../../components/StatusBall";

export function DescribeMeal() {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [mealDate, setMealDate] = useState(format(date, "dd.MM.yyyy"));
  const [mealHour, setMealHour] = useState(
    `${hour.getHours()}:${hour.getMinutes()}`
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [isOnTheDiet, setIsOnTheDiet] = useState<boolean>();

  const { COLORS } = useTheme();
  const navigation = useNavigation();

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <MealHeader title="Nova Refeição" />

        <Content>
          <Input label="Nome" height={48} />
          <Input label="Descrição" height={120} />
          <DateTime>
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
                width={153}
                editable={false}
                value={mealHour}
              />
            </Pressable>
          </DateTime>
          <View>
            <RadioButtonLabel>Está dentro da dieta?</RadioButtonLabel>
            <RadioButtons>
              <RadioButton
                onPress={() => setIsOnTheDiet(true)}
                style={
                  isOnTheDiet && {
                    backgroundColor: COLORS.green_light,
                    borderColor: COLORS.green_dark,
                  }
                }
              >
                <StatusBall isOnTheDiet />
                <Text>Sim</Text>
              </RadioButton>
              <RadioButton
                onPress={() => setIsOnTheDiet(false)}
                style={
                  isOnTheDiet === false && {
                    backgroundColor: COLORS.red_light,
                    borderColor: COLORS.red_dark,
                  }
                }
              >
                <StatusBall isOnTheDiet={false} />
                <Text>Não</Text>
              </RadioButton>
            </RadioButtons>
          </View>
          <Button
            title="Cadastrar refeição"
            onPress={() => navigation.navigate("feedback")}
          />
        </Content>
      </Container>
    </ScrollView>
  );
}
