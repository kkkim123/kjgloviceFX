import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { addFile } from "../../../../actions/mypage";
import store from "../../../../store";
class DocForm extends Component {
  adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

  renderField = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    label,
    meta: omitMeta,
    ...props
  }) => {
    return (
      <div className="form-label-group">
        <label>{label}</label>
        <input
          onChange={this.adaptFileEventToValue(onChange)}
          onBlur={this.adaptFileEventToValue(onBlur)}
          type="file"
          accept=".jpg, .png, .jpeg"
          {...props.input}
          {...props}
        />
      </div>
    );
  };

  onSubmit = formValues => {
    store.dispatch(addFile(formValues)).then(() => {
      if (this.props.status === 201) {
        this.props.history.push("/mypage");
      } else {
        alert("Please check and register again.");
      }
    });
  };

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title mb-5">Know Your Customer</h5>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="doc_photo_id"
                    type="file"
                    component={this.renderField}
                    label="ID Card File 1"
                  />
                  <Field
                    name="doc_photo_id_2"
                    type="file"
                    component={this.renderField}
                    label="ID Card File 2"
                  />
                  <Field
                    name="doc_proof_of_residence"
                    type="file"
                    component={this.renderField}
                    label="Residence File 1"
                  />
                  <Field
                    name="doc_proof_of_residence_2"
                    type="file"
                    component={this.renderField}
                    label="Residence File 2"
                  />
                  <button
                    className="btn btn-lg btn-primary btn-block mt-10"
                    type="submit"
                  >
                    Upload Image File
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
  auth: state.auth,
  status: state.mypage.msg
});

DocForm = connect(mapStateToProps, { addFile })(DocForm);

export default reduxForm({ form: "DocForm" })(DocForm);
