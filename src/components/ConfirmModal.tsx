import Card from "./Card";
import Modal from "./Modal";

type Props = {
  text: string;
  footer: JSX.Element;
};

export default function ConfirmModal({ text, footer }: Props) {
  return (
    <Modal>
      <Card title="Bekräfta">
        <div className="m-2">
          <p className="mb-4">{text}</p>
          {footer}
        </div>
      </Card>
    </Modal>
  );
}
