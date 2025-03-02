import { InputFieldProps } from '@/types/input_field';

export default function InputField({ label, type, placeholder, value, name, onChange }: InputFieldProps) {
    return (
        <div>
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
            )}
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={name}
                placeholder={placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        </div>
    );
}
