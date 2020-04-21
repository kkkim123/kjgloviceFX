import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getIb, editIb } from "../../../actions/mypage";
import "../../../styles/auth/form.css";

class IBEditForm extends Component {
    state = {
        isEdit: true
    }
    componentDidMount() {
        this.props.getIb();
    }
    
  renderField = ({ input, placeholder, type,label,readOnly, meta: { touched, error } }) => {
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
  
  componentDidUpdate() {
      if(this.props.ib && this.state.isEdit) {
        this.props.initialize({ 
            ib_name: this.props.ib.ib_name,
            point: this.props.ib.point,
            email: this.props.ib.email,
            send_report: this.props.ib.send_report,
            ib_website: this.props.ib.ib_website,
            ib_code: this.props.ib.ib_code,
            referralurl: this.props.ib.referralurl,
        });
        this.setState({
            isEdit: false
        })
      }
  }

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
        break;
    }
    this.props.editIb(formValues);
    alert('자세한 내용은 My Page에서 확인 가능합니다.')
    this.props.history.push("/main");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title">Introducing Broker</h5>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="ib_name"
                    type="text"
                    component={this.renderField}
                    placeholder="IB Name*"
                    label="IB Name"
                  />
                  <Field
                    name="point"
                    type="text"
                    component={this.renderField}
                    placeholder="Point*"
                    label="Point"
                  />                                    
                  <Field
                    name="email"
                    type="text"
                    component={this.renderField}
                    placeholder="Email*"
                    label="Email"
                  />
                  <Field
                    name="send_report"
                    type="text"
                    component={this.renderField}
                    placeholder="Do you want to get a report? ( Y or N )*"
                    label="Send Report"
                  />
                  <Field
                    name="ib_website"
                    type="text"
                    component={this.renderField}
                    placeholder="IB WebSite URL"
                    label="IB WebSite URL"
                  />
                  <Field
                    name="ib_code"
                    type="text"
                    component={this.renderField}
                    placeholder="IB Code"
                    label="IB Code"
                    readOnly={true}
                  />
                  <Field
                    name="referralurl"
                    type="text"
                    component={this.renderField}
                    placeholder="Referral URL"
                    label="Referral URL"
                    readOnly={true}
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
      </div>
    );
  }
}

const required = value => (value ? undefined : "Required");

const mapStateToProps = state => ({
  ib: state.mypage.ib,
});

IBEditForm = connect(mapStateToProps, { getIb, editIb })(IBEditForm);

export default reduxForm({
  form: "ibEditForm",
})(IBEditForm);
