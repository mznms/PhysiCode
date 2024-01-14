import { getVideoElement } from "@/features/Cameras/scripts/utils/getHTMLElement";

let video: HTMLVideoElement | null = null;

export async function getCameraElement() {
  if (video !== null) {
    return video;
  }
  video = getVideoElement();

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  video.srcObject = stream;
  /*
  ロードが完了するのを待たないと次のエラーが起こる
  DOMException: The fetching process for the media resource was aborted by the user agent at the user's request.
  */
  video.onloadedmetadata = () => {
    if (video) {
      video.play().catch((e) => {
        console.error("Error playing video: ", e);
      });
    } else {
      throw new Error("video is null");
    }
  };

  return video;
}
