import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  title: string;
  icon: string;
  onSelect: (key: string) => void;
}
export default function DalleDropDown({ props }: { props: Props[] }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity onPress={() => Haptics.selectionAsync()}>
          <Feather name="more-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {props.map((item, index) => {
          return (
            <DropdownMenu.Item
              key={index.toString()}
              title={item.title}
              onSelect={() => item.onSelect(item.title)}
            >
              <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon
                ios={{
                  //@ts-ignore
                  name: item.icon,
                  pointSize: 24,
                }}
              />
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
