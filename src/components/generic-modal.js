import React from 'react';
import { Modal } from 'react-bootstrap'

const {
    Header: ModalHeader,
    Title: ModalTitle,
    Body: ModalBody,
} = Modal

const GenericModal = ({
    isOpen,
    toggleModal,
    modalTitle,
    children,
}) => {
    return (
        <Modal
            show={isOpen}
            onHide={toggleModal}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <ModalHeader closeButton>
                <ModalTitle id="example-custom-modal-styling-title">
                    {modalTitle}
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    )
}

export default GenericModal