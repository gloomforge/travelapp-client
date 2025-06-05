import React, { useState } from 'react';

interface UseAuthFormProps<T> {
    initialValues: T;
}

export function useAuthForm<T extends Record<string, string>>({ initialValues }: UseAuthFormProps<T>) {
    const [form, setForm] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleChange = (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        if (errors[field as string]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
        if (apiError) {
            setApiError(null);
        }
    };

    return {
        form,
        setForm,
        errors,
        setErrors,
        isSubmitting,
        setIsSubmitting,
        apiError,
        setApiError,
        handleChange
    };
}

export default useAuthForm; 