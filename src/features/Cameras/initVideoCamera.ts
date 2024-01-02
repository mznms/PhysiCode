import { getVideoElement } from "@/utilities/getHTMLElement";

export async function initVideoCamera() {
  const video = getVideoElement();

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
    video.play().catch((e) => {
      console.error("Error playing video: ", e);
    });
  };
}
