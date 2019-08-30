import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        //이부분은 옆에눌렀을때 안꺼지는게만듬. 참고로 바깥에 흐린 부분이 parent div인데 default action은 child div들(header, content등등)에 onlclick이 적용돼서 박스안쪽 아무데나 눌르면 전화면으로 넘어가버림.
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
