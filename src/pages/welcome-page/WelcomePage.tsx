import { Typography, Link, Divider } from '@mui/material';
import React from 'react';
import './WelcomePage.scss';
import { useTranslation } from 'react-i18next';

export const WelcomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="welcome-background" />
      <div className="welcome-container">
        <h2 className="welcome-header">
          <b>{t('welcome.project_name')}</b>
          {t('welcome.project_description')}
        </h2>
        <div className="plan">
          <Typography
            variant="h3"
            color="primary"
            align="center"
            sx={{ fontSize: '40px', color: 'black' }}
          >
            {t('welcome.plan')}
          </Typography>
          <Typography
            paragraph={true}
            align="center"
            color="primary"
            gutterBottom={true}
            sx={{ fontSize: '25px', color: 'black' }}
          >
            {t('welcome.plan_description')}
          </Typography>
        </div>
        <h2 className="welcome-information">{t('welcome.welcome_information')}</h2>
        <Divider>
          <Typography variant="h3" align="center" color="primary" gutterBottom className="team">
            {t('welcome.team')}
          </Typography>
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
                <div className="avatar tatsiana"></div>
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
                <div className="avatar dina"></div>
                <span className="name">{t('welcome.dina')}</span>
              </Link>
            </div>
          </div>
          <div className="team-member">
            <div className="title link">
              <Link href="https://github.com/Alexivkov" underline="hover" target="blank">
                <div className="avatar alexander"></div>
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
            <img src="rs-logo.svg" alt="" />
            <span>{t('welcome.rs_school')}</span>
          </Link>
        </div>
      </div>
    </>
  );
};
