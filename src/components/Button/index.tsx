interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-action w-full max-w-96 min-w56 text-white px-4 py-2 rounded-lg"
    >
      {text}
    </button>
  );
};
