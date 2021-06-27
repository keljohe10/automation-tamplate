import React from 'react';
import IconButton from 'emerald-ui/lib/IconButton';
import './styles/styles.css';

import Container from 'emerald-ui/lib/Container';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';

const { REACT_APP_URL_CEBROKER='https://cebroker.com', REACT_APP_URL_LAUNCHPAD='https://launchpad.cebroker.com' } = process.env;

const AccessDenied = () => {
  const onClickButtons = (type) => {
    let url;
    switch (type) {
      case 'HOME':
        url = REACT_APP_URL_CEBROKER;
        break;

      case 'SUPPORT':
        url = 'https://help.cebroker.com';
        break;

      case 'LOGOUT':
        url = REACT_APP_URL_LAUNCHPAD;
        break;

      default:
        url = REACT_APP_URL_CEBROKER;
        break;
    }

    window.location.replace(url);
  };
  return (
    <div className='container app-general-styles'>
      <div className='row app-container-access pt-5'>
        <div className='col-12'>
          <h1 className='app-access-denied'>
            <section id='content'>
              <div className='m-n'>
                <div className='margin-center pull-none'>
                  <div className='text-center m-b-lg'>
                    <h1
                      style={{ color: '#717171', fontSize: '38px' }}
                      className='animated'
                    >
                      Access Denied
                    </h1>
                    <h1 className='h text-white animated fadeInDownBig'>:(</h1>
                  </div>
                  <div className='panel panel-default m-t-xl'>
                    <div className='panel-body'>
                      <p className='no-margin-bottom app-icon-access-denied'>
                        You don't have access to this application. It is highly
                        probable your account has been inactivated by an
                        administrator. Please{' '}
                        <a href='https://help.cebroker.com' className='link'>
                          contact us
                        </a>{' '}
                        for further assistance.
                      </p>
                    </div>
                  </div>

                  <Container className='app-container-icons'>
                    <Row>
                      <Col className='sample-col'>
                        <div>
                          <IconButton
                            className='app-shadow-button'
                            ariaLabel='Home'
                            icon='home'
                            title='Home'
                            onClick={(e) => {
                              onClickButtons('HOME');
                            }}
                          />
                        </div>
                        <span className='app-label-icons-access-denied'>
                          Home
                        </span>
                      </Col>
                      <Col className='sample-col'>
                        <div>
                          <IconButton
                            className='app-shadow-button'
                            ariaLabel='Support'
                            icon='support'
                            title='Support'
                            onClick={(e) => {
                              onClickButtons('SUPPORT');
                            }}
                          />
                        </div>
                        <span className='app-label-icons-access-denied'>
                          Support
                        </span>
                      </Col>
                      <Col className='sample-col'>
                        <div>
                          <IconButton
                            className='app-shadow-button'
                            ariaLabel='Logout'
                            icon='power_settings_new'
                            title='Logout'
                            onClick={(e) => {
                              onClickButtons('LOGOUT');
                            }}
                          />
                        </div>
                        <span className='app-label-icons-access-denied'>
                          Logout
                        </span>
                      </Col>
                    </Row>
                  </Container>

                  <div className='text-center copyright'>
                    <small style={{ fontSize: '90%' }} className='text-muted'>
                      CE Broker &copy; {new Date().getFullYear()}
                    </small>
                  </div>
                </div>
              </div>
            </section>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
