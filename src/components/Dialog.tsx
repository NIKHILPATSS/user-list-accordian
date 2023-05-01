import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  message: string;
  index: number;
  onCancel: () => void;
  onDelete: (index: number) => void;
}

const DialogBox: React.FC<Props> = ({
  show,
  message,
  index,
  onCancel,
  onDelete,
}: Props) => {
  return ReactDOM.createPortal(
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onDelete(index)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("portal-root") as HTMLElement
  );
};

export default DialogBox;
