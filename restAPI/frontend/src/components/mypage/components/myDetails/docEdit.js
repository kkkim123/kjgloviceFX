import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../../../store";
import { getFile, delFile, editFile } from "../../../../actions/mypage";

class DocEdit extends Component {
  componentDidMount() {
    this.props.getFile(this.props.auth.id);
  }

  render() {
    console.log(this.props.file);
    return (
      <div className="container">
          삭제, 수정 구현 예정
        <div className="row">
          <span>ID 앞</span>
          <img src={this.props.file && this.props.file.doc_photo_id}></img>
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
          <img src={this.props.file && this.props.file.doc_photo_id_2}></img>
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
          <img src={this.props.file && this.props.file.doc_proof_of_residence}></img>
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
          <img src={this.props.file && this.props.file.doc_proof_of_residence_2}></img>
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
          <span>최종 업데이트 시간(dateFormat 변경 예정) : {" "}
          {this.props.file && this.props.file.updated_at}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  file: state.mypage.file
});

export default connect(mapStateToProps, { getFile })(DocEdit);
