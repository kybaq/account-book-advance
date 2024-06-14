import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function PlacementExample({ isToastOpen }) {
  return (
    <>
      {isToastOpen ? (
        <ToastContainer
          className="p-3"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast>
            <Toast.Header closeButton={true}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">알림</strong>
              <small>지금</small>
            </Toast.Header>
            <Toast.Body>빈 칸을 모두 채워주세요.</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
    </>
  );
}

export default PlacementExample;
