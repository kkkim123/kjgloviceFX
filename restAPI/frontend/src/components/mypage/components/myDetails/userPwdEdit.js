
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { editPassword, logout } from "../../../../actions/auth";
import store from "../../../../store";
import "../../../../styles/auth/form.css";

class UserPwdEdit extends Component {
  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div
        className={`form-label-group p3-5
        ${touched && error ? "error" : ""}`}
      >
        <input
          {...input}
          type={type}
          className="form-control"
          placeholder={placeholder}
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className="form-label-group">
        <input type={type} />
        {error && <div className="">{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
      try {
        store.dispatch(editPassword(formValues))
        alert("비밀번호가 변경되었습니다.")
        this.props.logout()
      } catch (error) {
        console.log(error);
        alert("잠시 후 다시 시도해주세요")
      }

  };

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title mb-5">New Password</h5>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="current_password"
                    type="password"
                    component={this.renderField}
                    placeholder="Enter your Current password*"
                    validate={required}
                  />                    
                  <Field
                    name="new_password"
                    type="password"
                    component={this.renderField}
                    placeholder="Enter your New password*"
                    validate={required}
                  />
                  <Field
                    name="re_new_password"
                    type="password"
                    component={this.renderField}
                    placeholder="Confirm your New password*"
                    validate={[passwordsMatch]}
                  />
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Chanage New Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const required = value => (value ? undefined : "Required");

const passwordsMatch = (value, allValues) =>
  value !== allValues.new_password ? "Passwords do not match" : undefined;

const mapStateToProps = state => ({
  status: state.auth.msg
});

UserPwdEdit = connect(mapStateToProps, { editPassword, logout })(UserPwdEdit);

export default reduxForm({
  form: "userPwdEdit"
})(UserPwdEdit);
