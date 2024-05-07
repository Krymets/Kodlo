import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
import { PropTypes } from 'prop-types';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { useAuth } from '../../hooks';
import css from './ProfileCard.module.css';
import axios from 'axios';
import CategoryBadges from '../MiniComponents/CategoryBadges';
import StarForLike from '../MiniComponents/StarForLike';

const { Paragraph } = Typography;

export default function ProfileCard({ isAuthorized, data }) {
  const { mutate } = useSWRConfig();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(data.is_saved);
  const profile = useMemo(() => {
    return {
      id: data.id,
      personId: data.person,
      name: data.name,
      activities: !data.activities.length
        ? null
        : data.activities.map((activity) => activity.name).join(', '),
      region: data.regions_ukr_display ? data.regions_ukr_display : '',
      categories: data.categories,
      isSaved: data.is_saved,
      commonInfo: data.common_info,
      logo: data.logo_image,
    };
  }, [data]);

  const ownProfile = user && user.id === profile.personId;

  async function sendRequest(url, { arg: data }) {
    return axios.post(url, data);
  }

  const { trigger } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
    sendRequest
  );

  const handleClick = async () => {
    try {
      await trigger(
        { company: profile.id },
        { optimisticData: () => setIsSaved(!isSaved) }
      );
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/profiles/'),
        {
          revalidate: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css['company-card']}>
      <Link
        className={css['company-card__link']}
        to={`/profile-detail/${profile.id}`}
      >
        <div className={css['logo-box']}>
          <img
            className={css.logo}
            src={
              profile.logo ||
              `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/default_logo.png`
            }
            alt="Company logo"
          />
        </div>
        <div className={css.content}>
          <div className={css['content-header']}>
            <div className={css['content-header__activity']}>
              <p className={css['content-header__activity--text']}>
                {profile.activities}
              </p>
            </div>
            <div className={css['content-header__name']}>{profile.name}</div>
            <div className={css['content-header__address']}>
              {profile.region}
            </div>
          </div>
          <div className={css['content__common-info']}>
            <Paragraph ellipsis={{ rows: 3, expandable: false }}>
              {profile.commonInfo}
            </Paragraph>
          </div>
          <div className={css['content__categories']}>
            <CategoryBadges categories={profile.categories} />
          </div>
        </div>
      </Link>
      <StarForLike
        isSaved={isSaved}
        isAuthorized={isAuthorized}
        ownProfile={ownProfile}
        handleClick={handleClick}
      ></StarForLike>
    </div>
  );
}

ProfileCard.propTypes = {
  isAuthorized: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    person: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    region_display: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    common_info: PropTypes.string,
    is_saved: PropTypes.bool.isRequired,
    logo_image: PropTypes.string,
  }).isRequired,
};
