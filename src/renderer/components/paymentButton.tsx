export default function PaymentButton() {
  const openPaymentPage = () => {
    window.electron.ipcRenderer.send(
      'pay',
      '0x8df6185d75C17BADbf8Af451daB4eEa47104f0f3'
    );
  };

  return (
    <button type="button" className="payment-button" onClick={openPaymentPage}>
      Pay!
    </button>
  );
}
