import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import {
  Camera,
  CameraType,
  FlashMode,
  CameraRecordingOptions,
  CameraPictureOptions,
  VideoQuality,
} from "expo-camera";
import { useEffect, useState, useRef } from "react";
import colors from "../../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";

const flashModes = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeToIcon = {
  [FlashMode.off]: "flash-off",
  [FlashMode.on]: "flash-on",
  [FlashMode.auto]: "flash-auto",
  [FlashMode.torch]: "highlight",
};

const PostUploadScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const camera = useRef<Camera>(null);

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      setHasPermissions(
        cameraPermission.status === "granted" &&
          microphonePermission.status === "granted"
      );
    };
    getPermission();
  }, []);

  const flipCamera = () => {
    setCameraType((currentCameraType) =>
      currentCameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const flipFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    const nextIndex =
      currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  const takePicture = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }

    const options: CameraPictureOptions = {
      quality: 0.5,
      base64: false,
      skipProcessing: true,
    };

    const result = await camera.current.takePictureAsync(options);
  };

  const startRecording = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }

    const options: CameraRecordingOptions = {
      quality: Camera.Constants.VideoQuality["640:480"], // 2160p, 1080p, 720p, 480p, 640x480p
      maxDuration: 60, // max video duration in seconds
      maxFileSize: 10 * 1024 * 1024, // max video file size in bytes
      mute: false,
    };
    setIsRecording(true);

    try {
      const result = await camera.current.recordAsync(options);
      console.log(result);
    } catch (e) {
      console.log(e)
    }
    setIsRecording(false)

  };

  const stopRecording = () => {
    if (isRecording) {
      camera.current.stopRecording();
      setIsRecording(false);
    }
  };

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }

  if (hasPermissions === false) {
    <Text>No access to the camera</Text>;
  }

  return (
    <View style={styles.page}>
      <Camera
        ref={camera}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flash}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={[styles.buttonsContainer, { top: 25 }]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <Pressable onPress={flipFlash}>
          <MaterialIcons
            name={flashModeToIcon[flash]}
            size={30}
            color={colors.white}
          />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, { bottom: 25 }]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />

        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}
          >
            <View
              style={[
                styles.circle,
                { backgroundColor: isRecording ? colors.accent : colors.white },
              ]}
            />
          </Pressable>
        )}

        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default PostUploadScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.black,
  },
  camera: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    position: "absolute",
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});
