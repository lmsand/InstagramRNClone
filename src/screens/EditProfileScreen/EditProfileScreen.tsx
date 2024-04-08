import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useState } from "react";
import user from "../../assets/data/user.json";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import { useForm, Controller, Control } from "react-hook-form";
import { IUser } from "../../types/models";
import * as ImagePicker from "expo-image-picker";

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserField = "name" | "username" | "website" | "bio";
type IEditableUser = Pick<IUser, IEditableUserField>;

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rules?: object;
}

const CustomInput = ({
  control,
  name,
  label,
  multiline = false,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{ flex: 1 }}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[
                styles.input,
                { borderColor: error ? colors.error : colors.border },
              ]}
              placeholder={label}
              multiline={multiline}
            />
            {error && (
              <Text style={{ color: colors.error }}>
                {error.message || "Error"}
              </Text>
            )}
          </View>
        </View>
      );
    }}
  />
);

const EditProfileScreen = () => {
  const { control, handleSubmit } = useForm<IEditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      website: user.website,
      bio: user.bio,
    },
  });

  const onSubmit = (data: IEditableUser) => {
    console.log("submit", data);
  };

  // Photo picker                           useState<null | ImagePicker.MediaTypeOptions.All>(null);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  const onChangePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedPhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.page}>
      {/* {selectedPhoto && <Image source={{ uri: selectedPhoto}} style={styles.avatar} />} */}
      <Image source={{ uri: selectedPhoto || user.image }} style={styles.avatar} />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change profile photo
      </Text>

      <CustomInput
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username should be more than 3 characters",
          },
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{ pattern: { value: URL_REGEX, message: "Invalid url" } }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          maxLength: {
            value: 200,
            message: "Bio should be less than 200 characters",
          },
        }}
        label="Bio"
        multiline
      />

      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        Submit
      </Text>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 100,
  },
  textButton: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,

    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 10,
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
  },
});
