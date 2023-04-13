import { useState } from "react";
import { View, Text, Picker } from "@tarojs/components";
import "./index.less";

export function TimePicker({ onChange }) {
  const [date, setDate] = useState(new Date());

  function handleDateChange(e) {
    const newDate = new Date(e.detail.value);
    setDate(newDate);
    onChange(newDate);
  }

  function handlePrevDay() {
    const newDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    setDate(newDate);
    onChange(newDate);
  }

  function handleNextDay() {
    const newDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    setDate(newDate);
    onChange(newDate);
  }

  return (
    <View className="time-picker">
      <View className="nav">
        <View
          onClick={handlePrevDay}
          className="at-icon at-icon-chevron-left icon"></View>
      </View>
      <Picker
        mode="date"
        onChange={handleDateChange}
        value={date.toISOString().slice(0, 10)}>
        <View className="picker">
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      </Picker>
      <View className="nav">
        <View
          onClick={handleNextDay}
          className="at-icon at-icon-chevron-right icon"></View>
      </View>
    </View>
  );
}
