import classNames from 'classnames';
import css from './ImageField.module.css';

const ImageField = (props) => {
    const backgroundImage = {
        background: `url(${props.value}) lightgray 50% / cover no-repeat`,
    };
    return (
        <div className={classNames(css['fields__column'], {[css['fields__column--logo']] : props.name === 'logo_image'})}>
            <div className={css['fields__label']}>
                {props.requredField && <label className={css['fields__label--required']}>*</label>}
                <label
                    className={`${css['fields__label--text']} ${!props.requredField && css['fields__field--notrequired']}`}
                >
                    {props.label}
                </label>
                {props.name === 'banner_image' && props.value &&
                    (<span className={css['upload-file__delete--wrapper']} onClick={() => (props.onDeleteImage(props.name))}>
                        <img className={css['upload-file__delete--trashBin']} src={`${process.env.REACT_APP_PUBLIC_URL}/profilepage/Vectordelete.png`} alt="" />
                        <span className={css['upload-file__delete--text']}>видалити зображення</span>
                    </span>)}
            </div>
            <div>
                <input
                    accept="image/*,.png,.jpg,.jpeg"
                    id={props.name}
                    type={props.inputType ? props.inputType : 'text'}
                    className={css['upload-file__input']}
                    name={props.name}
                    onChange={props.updateHandler}
                    required={(props.requredField) ? 'required' : ''}
                />
                {!props.value &&
                    <label className={css['upload-file__label']} htmlFor={props.name}>
                        <span className={css['upload-file__text']}>Оберіть файл</span>
                    </label>
                }
                {props.name === 'banner_image' && props.value && (
                    <>
                        <div className={css['upload-file__wrapper--banner-page']}>
                            <span className={css['upload-file__banner-image--title']}>
                                Зображення для банера на сторінці профайлу
                            </span>
                            <div className={css['upload-file__banner-image--page']} style={backgroundImage} />
                        </div>
                        <div className={css['upload-file__wrapper--banner-card']}>
                            <span className={css['upload-file__banner-image--title']}>
                                Зображення для карток
                            </span>
                            <div className={css['upload-file__banner-image--card']} style={backgroundImage} />
                        </div>
                    </>
                )}
                {props.name === 'logo_image' && props.value && (
                    <div className={css['upload-file__wrapper--logo']}>
                        <div className={css['upload-file__logo']} style={backgroundImage}/>
                        <span className={css['upload-file__delete--wrapper']} onClick={() => (props.onDeleteImage(props.name))}>
                            <img className={css['upload-file__delete--trashBin']} src={`${process.env.REACT_APP_PUBLIC_URL}/profilepage/Vectordelete.png`} alt="" />
                            <span className={css['upload-file__delete--text']}>видалити логотип</span>
                        </span>
                    </div>
                )}
            </div>
            {props.error &&
                <div className={css['error-message']}>
                    {props.error}
                </div>
            }
        </div>
    );
};

export default ImageField;



