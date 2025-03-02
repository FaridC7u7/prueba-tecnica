import { ButtonProps } from '@/types/button';

export default function Button({ text, onClick, className, children }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 ${className}`}
        >
            {children}
            {text}
        </button>
    );
}