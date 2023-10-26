import { useMemo } from 'react';
import PhoneEmail from './PhoneEmail';
import classes from './DataContacts.module.css';

function DataContacts ({ isAuthorized, data }) {
    const profile = useMemo(() => {
        return {
          id: data.id,
          edrpou: data.edrpou,
          founded: data.founded,
          address: data.address,
        };
      }, [data]);

    // TODO: implement logic for getting data from db when it's added on server side

    const companyData = {
        'ЄДРПОУ': profile.edrpou,
        'Рік заснування': profile.founded,
        'Розмір компанії': '',
        'Аудит': ''
    };

    const companyContacts = {
        'Сайт': '',
        'PhoneEmail': <PhoneEmail isAuthorized={isAuthorized} profileId={data.id}/>,
        'Адрес(и)': profile.address,
        'Соціальні мережі': [
            {
                name: 'facebook',
                url: '',
                svgPath:
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" fill="black"/>
                    </svg>
                ,
            },
            {
                name: 'instagram',
                url: '',
                svgPath:
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M13.0286 2.00123C13.7583 1.99843 14.488 2.00576 15.2176 2.02323L15.4116 2.03023C15.6356 2.03823 15.8566 2.04823 16.1236 2.06023C17.1876 2.11023 17.9136 2.27823 18.5506 2.52523C19.2106 2.77923 19.7666 3.12323 20.3226 3.67923C20.831 4.17884 21.2244 4.78318 21.4756 5.45023C21.7226 6.08723 21.8906 6.81423 21.9406 7.87823C21.9526 8.14423 21.9626 8.36623 21.9706 8.59023L21.9766 8.78423C21.9943 9.51342 22.002 10.2428 21.9996 10.9722L22.0006 11.7182V13.0282C22.003 13.758 21.9954 14.4877 21.9776 15.2172L21.9716 15.4112C21.9636 15.6352 21.9536 15.8562 21.9416 16.1232C21.8916 17.1872 21.7216 17.9132 21.4756 18.5502C21.2252 19.218 20.8317 19.8228 20.3226 20.3222C19.8225 20.8306 19.2179 21.224 18.5506 21.4752C17.9136 21.7222 17.1876 21.8902 16.1236 21.9402C15.8566 21.9522 15.6356 21.9622 15.4116 21.9702L15.2176 21.9762C14.4881 21.994 13.7583 22.0017 13.0286 21.9992L12.2826 22.0002H10.9736C10.2438 22.0027 9.5141 21.995 8.78458 21.9772L8.59058 21.9712C8.35319 21.9626 8.11585 21.9526 7.87858 21.9412C6.81458 21.8912 6.08858 21.7212 5.45058 21.4752C4.78326 21.2246 4.17881 20.8311 3.67958 20.3222C3.17062 19.8225 2.7768 19.2178 2.52558 18.5502C2.27858 17.9132 2.11058 17.1872 2.06058 16.1232C2.04944 15.8859 2.03944 15.6486 2.03058 15.4112L2.02558 15.2172C2.00714 14.4877 1.99881 13.758 2.00058 13.0282V10.9722C1.99779 10.2428 2.00512 9.51343 2.02258 8.78423L2.02958 8.59023C2.03758 8.36623 2.04758 8.14423 2.05958 7.87823C2.10958 6.81323 2.27758 6.08823 2.52458 5.45023C2.77595 4.78285 3.17054 4.17868 3.68058 3.68023C4.17947 3.17098 4.78354 2.7768 5.45058 2.52523C6.08858 2.27823 6.81358 2.11023 7.87858 2.06023L8.59058 2.03023L8.78458 2.02523C9.51376 2.0068 10.2432 1.99847 10.9726 2.00023L13.0286 2.00123ZM12.0006 7.00123C11.3381 6.99186 10.6803 7.11425 10.0656 7.3613C9.45077 7.60834 8.89122 7.97511 8.41942 8.44029C7.94762 8.90546 7.57298 9.45977 7.31726 10.071C7.06155 10.6822 6.92987 11.3382 6.92987 12.0007C6.92987 12.6633 7.06155 13.3192 7.31726 13.9305C7.57298 14.5417 7.94762 15.096 8.41942 15.5612C8.89122 16.0264 9.45077 16.3931 10.0656 16.6402C10.6803 16.8872 11.3381 17.0096 12.0006 17.0002C13.3267 17.0002 14.5984 16.4734 15.5361 15.5358C16.4738 14.5981 17.0006 13.3263 17.0006 12.0002C17.0006 10.6741 16.4738 9.40238 15.5361 8.4647C14.5984 7.52701 13.3267 7.00123 12.0006 7.00123ZM12.0006 9.00123C12.3991 8.99389 12.7951 9.06603 13.1654 9.21344C13.5357 9.36085 13.8729 9.58057 14.1574 9.85978C14.4418 10.139 14.6678 10.4721 14.822 10.8396C14.9763 11.2071 15.0558 11.6016 15.0558 12.0002C15.0559 12.3988 14.9766 12.7934 14.8224 13.1609C14.6683 13.5285 14.4424 13.8617 14.1581 14.141C13.8737 14.4203 13.5366 14.6401 13.1663 14.7876C12.796 14.9352 12.4001 15.0074 12.0016 15.0002C11.2059 15.0002 10.4429 14.6842 9.88026 14.1216C9.31765 13.5589 9.00158 12.7959 9.00158 12.0002C9.00158 11.2046 9.31765 10.4415 9.88026 9.87891C10.4429 9.3163 11.2059 9.00023 12.0016 9.00023L12.0006 9.00123ZM17.2506 5.50123C16.928 5.51414 16.6229 5.65138 16.3992 5.8842C16.1755 6.11702 16.0506 6.42736 16.0506 6.75023C16.0506 7.0731 16.1755 7.38344 16.3992 7.61626C16.6229 7.84908 16.928 7.98632 17.2506 7.99923C17.5821 7.99923 17.9 7.86753 18.1345 7.63311C18.3689 7.39869 18.5006 7.08075 18.5006 6.74923C18.5006 6.41771 18.3689 6.09977 18.1345 5.86535C17.9 5.63093 17.5821 5.49923 17.2506 5.49923V5.50123Z" fill="black"/>
                    </svg>
                ,
            },
        ],
        'Співпрацюємо з': ''
    };

    const hasSocialLinks = companyContacts['Соціальні мережі'].some(socialLink => socialLink.url !== null);

    const renderedDataSections = Object.entries(companyData).map(([key, value]) => {
        const className = key === 'ЄДРПОУ' ? `${classes['data-block__field']} ${classes['edrpou']}` : classes['data-block__field'];
        if (value) {
          return (
            <div key={key} className={className}>
              <p className={classes['data-block__field--title']}>{key}</p>
              <p className={classes['data-block__field--value']}>
                {value}
              </p>
            </div>
          );
        }
        return null;
      });

    const hasDataSections = renderedDataSections.some((section) => section !== null);

    const renderedContactSections = Object.entries(companyContacts).map(([key, value]) => {
        if (value) {
          if (key === 'Соціальні мережі' && hasSocialLinks) {
            return (
              <div key={key} className={classes['data-block__field--social-networks']}>
                <p className={classes['data-block__field--title']}>{key}</p>
                  {companyContacts['Соціальні мережі'].map((socialLink, index) => {
                    if (socialLink.url) {
                      return (
                        <a key={index} href={socialLink.url}>
                          {socialLink.svgPath}
                        </a>
                      );
                    }
                  return null;
                })}
              </div>
            );
          } else if (key === 'PhoneEmail') {
            return value;
          } else {
            const className = key === 'Адрес(и)' ? classes['data-block__field--address'] : classes['data-block__field'];
            const valueClassName = key === 'Сайт' ? classes['data-block__field--site'] : classes['data-block__field--value'];
            return (
              <div key={key} className={className}>
                <p className={classes['data-block__field--title']}>{key}</p>
                <p className={valueClassName}>{value}</p>
              </div>
            );
        }
      }
      return null;
    });

    const hasContactSections = renderedContactSections.some((section) => section !== null);

    return (
        <div className={classes['data-wrapper']}>
            <div className={classes['data']}>
                {hasDataSections ? (
                    <div className={classes['data-block']}>
                        {renderedDataSections}
                    </div>
                ) : null}
                {hasContactSections ? (
                    <div className={classes['data-block']}>
                        {renderedContactSections}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default DataContacts;
