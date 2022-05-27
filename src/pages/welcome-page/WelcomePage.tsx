import { Link, Divider } from '@mui/material';
import React from 'react';
import './WelcomePage.scss';
import { useTranslation } from 'react-i18next';

export const WelcomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="welcome-container">
        <div className="welcome-info-box">
          <div className="welcome-text">
            <h4 className="welcome-information">
              <b>{t('welcome.project_name')}</b>
              {t('welcome.project_description')}
            </h4>
            <h4 className="welcome-information plan">{t('welcome.plan_description')}</h4>
            <h4 className="welcome-information">{t('welcome.welcome_information')}</h4>
          </div>
          <div className="welcome-image" />
        </div>
        <Divider>
          <h4 className="welcome-information team">{t('welcome.team')}</h4>
        </Divider>
        <div className="our-team">
          <div className="team-member">
            <div className="title link">
              <Link
                href="https://github.com/taleatg"
                underline="hover"
                target="_blank"
                rel="noreferrer"
              >
                <div className="avatar tatsiana" />
                <span className="team-lead">{t('welcome.team_lead')}</span>
                <span className="name">{t('welcome.tatsiana')}</span>
              </Link>
            </div>
          </div>
          <div className="team-member">
            <div className="title link">
              <Link
                href="https://github.com/dina-shchobova"
                underline="hover"
                target="_blank"
                rel="noreferrer"
              >
                <div className="avatar dina" />
                <span className="name">{t('welcome.dina')}</span>
              </Link>
            </div>
          </div>
          <div className="team-member">
            <div className="title link">
              <Link href="https://github.com/Alexivkov" underline="hover" target="blank">
                <div className="avatar alexander" />
                <span className="name">{t('welcome.alexander')}</span>
              </Link>
            </div>
          </div>
        </div>
        <Divider sx={{ mb: '2em' }} />
        <div className="rs">
          <Link
            className="rs-block"
            href="https://rs.school/react"
            underline="hover"
            color="inherit"
            gutterBottom={true}
            target="_blank"
            rel="noreferrer"
          >
            <img src="./assets/icons/rs-logo.svg" alt="logo" />
            <span>{t('welcome.rs_school')}</span>
          </Link>
        </div>
      </div>
    </>
  );
};
