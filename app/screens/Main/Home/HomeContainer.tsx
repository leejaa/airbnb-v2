import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import HomePresenter from "./HomePresenter";

interface props {
    token: string,
}

export default ({ token } : props) => {
  
  return (
    <HomePresenter
    />
  );
};