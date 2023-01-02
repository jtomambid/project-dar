import React from "react";
import { Portal, Modal as RNPModal } from "react-native-paper";

const Modal = ({ visible, onDismiss, contentContainerStyle, children, dismissable }) => {
  return (
    <Portal>
      <RNPModal visible={visible} dismissable={dismissable} onDismiss={onDismiss} contentContainerStyle={contentContainerStyle}>
        {children}
      </RNPModal>
    </Portal>
  );
};

export default Modal;
