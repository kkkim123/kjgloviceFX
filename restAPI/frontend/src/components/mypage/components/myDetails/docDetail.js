import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFile, editFile } from "../../../../actions/mypage";
import Moment from "moment";
import store from "../../../../store";
import Modal from "react-modal";
import _ from "lodash";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const buttonStyle = {
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(0, 101, 54)",
  fontWeight: "bold",
  textDecoration: "none"
}

class DocDetail extends Component {
  state = {
    isEdit: true,
    preview_1: false,
    preview_2: false,
    preview_3: false,
    preview_4: false,
    edit_1: false,
    edit_2: false,
    edit_3: false,
    edit_4: false,
  };

  componentDidMount() {
    store.dispatch(getFile(this.props.auth.id));
  }

  componentDidUpdate() {
    if (this.state.isEdit) {
      store.dispatch(getFile(this.props.auth.id));
      this.setState({
        isEdit: false,
      });
    }
  }

  handleOpenPreview1() {this.setState({preview_1: true})}

  handleClosePreview1() {this.setState({preview_1: false})}

  handleOpenPreview2() {this.setState({preview_2: true})}

  handleClosePreview2() {this.setState({preview_2: false})}

  handleOpenPreview3() {this.setState({preview_3: true})}

  handleClosePreview3() {this.setState({preview_3: false})}

  handleOpenPreview4() {this.setState({preview_4: true})}

  handleClosePreview4() {this.setState({preview_4: false})}

  handleOpenEdit1() {this.setState({edit_1: true})}

  handleCloseEdit1() {this.setState({edit_1: false})}

  handleOpenEdit2() {this.setState({edit_2: true})}

  handleCloseEdit2() {this.setState({edit_2: false})}

  handleOpenEdit3() {this.setState({edit_3: true})}

  handleCloseEdit3() {this.setState({edit_3: false})}

  handleOpenEdit4() {this.setState({edit_4: true})}

  handleCloseEdit4() {this.setState({edit_4: false})}

  adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

