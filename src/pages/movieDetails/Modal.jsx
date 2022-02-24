import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const AppModal = ({isOpen, setIsOpen, children}) => {

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    
    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <div className="flex justify-content-end mb-4 cursor-pointer">
            <i onClick={closeModal} className="fa-solid fa-xmark" style={{fontSize:'25px'}}></i>
          </div>

          {children}
      </Modal>
    )
}