import './try.css';

interface TrybuttonProps {
  buttonText: string;
}

function Trybutton({ buttonText }: React.PropsWithChildren<TrybuttonProps>) {
  return (
    <button
      className="text-3xl shadow-solid-primary
                  border-2 border-black py-6 px-4
                  transition-colors ease-out
                  duration-500 text-white
                  bg-gradient-to-r
                  from-gray-900 to-black
                  hover:from-white hover:to-gray-100
                  hover:text-black hover:border-black
                  "
      type="button"
    >
      {buttonText}
    </button>
  );
}

Trybutton.defaultProps = {
  buttonText: '',
};

export default Trybutton;
