export type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
    children?: React.ReactNode; // Permite contenido adicional, como iconos
};
