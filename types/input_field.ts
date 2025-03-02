export type InputFieldProps = {
    label?: string;
    type: string;
    placeholder: string;
    value: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
