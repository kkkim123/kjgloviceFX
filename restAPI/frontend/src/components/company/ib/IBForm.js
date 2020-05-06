import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { addIb } from "../../../actions/mypage";
import "../../../styles/auth/form.css";
import store from "../../../store";

class IBForm extends Component {
  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div
        className={`form-label-group
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

  onSubmit = formValues => {
    switch (formValues.send_report) {
      case 'Y':
      case 'y':
      case "yes":
      case 'YES':
        formValues.send_report = 'Y'
        break;
      case 'N':
      case 'n':
      case "no":
      case 'NO':
        formValues.send_report = 'N'
        break;
      default:
        formValues.send_report = 'Y'
        break;
    }
    store.dispatch(addIb(formValues)).then(()=>{
      if (this.props.status === 201) {
        alert('자세한 내용은 My Page에서 확인 가능합니다.')
        this.props.history.push("/main");
      } else {
        alert("확인 후 다시 신청해주세요.");
      }
    });
  };

  render() {
    if (!this.props.auth.token && !this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <section className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title mb-5">Introducing Broker</h5>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="ib_name"
                    type="text"
                    component={this.renderField}
                    placeholder="IB Name*"
                    validate={required}
                  />
                  <Field
                    name="email"
                    type="text"
                    component={this.renderField}
                    placeholder="Email*"
                    validate={required}
                  />
                  <Field
                    name="send_report"
                    type="text"
                    component={this.renderField}
                    placeholder="Do you want to get a report? ( Y or N )*"
                    validate={required}
                  />
                  <Field
                    name="ib_website"
                    type="text"
                    component={this.renderField}
                    placeholder="IB WebSite URL"
                  />                  
                  <button
                    className="btn btn-lg btn-primary btn-block mt-10"
                    type="submit"
                  >
                    Become Introducing Broker
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

const required = value => (value ? undefined : "Required");

const mapStateToProps = state => ({
  auth: state.auth,
  status: state.mypage.msg
});

IBForm = connect(mapStateToProps, { addIb })(IBForm);

export default reduxForm({
  form: "ibForm"
})(IBForm);
