import { getVideoElement } from "@/features/Camera/scripts/utils/getHTMLElement";

// カメラが読み込まれていない場合、カメラを読み込みます
export async function getCameraElement(): Promise<HTMLVideoElement> {
  const video = getVideoElement();

  if (video.srcObject) {
    console.log("cached video");
    return video;
  }
  console.log("uncached video");

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  video.srcObject = stream;

  return new Promise((resolve) => {
    /*
  ロードが完了するのを待たないと次のエラーが起こる
  DOMException: The fetching process for the media resource was aborted by the user agent at the user's request.
  */
    video.onloadedmetadata = () => {
      if (video) {
        video.play();
        resolve(video);
      } else {
        throw new Error("video is null");
      }
    };
  });
}
