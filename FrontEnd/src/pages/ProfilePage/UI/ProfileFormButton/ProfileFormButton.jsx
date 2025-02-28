import { useContext } from 'react';
import { DirtyFormContext } from '../../../../context/DirtyFormContext';

import css from './ProfileFormButton.module.css';
import {Spin} from 'antd';



const ProfileFormButton = ({isSaving, percent}) => {
  const { formIsDirty } = useContext(DirtyFormContext);
  return (
    <div className={css['submit-button__container']}>
      <button
        className={css['submit-button']}
        type="submit"
        disabled={!formIsDirty}
      >
          {isSaving ? <Spin percent={percent}/> : 'Зберегти'}
      </button>
    </div>
  );
};

export default ProfileFormButton;
