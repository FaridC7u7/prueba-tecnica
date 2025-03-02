import { ButtonProps } from '@/types/button';

export default function ButtonLogin({ text, onClick, className }: ButtonProps) {
    return (
        <button
            type="submit"
            className={`w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
