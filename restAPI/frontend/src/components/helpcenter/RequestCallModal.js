import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import "../../styles/company/modal.css";
import { sendmail } from "../../actions/auth";


class RequestCallModal extends Component {
  renderField = ({ input, placeholder,  type, meta: { touched, error } }) => {
    return (
      <div
        className={`form-label-group
            ${touched && error ? "error" : ""}`}
      >
        <input
          {...input}
          type={type}
          className="form-control"
          required
          placeholder={placeholder}
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  renderTextarea = ({
    input,
    placeholder,
    type,
    meta: { touched, invalid, error }
  }) => (
    <div
      className={`form-label-group ${touched && invalid ? "has-danger" : ""}`}
    >
      <textarea
        className="form-control"
        {...input}
        placeholder={placeholder}
        rows="5"
        cols="15"
      />
    </div>
  );

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className="form-label-group">
        <input type={type} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    //
    this.props.sendmail(formValues).then(() => {
      if (this.props.status === 201 || this.props.status === 200) {
        alert("Send Success Request Call");
      } else {
        alert("Send Error Request Call");
      }
    });
  };

  render() {
    return this.props.isOpen ? (
      <div className="modal display-block">
        <section className="modal-main">
          <div className="card-body text-cneter p-gray">
            <form id="rqc-form"
              className="form-signin text-left"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="fromemail"
                type="email"
                component={this.renderField}
                placeholder="Your Email *"
              />
              <Field
                name="subject"
                type="text"
                component={this.renderField}
                placeholder="Subject*"
              />
              <Field
                name="content"
                component={this.renderTextarea}
                placeholder="Content"
              />
              <Field
                name="mobile"
                type="text"
                component={this.renderField}
                placeholder="Your Mobile Number *"
              />
              <Field
                name="non_field_errors"
                type="hidden"
                component={this.hiddenField}
              />

              <button
                className="btn btn-lg btn-primary content-center"
                type="submit"
              >
                Request
              </button>
              <button
                className="btn btn-lg btn-primary content-center px-4"
                type="button"
                style={{ backgroundColor: "#959595" }}
                onClick={this.props.close}
              >
                Cancel
              </button>
            </form>
          </div>
        </section>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

RequestCallModal = connect(mapStateToProps, {sendmail})(RequestCallModal);

export default reduxForm({
  form: "RequestCallModal"
})(RequestCallModal);
