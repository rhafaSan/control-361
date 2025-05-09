interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({ onChange }: TextFieldProps) => {
  return (
    <div>
      <input
        type="text"
        className={`
         max-w-96  border border-bg-border bg-inherit rounded-lg min-w56 h-11 text-white placeholder:text-white placeholder:opacity-50 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-justify px-4 py-2
        `}
        placeholder="Buscar por placa ou frota"
        onChange={onChange}
      />
    </div>
  );
};
