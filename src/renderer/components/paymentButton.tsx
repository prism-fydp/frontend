interface PaymentButtonProps {
  address: string;
}

const DEFAULT_ADDRESS = '0x8df6185d75C17BADbf8Af451daB4eEa47104f0f3';

export default function PaymentButton({ address }: PaymentButtonProps) {
  const openPaymentPage = () => {
    window.electron.ipcRenderer.send(
      'pay',
      address !== '' ? address : DEFAULT_ADDRESS
    );
  };

  return (
    <button type="button" className="payment-button" onClick={openPaymentPage}>
      Pay!
    </button>
  );
}