  renderField = ({ input: { value: omitValue, onChange, onBlur, ...inputProps }, meta: omitMeta, ...props }) => {
    return (
      <div className="form-label-group">
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
    store.dispatch(editFile(formValues)).then(() => {
      if (this.props.status === 200 || this.props.status === 201) {
        if(! _.includes(formValues, "doc_photo_id")) {
          this.handleCloseEdit1();
        }
        if(! _.includes(formValues, "doc_photo_id_2")) {
          this.handleCloseEdit2();
        }
        if(! _.includes(formValues, "doc_proof_of_residence")) {
          this.handleCloseEdit3();
        }
        if(! _.includes(formValues, "doc_proof_of_residence_2")) {
          this.handleCloseEdit4();
        }
        alert("수정하였습니다.")
        this.setState({
          isEdit: true
        })
        this.props.history.push("/mypage");
      } else {
        alert("Please check and register again.");
      }
    });
  };

  render() {
    return (
      <section className="container">
        <div
          className="shadow my-5 py-5 px-4 text-center mx-auto"
          style={{
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            color: "#000000"
          }}
        >
          <div className="text-left mb-5">
            <h3>Know Your Customer</h3>
          </div>
          <div
            className="d-flex justify-content-between "
            style={{
              borderTop: "1px solid #000000",
              color: "#929292",
              fontSize: "1.0rem",
              padding: "0.8rem"
            }}
          >
            <div className="ml-2" style={{ width: "20%" }}>
              <span>Document Type</span>
            </div>
            <div className="ml-2" style={{ width: "20%" }}>
              <span>File</span>
            </div>
            <div className="ml-2" style={{ width: "20%" }}>
              <span>Status</span>
            </div>
            <div className="ml-2" style={{ width: "20%" }}>
              <span>Updated Time</span>
            </div>
            <div className="ml-2" style={{ width: "20%" }}>
              <span>Edit</span>
            </div>
          </div>
          {this.props.file ? (
            <>
              <div
                className="d-flex justify-content-between"
                style={{
                  borderTop: "1px solid #000000",
                  color: "#929292",
                  fontSize: "1.0rem",
                  padding: "0.8rem"
                }}
              >
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>ID Card File 1</span>
                </div>
                <div className="ml-2" style={{ width: "20%" }}>
                  <span>
                    <img
                      src={this.props.file.doc_photo_id}
                      style={{ height: "100px", width: "100%" }}
                      onClick={this.handleOpenPreview1.bind(this)}
                    />
                  </span>
                  <Modal
                    isOpen={this.state.preview_1}
                    onRequestClose={this.handleClosePreview1.bind(this)}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <img src={this.props.file.doc_photo_id} />
                  </Modal>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    {(this.props.file.doc_photo_id_status === "P" &&
                      " Pending") ||
                      (this.props.file.doc_photo_id_status === "A" &&
                        " Approved") ||
                      (this.props.file.doc_photo_id_status === "R" &&
                        " Reject")}
                  </span>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    {Moment(this.props.file.doc_photo_id_updated_at).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                  </span>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    <button className="btn rounded-pill" type="button" style={buttonStyle} onClick={this.handleOpenEdit1.bind(this)}>
                      Document Edit
                    </button>
                  </span>
                  <Modal
                    isOpen={this.state.edit_1}
                    onRequestClose={this.handleCloseEdit1.bind(this)}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <div className="card card-signin my-5">
                      <div className="card-body text-center p-gray">
                        <h5 className="card-title mb-5">Edit ID Card File 1</h5>                    
                        <form
                          className="form-signin text-left"
                          onSubmit={this.props.handleSubmit(this.onSubmit)}
                        >
                          <Field
                            name="doc_photo_id"
                            type="file"
                            component={this.renderField}
                          />
                          <button
                            className="btn btn-lg btn-primary btn-block mt-10"
                            type="submit"
                          >
                            Edit
                          </button>
                        </form>
                      </div>
                    </div>
                  </Modal>                  
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{
                  borderTop: "1px solid #000000",
                  color: "#929292",
                  fontSize: "1.0rem",
                  padding: "0.8rem"
                }}
              >
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>ID Card File 2</span>
                </div>
                <div className="ml-2" style={{ width: "20%" }}>
                  <span>
                    <img
                      src={this.props.file.doc_photo_id_2}
                      style={{ height: "100px", width: "100%" }}
                      onClick={this.handleOpenPreview2.bind(this)}
                    />
                  </span>
                  <Modal
                    isOpen={this.state.preview_2}
                    onRequestClose={this.handleClosePreview2.bind(this)}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <img src={this.props.file.doc_photo_id_2} />
                  </Modal>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    {(this.props.file.doc_photo_id_2_status === "P" &&
                      " Pending") ||
                      (this.props.file.doc_photo_id_2_status === "A" &&
                        " Approved") ||
                      (this.props.file.doc_photo_id_2_status === "R" &&
                        " Reject")}
                  </span>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    {Moment(this.props.file.doc_photo_id_2_updated_at).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                  </span>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    <button className="btn rounded-pill" type="button" style={buttonStyle} onClick={this.handleOpenEdit2.bind(this)}>
                      Document Edit
                    </button>
                  </span>
                  <Modal
                    isOpen={this.state.edit_2}
                    onRequestClose={this.handleCloseEdit2.bind(this)}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <div className="card card-signin my-5">
                      <div className="card-body text-center p-gray">
                        <h5 className="card-title mb-5">Edit ID Card File 2</h5>                    
                        <form
                          className="form-signin text-left"
                          onSubmit={this.props.handleSubmit(this.onSubmit)}
                        >
                          <Field
                            name="doc_photo_id_2"
                            type="file"
                            component={this.renderField}
                          />
                          <button
                            className="btn btn-lg btn-primary btn-block mt-10"
                            type="submit"
                          >
                            Edit
                          </button>
                        </form>
                      </div>
                    </div>
                  </Modal>                  
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{
                  borderTop: "1px solid #000000",
                  color: "#929292",
                  fontSize: "1.0rem",
                  padding: "0.8rem"
                }}
              >
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>Residence File 1</span>
                </div>
                <div className="ml-2" style={{ width: "20%" }}>
                  <span>
                    <img
                      src={this.props.file.doc_proof_of_residence}
                      style={{ height: "100px", width: "100%" }}
                      onClick={this.handleOpenPreview3.bind(this)}
                    />
                  </span>
                  <Modal
                    isOpen={this.state.preview_3}
                    onRequestClose={this.handleClosePreview3.bind(this)}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <img src={this.props.file.doc_proof_of_residence} />
                  </Modal>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    {(this.props.file.doc_proof_of_residence_status === "P" &&
                      " Pending") ||
                      (this.props.file.doc_proof_of_residence_status === "A" &&
                        " Approved") ||
                      (this.props.file.doc_proof_of_residence_status === "R" &&
                        " Reject")}
                  </span>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    {Moment(
                      this.props.file.doc_proof_of_residence_updated_at
                    ).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    <button className="btn rounded-pill" type="button" style={buttonStyle} onClick={this.handleOpenEdit3.bind(this)}>
                      Document Edit
                    </button>
                  </span>
                  <Modal
                    isOpen={this.state.edit_3}
                    onRequestClose={this.handleCloseEdit3.bind(this)}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <div className="card card-signin my-5">
                      <div className="card-body text-center p-gray">
                        <h5 className="card-title mb-5">Edit Residence 1</h5>                    
                        <form
                          className="form-signin text-left"
                          onSubmit={this.props.handleSubmit(this.onSubmit)}
                        >
                          <Field
                            name="doc_proof_of_residence"
                            type="file"
                            component={this.renderField}
                          />
                          <button
                            className="btn btn-lg btn-primary btn-block mt-10"
                            type="submit"
                          >
                            Edit
                          </button>
                        </form>
                      </div>
                    </div>
                  </Modal>                  
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{
                  borderTop: "1px solid #000000",
                  color: "#929292",
                  fontSize: "1.0rem",
                  padding: "0.8rem"
                }}
              >
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>Residence File 2</span>
                </div>
                <div className="ml-2" style={{ width: "20%" }}>
                  <span>
                    <img
                      src={this.props.file.doc_proof_of_residence_2}
                      style={{ height: "100px", width: "100%" }}
                      onClick={this.handleOpenPreview4.bind(this)}
                    />
                  </span>
                  <Modal
                    isOpen={this.state.preview_4}
                    onRequestClose={this.handleClosePreview4.bind(this)}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <img src={this.props.file.doc_proof_of_residence_2} />
                  </Modal>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    {(this.props.file.doc_proof_of_residence_2_status === "P" &&
                      " Pending") ||
                      (this.props.file.doc_proof_of_residence_2_status ===
                        "A" &&
                        " Approved") ||
                      (this.props.file.doc_proof_of_residence_2_status ===
                        "R" &&
                        " Reject")}
                  </span>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    {Moment(
                      this.props.file.doc_proof_of_residence_2_updated_at
                    ).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
                <div className="ml-2 my-auto" style={{ width: "20%" }}>
                  <span>
                    <button className="btn rounded-pill" type="button" style={buttonStyle} onClick={this.handleOpenEdit4.bind(this)}>
                      Document Edit
                    </button>
                  </span>
                  <Modal
                    isOpen={this.state.edit_4}
                    onRequestClose={this.handleCloseEdit4.bind(this)}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <div className="card card-signin my-5">
                      <div className="card-body text-center p-gray">
                        <h5 className="card-title mb-5">Edit Residence File 2</h5>                    
                        <form
                          className="form-signin text-left"
                          onSubmit={this.props.handleSubmit(this.onSubmit)}
                        >
                          <Field
                            name="doc_proof_of_residence_2"
                            type="file"
                            component={this.renderField}
                          />
                          <button
                            className="btn btn-lg btn-primary btn-block mt-10"
                            type="submit"
                          >
                            Edit
                          </button>
                        </form>
                      </div>
                    </div>
                  </Modal>                  
                </div>
              </div>
            </>
          ) : (
            <h4>
              <Link to="/mypage/details/document">Upload Your File</Link>
            </h4>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  file: state.mypage.file,
  status: state.mypage.msg
});

DocDetail = connect(mapStateToProps, { getFile, editFile })(DocDetail);

export default reduxForm({ form: "docDetail" })(DocDetail);
