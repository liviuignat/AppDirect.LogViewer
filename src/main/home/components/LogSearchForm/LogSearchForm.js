import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { FormTextField, RaisedButton } from 'main/common/components';
export const LOG_SEARCH_FORM = 'LOG_SEARCH_FORM';

@reduxForm({
  form: LOG_SEARCH_FORM,
  fields: ['type'],
})
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {
      fields: {type},
      handleSubmit,
      } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <FormTextField field={type}
             type="text"
             labelText="Type"
            />

            <RaisedButton
              label="Search"
              type="submit"
            />
          </div>
        </form>
      </div>
    );
  }
}
