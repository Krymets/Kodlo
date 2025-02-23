import { Tooltip } from 'antd';
import Cropper from 'react-easy-crop';
import css from './CropModal.module.css';

const CropModal = ({
  image,
  crop,
  zoom,
  aspect,
  cropShape = 'rect',
  onCropChange,
  onZoomChange,
  onCropComplete,
  onSubmit,
  onCancel,
  tooltipText,
}) => {
  return (
    <Tooltip title={tooltipText} open={true}>
      <div>
        <div className={css['crop-container']}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
            aspect={aspect}
            cropShape={cropShape}
          />
        </div>
        <div className={css['submit-button__container']}>
          <button className={css['submit-button']} onClick={onSubmit}>
            Зберегти
          </button>
          <button className={css['submit-button']} onClick={onCancel}>
            Скасувати
          </button>
        </div>
      </div>
    </Tooltip>
  );
};

export default CropModal;