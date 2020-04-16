import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { getFile, editFile } from "../../../../actions/mypage";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Moment from 'moment';

class DocDetail extends Component {
  componentDidMount() {
    this.props.getFile(this.props.auth.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.file !== this.props.file) {
      this.props.getFile(this.props.auth.id);
    }
    return true
  }
  

  render() {
    const idSubmit = (files, allFiles) => {
      allFiles.forEach(f => f.remove());
      files.fxuser = this.props.auth.user.id;
      files.name = 'id';
      this.props.editFile(files);
    };

    const id2Submit = (files, allFiles) => {
      allFiles.forEach(f => f.remove());
      files.fxuser = this.props.auth.user.id;
      files.name = 'id2';
      this.props.editFile(files);
    };

    const resSubmit = (files, allFiles) => {
      allFiles.forEach(f => f.remove());
      files.fxuser = this.props.auth.user.id;
      files.name = 'res';
      this.props.editFile(files);
    };

    const res2Submit = (files, allFiles) => {
      allFiles.forEach(f => f.remove());
      files.fxuser = this.props.auth.user.id;
      files.name = 'res2';
      this.props.editFile(files);
    };

    return (
      <div className="container">
        <div className="row">
          <span>ID 앞</span>
          <img src={this.props.file && this.props.file.doc_photo_id} style={{maxHeight:300,maxWidth:300}} />
          <Dropzone
            inputContent="ID Front"
            maxFiles={1}
            onSubmit={idSubmit}
            styles={{ dropzone: { width: 300, minHeight: 250 } }}
          />
        </div>
        <div className="row">
          <span>
            ID 앞 상태 :
            {this.props.file &&
              ((this.props.file.doc_photo_id_status === "P" && " Pending") ||
                (this.props.file.doc_photo_id_status === "A" && " Approved") ||
                (this.props.file.doc_photo_id_status === "R" && " Reject"))}
          </span>
          <img></img>
        </div>
        <div className="row">
          <span>ID 뒤</span>
          <img src={this.props.file && this.props.file.doc_photo_id_2} style={{maxHeight:300,maxWidth:300}}/>
          <Dropzone
            inputContent="ID Back"
            onSubmit={id2Submit}
            maxFiles={1}
            styles={{ dropzone: { width: 300, minHeight: 250 } }}
          />
        </div>
        <div className="row">
          <span>
            ID 뒤 상태 :
            {this.props.file &&
              ((this.props.file.doc_photo_id_2_status === "P" && " Pending") ||
                (this.props.file.doc_photo_id_2_status === "A" &&
                  " Approved") ||
                (this.props.file.doc_photo_id_2_status === "R" && " Reject"))}
          </span>
          <img></img>
        </div>
        <div className="row">
          <span>여권 앞</span>
          <img
            src={this.props.file && this.props.file.doc_proof_of_residence}
            style={{maxHeight:300,maxWidth:300}}/>
          <Dropzone
            inputContent="Residence Front"
            onSubmit={resSubmit}
            maxFiles={1}
            styles={{ dropzone: { width: 300, minHeight: 250 } }}
          />
        </div>
        <div className="row">
          <span>
            여권 앞 상태 :
            {this.props.file &&
              ((this.props.file.doc_proof_of_residence_status === "P" &&
                " Pending") ||
                (this.props.file.doc_proof_of_residence_status === "A" &&
                  " Approved") ||
                (this.props.file.doc_proof_of_residence_status === "R" &&
                  " Reject"))}
          </span>
        </div>
        <div className="row">
          <span>여권 뒤</span>
          <img
            src={this.props.file && this.props.file.doc_proof_of_residence_2}
            style={{maxHeight:300,maxWidth:300}}/>
          <Dropzone
            inputContent="Residence Back"
            onSubmit={res2Submit}
            maxFiles={1}
            styles={{ dropzone: { width: 300, minHeight: 250 } }}
          />
        </div>
        <div className="row">
          <span>
            여권 뒤 상태 :
            {this.props.file &&
              ((this.props.file.doc_proof_of_residence_2_status === "P" &&
                " Pending") ||
                (this.props.file.doc_proof_of_residence_2_status === "A" &&
                  " Approved") ||
                (this.props.file.doc_proof_of_residence_2_status === "R" &&
                  " Reject"))}
          </span>
        </div>
        <div className="row">
          <span>
            최종 업데이트 시간(dateFormat 변경 예정) :{" "}
            {this.props.file && Moment(this.props.file.updated_at).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  file: state.mypage.file
});

DocDetail = connect(mapStateToProps, { getFile,editFile })(DocDetail);

export default reduxForm({ form: "docDetail" })(DocDetail);
