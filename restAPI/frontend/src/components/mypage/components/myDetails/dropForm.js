import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addFile } from "../../../../actions/mypage";

class DropForm extends Component {
  render() {

    const handleSubmit = (files, allFiles) => {
      allFiles.forEach(f => f.remove());
      files.fxuser = this.props.auth.user.id;
      this.props.addFile(files);
      this.props.history.push("/mypage");
    };

    return (
      <div className="container my-5">
        <Dropzone
          onSubmit={handleSubmit}
          maxFiles={4}
          inputContent="Upload Your Front, Back ID CARD and Passport"
          inputWithFilesContent={files => `${4 - files.length} more`}
          submitButtonDisabled={files => files.length < 4}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

DropForm = connect(mapStateToProps, { addFile })(DropForm);

export default reduxForm({ form: "DropForm" })(DropForm);
