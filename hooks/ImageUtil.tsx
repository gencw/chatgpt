import { Alert, Linking } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import uuid from "react-native-uuid";

export const saveImageToGallery = async (imageUrl: string) => {
  try {
    // 请求权限
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("权限未授予", "请在设置中允许访问相册权限", [
        { text: "取消", style: "cancel" },
        { text: "去设置", onPress: () => Linking.openSettings() },
      ]);
      return;
    }

    // 检查 documentDirectory 是否为 null
    const documentDirectory = FileSystem.documentDirectory;
    if (!documentDirectory) {
      Alert.alert("错误", "无法访问文件系统");
      return;
    }

    // 生成文件路径
    const fileUri = `${documentDirectory}${uuid.v4()}.png`;

    // 下载图片
    const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);

    // 确保文件保存成功
    if (downloadResult.uri) {
      // 保存到相册
      await MediaLibrary.createAssetAsync(downloadResult.uri);
      Alert.alert("成功", "图片已保存到相册");
    } else {
      Alert.alert("错误", "下载图片失败，未生成文件");
    }
  } catch (error) {
    console.error("保存图片到相册失败:", error);
    Alert.alert("错误", "保存图片失败，请重试");
  }
};

export const handleCopy = async (imageUrl: string) => {
  const fileName = imageUrl.split("/").pop();
  if (!fileName) {
    Alert.alert("错误", "无效的图片链接");
    return;
  }
  let fileUri = FileSystem.documentDirectory + fileName;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUri);
    const base64 = await FileSystem.readAsStringAsync(res.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Clipboard.setImageAsync(base64);
    Alert.alert("成功", "图片已复制到剪贴板");
  } catch (err) {
    Alert.alert("错误", "复制图片失败");
  }
};

export const handleShare = async (imageUrl: string) => {
  if (imageUrl) {
    try {
      await Sharing.shareAsync(imageUrl);
    } catch (error) {
      console.error("分享失败:", error);
      Alert.alert("错误", "分享失败");
    }
  } else {
    Alert.alert("错误", "无效的图片链接");
  }
};
