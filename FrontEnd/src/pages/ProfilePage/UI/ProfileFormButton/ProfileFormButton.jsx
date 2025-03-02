import {useContext, useEffect, useRef, useState} from 'react';
import { DirtyFormContext } from '../../../../context/DirtyFormContext';
import {Spin} from 'antd';

import css from './ProfileFormButton.module.css';




const ProfileFormButton = ({isSaving}) => {
    const [percent, setPercent] = useState(-50);
    const timerRef = useRef();
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setPercent((v) => {
                const nextPercent = v + 5;
                return nextPercent > 150 ? -50 : nextPercent;
            });
        }, 100);
        return () => clearTimeout(timerRef.current);
    }, [percent]);
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
