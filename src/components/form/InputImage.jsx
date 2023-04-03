import { acceptImg } from "../../scripts/helpers";
import imgIcon from "../../assets/images/camera-icon.png";

export default function InputImage({ chooseImage, image, label }) {
  return (
    <label className="choose-img">
      {label}
      <input
        id="upload"
        type="file"
        accept={acceptImg}
        onChange={chooseImage}
      />
      <img htmlFor="upload" src={image ? image : imgIcon} alt="Item Image" />
      <div className="clear"></div>
    </label>
  );
}
