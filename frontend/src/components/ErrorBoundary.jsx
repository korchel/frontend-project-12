import React from 'react';
import { Button } from 'react-bootstrap';

import { Translation } from 'react-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  refresh = () => {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Translation>
          {(t) => (<div className="h-100 d-flex justify-content-center align-items-center">
              <h3>{t('error.somethingWentWrong')}</h3>
              <Button 
                onClick={this.refresh}
                className="text-start rounded"
                variant="secondary"
              >
                {t('error.refreshPage')}
              </Button>
          </div>)}
        </Translation>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
