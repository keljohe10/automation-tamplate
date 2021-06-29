import { useState } from 'react';

const useForm = (initialValues = {}) => {
    const [stateForm, setstateForm] = useState(initialValues);


    const handleChangeInput = ({ target }) => {
        setstateForm({
            ...stateForm,
            [target.name]: target.value,
        });
    };


    const handleChangeInputChecked = ({ target }) => {
        setstateForm({
            ...stateForm,
            [target.name]: target.checked,
        });


    };

    const handleChangeInputDate = (name, date) => {
        setstateForm({
            ...stateForm,
            [name]: date,
        });
    }

    return [stateForm, handleChangeInput, handleChangeInputChecked, handleChangeInputDate];
};

export default useForm;
