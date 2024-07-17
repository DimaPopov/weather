import {useContext} from "react";

import {Modal} from "./ModalProvider";

export const useModal = () => {
  return useContext(Modal);
};
