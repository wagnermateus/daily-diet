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
import { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { MealHeader } from "../../components/MealHeader";
import { Button } from "../../components/Button";
import { Text } from "react-native";
import { useTheme } from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBall } from "../../components/StatusBall";
import { mealCreate } from "../../storage/Meal/mealCreate";
import { Loading } from "../../components/Loading";
import {
  StoredMealProps,
  mealGetByName,
} from "../../storage/Meal/mealGetByName";
import { mealUpdate } from "../../storage/Meal/mealUpdate";
import { AppError } from "../../utils/AppError";

type RouteParams = {
  mealName: string;
};

export function DescribeMeal() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { mealName } = route?.params as RouteParams;

  const parameterWasPassed = mealName.length > 0;

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };
  const [meal, setMeal] = useState<StoredMealProps>({} as StoredMealProps);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [mealDate, setMealDate] = useState(format(date, "dd.MM.yyyy"));
  const [isLoading, setIsLoading] = useState(false);
  const [mealHour, setMealHour] = useState(
    `${formatTime(hour.getHours())}:${formatTime(hour.getMinutes())}`
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [isOnTheDiet, setIsOnTheDiet] = useState<boolean>(true);

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
      setMealHour(
        `${formatTime(selectedHour!.getHours())}:${formatTime(
          selectedHour!.getMinutes()
        )}`
      );
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
      if (error instanceof AppError) {
        Alert.alert("Cadastrar refeição", error.message);
      } else {
        console.log(error);
        Alert.alert("Não foi possível adicionar a refeição!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchUpdateData() {
    try {
      setIsLoading(true);
      const data = await mealGetByName(mealName!);
      setName(data.data.name);
      setDescription(data.data.description);
      setMealHour(data.data.hour);
      setMealDate(data.date);
      setIsOnTheDiet(data.data.isOnTheDiet);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleUpdateMeal() {
    try {
      setIsLoading(true);
      await mealUpdate(
        { name, description, hour: mealHour, isOnTheDiet },
        mealDate,
        mealName
      );
      navigation.navigate("home");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Editar refeição", error.message);
      } else {
        Alert.alert("Actualizar ");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (parameterWasPassed) {
      fetchUpdateData();
    }
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        {parameterWasPassed ? (
          <MealHeader title="Editar refeição" />
        ) : (
          <MealHeader title="Nova refeição" />
        )}

        <Content>
          <Input label="Nome" height={48} onChangeText={setName} value={name} />
          <Input
            label="Descrição"
            height={120}
            onChangeText={setDescription}
            value={description}
          />
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
          {parameterWasPassed ? (
            <Button title="Salvar alterações" onPress={handleUpdateMeal} />
          ) : (
            <Button title="Cadastrar refeição " onPress={handleAddMeal} />
          )}
        </Content>
      </Container>
    </ScrollView>
  );
}
