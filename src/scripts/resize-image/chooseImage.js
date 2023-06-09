import { downloadFile, uploadFile } from "../cloudStorage";
import readFile from "./readFile";
import resizeImage from "./resizeImage";

export async function onChooseImage(
  event,
  setButtonEnabled,
  setImage,
  manualId,
  imgWidth,
  imgHeight
) {
  const file = event.target.files[0];
  const filePath = `titles/${manualId}_${file.name}`;
  const imageFromfile = await readFile(file);
  setButtonEnabled(false);
  const resizedImage = await resizeImage(imageFromfile, imgWidth, imgHeight);
  await uploadFile(resizedImage, filePath);
  setImage(await downloadFile(filePath));
  setButtonEnabled(true);
}
