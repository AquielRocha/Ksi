// Componente Modal
const Modal = ({ open, onClose, children }) => {
  return (
    <div className={`modal ${open ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
