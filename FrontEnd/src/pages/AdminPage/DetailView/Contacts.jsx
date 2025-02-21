import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMask } from '@react-input/mask';

import {
    EMAIL_PATTERN,
    CONTACT_COMPANY_NAME_PATTERN,
    PHONE_PATTERN,
  } from '../../../constants/constants';
import { formatPhoneNumber } from '../../../utils/formatPhoneNumber';

import Loader from '../../../components/Loader/Loader';

import css from './Contacts.module.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Contacts = () => {
    const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_API_URL}/api/admin/contacts/`, fetcher);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const phoneMaskRef = useMask({ mask: '+380XX XXX XX XX', replacement: { X: /\d/ } });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
      } = useForm({
        mode: 'all',
      });

    useEffect(() => {
        if (data) {
            reset({
                companyName: data.company_name,
                address: data.address,
                email: data.email,
                phone: formatPhoneNumber(data.phone),
            });
        }
    }, [data]);

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        const formattedPhone = values.phone.replace(/\+|\s/g, '');
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_API_URL}/api/admin/contacts/`, {
                company_name: values.companyName,
                address: values.address,
                email: values.email,
                phone: formattedPhone,
            });
            if (response.status === 200) {
                mutate();
                toast.success('Зміни успішно збережені!');
            }
        } catch (error) {
            console.error('Помилка при оновленні контактів:', error);
            toast.error('Помилка! Не вдалося зберегти зміни.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) return <div className={css['error']}>Не вдалося завантажити контактну інформацію.</div>;

    return (
        isLoading
        ?
        <Loader />
        : (
        <div className={css['contacts-container']}>
            <h2 className={css['contacts-title']}>Редагування контактної інформації</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={css['contacts-form']}>
                <div className={css['form-container']}>
                    <label className={css['form-label']}>
                        Назва компанії:
                        <input
                            className={css['form-input']}
                            type="text"
                            name="companyName"
                            {...register('companyName', {
                                required: 'Обов’язкове поле',
                                pattern: {
                                    value: CONTACT_COMPANY_NAME_PATTERN,
                                    message: 'Назва компанії містить недопустимі символи.',
                                  },
                              })}
                        />
                        {errors?.companyName && <p className={css['error-message']}>{errors.companyName?.message}</p>}
                    </label>
                    <label className={css['form-label']}>
                        Адреса:
                        <input
                            className={css['form-input']}
                            type="text"
                            name="address"
                            {...register('address', {
                                required: 'Обов’язкове поле',
                              })}
                        />
                        {errors?.address && <p className={css['error-message']}>{errors.address?.message}</p>}
                    </label>
                    <label className={css['form-label']}>
                        Email:
                        <input
                            className={css['form-input']}
                            type="email"
                            name="email"
                            {...register('email', {
                                required: 'Обов’язкове поле',
                                pattern: {
                                    value: EMAIL_PATTERN,
                                    message: 'Введіть коректний email.',
                                  },
                              })}
                        />
                        {errors?.email && <p className={css['error-message']}>{errors.email?.message}</p>}
                    </label>
                    <label className={css['form-label']}>
                        Телефон:
                        <input
                            className={css['form-input']}
                            type="text"
                            name="phone"
                            {...register('phone', {
                                required: 'Обов’язкове поле',
                                pattern: {
                                    value: PHONE_PATTERN,
                                    message: 'Номер телефону має містити 12 цифр.',
                                },
                            })}
                            ref={(e) => {
                                register('phone').ref(e);
                                phoneMaskRef.current = e;
                            }}
                            placeholder="+380XX XXX XX XX"
                        />
                        {errors?.phone && <p className={css['error-message']}>{errors.phone?.message}</p>}
                    </label>
                </div>
                <div className={css['form-buttons']}>
                    <button type="submit" className={css['save-button']} disabled={isSubmitting || !isValid}>
                        {isSubmitting ? 'Збереження...' : 'Зберегти'}
                    </button>
                </div>
            </form>
        </div>
        )
    );
};

export default Contacts;
