import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import "../../../../styles/auth/form.css";
import store from "../../../../store";
import { getUser, registDetail } from "../../../../actions/auth";
import _ from "lodash";
import $ from "jquery";

class UserRegEdit2 extends Component {
  state = {
    isEdit: true
  };
  componentDidMount() {
    store.dispatch(getUser());
  }

  renderField = ({
    input,
    placeholder,
    type,
    label,
    readOnly,
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
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  selectField = ({
    input,
    placeholder,
    index,
    label,
    disabled,
    meta: { touched, error }
  }) => {
    const optList =
      this.props.options &&
      JSON.parse(this.props.options[index]).map((opt, i) => {
        return (
          <option value={i} key={i}>
            {opt}
          </option>
        );
      });

    return (
      <div
        className={`form-label-group
          ${touched && error ? "error" : ""}`}
      >
        <label>{label}</label>
        <select {...input} className="form-control" disabled={disabled}>
          <option>{placeholder}</option>
          {optList}
        </select>
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  componentDidUpdate() {
    if (this.props.user && this.state.isEdit && this.props.options) {
      this.props.initialize({
        industry: this.props.user.industry,
        employment_status: this.props.user.employment_status,
        employment_position: this.props.user.employment_position,
        education_level: this.props.user.education_level,
        annual_income: this.props.user.annual_income,
        income_source: this.props.user.income_source,
        trading_experience: this.props.user.trading_experience,
        trading_period: this.props.user.trading_period,
        referral_code: this.props.user.referral_code,
        referral_website: this.props.user.referral_website
      });
      this.setState({
        isEdit: false
      });
    }
  }

  onChange = e => {
    if (e.target.value === "0") {
      $("select[name='trading_period']").attr("disabled", false);
    }
    if (e.target.value === "1") {
      $("select[name='trading_period']").attr("disabled", true);
    }
  };

  onSubmit = formValues => {
    store.dispatch(registDetail(formValues)).then(() => {
      if (this.props.status === 200 || this.props.status === 201) {
        this.setState({
          isEdit: true
        });
        this.props.history.push("/mypage");
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
                      name="industry"
                      type="text"
                      component={this.renderField}
                      label="Industry"
                      placeholder="Industry*"
                    />
                    <Field
                      name="employment_status"
                      component={this.selectField}
                      placeholder="Employment Status*"
                      index="0"
                      label="Employment Status"
                      options={this.props.options}
                    />

                    <Field
                      name="employment_position"
                      component={this.selectField}
                      placeholder="Employment Positions*"
                      index="1"
                      label="Employment Positions"
                      options={this.props.options}
                    />
                    <Field
                      name="education_level"
                      component={this.selectField}
                      placeholder="What is your level of education?*"
                      index="2"
                      label="Education Level"
                      options={this.props.options}
                    />
                    <Field
                      name="referral_code"
                      type="text"
                      component={this.renderField}
                      label="Referral Code"
                      placeholder="Referral Code"
                      readOnly={true}
                    />
                  </div>
                  <div className="col">
                    <Field
                      name="annual_income"
                      component={this.selectField}
                      placeholder="Annual Income*"
                      index="3"
                      label="Annual Income"
                      options={this.props.options}
                    />
                    <Field
                      name="income_source"
                      component={this.selectField}
                      placeholder="Source of Wealth*"
                      index="4"
                      label="Source of Wealth"
                      options={this.props.options}
                    />
                    <Field
                      name="trading_experience"
                      component={this.selectField}
                      placeholder="Trading experience Yes or no"
                      index="5"
                      label="Trading experience"
                      onChange={this.onChange}
                    />
                    <Field
                      name="trading_period"
                      component={this.selectField}
                      placeholder="Trading period*"
                      index="6"
                      label="Trading period"
                      options={this.props.options}
                      disabled={true}
                    />
                    <Field
                      name="referral_website"
                      type="text"
                      component={this.renderField}
                      label="Referral WebSite"
                      placeholder="Referral WebSite"
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
                    Save and Edit
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
  options: state.mypage.userOption,
  status: state.auth.msg
});

UserRegEdit2 = connect(mapStateToProps, { registDetail })(UserRegEdit2);

export default reduxForm({
  form: "userRegEdit"
})(UserRegEdit2);
