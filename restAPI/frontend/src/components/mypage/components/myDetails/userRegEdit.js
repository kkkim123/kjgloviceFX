import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import "../../../../styles/auth/form.css";
import store from "../../../../store";
import { getUser, registDetail } from "../../../../actions/auth";
import { CountryDropdown } from "react-country-region-selector";
import _ from "lodash";

class UserRegEdit extends Component {
  state = {
    isEdit: true,
    country: ""
  };

  componentDidMount() {
    store.dispatch(getUser());
  }

  selectCountry = val => {
    this.setState({
      country: val
    });
  };

  inputPhoneNumber = input => {
    let number = input.value.replace(/[^0-9]/g, "");
    let phone = "";

    if (number.length < 4) {
      return number;
    } else if (number.length < 7) {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3);
    } else if (number.length < 11) {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3, 3);
      phone += "-";
      phone += number.substr(6);
    } else {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3, 4);
      phone += "-";
      phone += number.substr(7);
    }
    input.value = phone;
  };

  renderField = ({
    input,
    placeholder,
    type,
    label,
    readOnly,
    keyup,
    maxlength,
    meta: { touched, error }
  }) => {
    return (
      <div
        className={`form-label-group
          ${touched && error ? "error" : ""}`}
      >
        <label>{label}</label>
        <input
          {...input}
          type={type}
          className="form-control"
          placeholder={placeholder}
          readOnly={readOnly}
          onKeyUp={keyup ? this.inputPhoneNumber(input) : null}
          maxLength={maxlength}
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  componentDidUpdate() {
    if (this.props.user && this.state.isEdit) {
      this.props.initialize({
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        address: this.props.user.address,
        postal_code: this.props.user.postal_code,
        city: this.props.user.city,
        birthday: this.props.user.birthday,
        mobile: this.props.user.mobile
      });
      this.setState({
        isEdit: false,
        country: this.props.user.resident_country
      });
    }
  }

  onSubmit = formValues => {
    store.dispatch(registDetail(formValues)).then(() => {
      if (this.props.status === 200 || this.props.status === 201) {
        this.setState({
          isEdit: true
        });
        this.props.history.push("/mypage/user/edit/2");
      } else {
        alert("확인 후 다시 등록해주세요.");
      }
    });
  };

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title mb-5">Edit User Infomation</h5>
                <form
                  className="form-signin text-left row"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <div className="col">
                  <Field
                    name="first_name"
                    type="text"
                    component={this.renderField}
                    label="First Name"
                    placeholder="First Name*"
                  />
                  <Field
                    name="last_name"
                    type="text"
                    component={this.renderField}
                    label="Last Name"
                    placeholder="Last Name*"
                  />
                  <div className="form-label-group">
                    <label>Country of Residence</label>
                    <CountryDropdown
                      value={this.state.country}
                      onChange={val => this.selectCountry(val)}
                      defaultOptionLabel="Country of residence*"
                      classes="form-control"
                    />
                  </div>
                  <Field
                    name="address"
                    type="text"
                    component={this.renderField}
                    label="Street & Number"
                    placeholder="Street & Number*"
                  />
                  </div>
                  <div className="col">
                  <Field
                    name="postal_code"
                    type="text"
                    component={this.renderField}
                    label="Postal/Zip Code"
                    placeholder="Postal/Zip Code*"
                  />
                  <Field
                    name="city"
                    type="text"
                    component={this.renderField}
                    label="City/Town"
                    placeholder="City/Town*"
                  />
                  <Field
                    name="birthday"
                    type="date"
                    component={this.renderField}
                    label="BirthDay"
                    placeholder="Date of Birth*"
                  />
                  <Field
                    name="mobile"
                    type="tel"
                    component={this.renderField}
                    label="Phone Number"
                    placeholder="Your Mobile Phone*"
                    keyup={true}
                    maxlength="13"
                  />
                  </div>
                  <div className="w-100 text-center mt-5 p-gray h5 font-weight-light">
                    <p>
                      If you want to change your password
                      <Link to="/mypage/user/edit/3" className="link">
                        {" "}
                        Click Here
                      </Link>
                    </p>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block mt-10"
                    type="submit"
                  >
                    Save and Next Page
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  status: state.auth.msg
});

UserRegEdit = connect(mapStateToProps, { registDetail })(UserRegEdit);

export default reduxForm({
  form: "userRegEdit"
})(UserRegEdit);
