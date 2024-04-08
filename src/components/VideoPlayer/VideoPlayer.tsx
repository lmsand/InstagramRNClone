import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from '@expo/vector-icons';
import colors from "../../theme/colors";

interface IVideoPlayer {
  uri: string;
  paused: boolean
}

const VideoPlayer = ({ uri, paused }: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);

  return (
    <View>
      <Video
      source={{ uri }}
      style={styles.video}
      resizeMode={ResizeMode.COVER}
      useNativeControls
      isLooping={false}
      shouldPlay={paused}
    />

      {/* <Pressable onPress={() => setMuted(v => !v)} style={styles.muteButton}>
        <Ionicons name={muted ? "volume-mute" : "volume-medium"} size={18} color="white" />
      </Pressable> */}
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    aspectRatio: 1,
  },
  muteButton: {
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 25,

    position: 'absolute',
    bottom: 10,
    right: 10
  }
});
