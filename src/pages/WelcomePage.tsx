import { Typography, createTheme, ThemeProvider as div, Link, ThemeProvider } from '@mui/material';
import React from 'react';

export const WelcomePage: React.FC = () => {
  const myTheme = createTheme({
    typography: {
      fontSize: 25,
      h3: {
        fontSize: 40,
      },
    },
  });

  return (
    <div className="welcome-container">
      <h2 className="welcome-header">
        <b>PM App</b> organizes work so teams know what to do, why it matters, and how to get it
        done.
      </h2>
      <ThemeProvider theme={myTheme}>
        <Typography variant="h3" color="primary" align="center">
          Plan
        </Typography>
        <Typography paragraph={true} align="center" color="primary" gutterBottom={true}>
          Break big ideas into manageable chunks of work and share them across teams with user
          stories, tasks, and assignments.
        </Typography>
      </ThemeProvider>
      <h2 className="welcome-information">
        When all the information is collected in one place, the work becomes more visual. And it
        much easier to collaborate.
      </h2>
      <Typography variant="h3" align="center" color="primary" gutterBottom>
        Our team
      </Typography>
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
              <span className="team-lead">Team lead:</span>
              <span className="name">Tatsiana Dashuk</span>
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
              <span className="name">Dina Shchobova</span>
            </Link>
          </div>
        </div>
        <div className="team-member">
          <div className="title link">
            <Link href="https://github.com/Alexivkov" underline="hover" target="blank">
              <div className="avatar alexander"></div>
              <span className="name">Alexander Sivkov</span>
            </Link>
          </div>
        </div>
      </div>
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
          <span>RS School React - free course for everyone</span>
        </Link>
      </div>
    </div>
  );
};
