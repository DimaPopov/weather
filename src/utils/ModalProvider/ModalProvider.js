import {createContext, useState} from "react";

export const Modal = createContext(undefined);

const ModalProvider = ({ children, modalProps = null }) => {
  const [modal, setModal] = useState(modalProps);

  return (
    <Modal.Provider value={{
      modal: modal,
      setModal: setModal
    }}>
      {children}
    </Modal.Provider>
  );
};

export default ModalProvider;
