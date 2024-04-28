const Modal = ({ open, onClose, getItemDetails }) => {
  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {getItemDetails()}
      </div>
    </div>
  );
};

export default Modal;
