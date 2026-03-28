import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";

type DeleteConfirmButtonProps = {
  entityName?: string;
  onConfirm: () => Promise<void> | void;
  children?: React.ReactNode;
};

export const DeleteConfirmButton: React.FC<DeleteConfirmButtonProps> = ({
  entityName = "this item",
  onConfirm,
  children = "Delete",
}) => {
  const handleClick = () => {
    Modal.confirm({
      title: (
        <>
          Delete <strong>{entityName}</strong>?
        </>
      ),
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          Are you sure you want to delete <strong>{entityName}</strong>? <br />
          This action cannot be undone.
        </>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        await onConfirm();
      },
    });
  };

  return (
    <Button danger onClick={handleClick}>
      {children}
    </Button>
  );
};
