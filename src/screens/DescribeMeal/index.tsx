import { Alert, Pressable, ScrollView, View } from "react-native";
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
import { mealCreate } from "../../storage/Meal/mealCreate";
import { Loading } from "../../components/Loading";

export function DescribeMeal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [mealDate, setMealDate] = useState(format(date, "dd.MM.yyyy"));
  const [isLoading, setIsLoading] = useState(false);
  const [mealHour, setMealHour] = useState(
    `${hour.getHours()}:${hour.getMinutes()}`
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [isOnTheDiet, setIsOnTheDiet] = useState<boolean>(true);

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

  async function handleAddMeal() {
    if (name.trim().length < 2) {
      return Alert.alert("Cadastrar refeição", "Informe a refeição");
    }
    if (name.trim().length < 2) {
      return Alert.alert("Cadastrar refeição", "Dê uma descrição");
    }
    try {
      setIsLoading(true);
      const newMeal = { name, description, hour: mealHour, isOnTheDiet };

      await mealCreate(newMeal, mealDate);
      navigation.navigate("feedback", { isOnTheDiet });
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível adicionar a refeição!");
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <MealHeader title="Nova Refeição" />

        <Content>
          <Input label="Nome" height={48} onChangeText={setName} />
          <Input label="Descrição" height={120} onChangeText={setDescription} />
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
          <Button title="Cadastrar refeição" onPress={handleAddMeal} />
        </Content>
      </Container>
    </ScrollView>
  );
}
