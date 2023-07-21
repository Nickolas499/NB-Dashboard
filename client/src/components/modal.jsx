

export const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-close">
        <button  type="button" onClick={handleClose}>
          Close
        </button>
        </div>
        
      </section>
    </div>
  );
};