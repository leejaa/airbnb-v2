
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import _ from 'lodash';
import { useDispatch } from "react-redux";
import { toggleShowJoinModal, toggleShowLoginModal } from "../../redux/indexSlice";
import { useCreateUserMutation } from "../../generated/graphql";

type Props = {
};

const validationSchema = yup.object({
    email: yup
        .string()
        .required('X 이메일주소가 필요합니다.')
        .email('X 이메일형식으로 입력해주세요.'),
    name: yup
        .string()
        .required('X 이름을 입력해주세요.')
        .min(1, 'X 1자 이상 입력해주세요'),
    password: yup
        .string().matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?])*.{8,}$/i, 'X 비밀번호 형식이 맞지 않습니다.'),
    password2: yup
        .string()
        .oneOf([yup.ref('password'), null], 'X 비밀번호가 일치하지 않습니다.')
});

const Join: React.FunctionComponent<Props> = ({
}) => {
    const dispatch = useDispatch();
    const [createUser] = useCreateUserMutation();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            password2: '',
        },
        validationSchema,
        onSubmit: async values => {
            setLoading(true);
            try {
                const result = await createUser({
                    variables: {
                        email: values?.email ?? '',
                        name: values?.name ?? '',
                        password: values?.password ?? ''
                    }
                });
                const success = result?.data?.createUser?.success ?? false;
                if (success) {
                    alert('회원가입이 성공했습니다.');
                    dispatch(toggleShowJoinModal({}));
                    dispatch(toggleShowLoginModal({}));
                } else {
                    alert('회원가입이 실패했습니다.');
                    dispatch(toggleShowJoinModal({}));
                }
            } catch (error) {
                console.log('error', error);
                dispatch(toggleShowJoinModal({}));
            } finally {
                setLoading(false);
            }
        },
    });
    return (
        <div className="w-full h-full">
            <form onSubmit={formik.handleSubmit}>
                <div className="w-full h-16 focus:border-white relative mb-6">
                    <div className="w-10 h-8 absolute right-2 top-25">
                        <img src="https://img.icons8.com/cotton/64/000000/secured-letter--v3.png" className="w-full h-full" />
                    </div>
                    <input type="email" id="email" name="email" className="w-full h-full border focus:outline-none focus:border focus:border-green-600" placeholder="이메일주소" onChange={formik.handleChange} value={formik.values.email} />
                </div>
                <div className="w-full h-16 focus:border-white relative mb-6">
                    <div className="w-10 h-8 absolute right-2 top-25">
                        <img src="https://img.icons8.com/plasticine/100/000000/gender-neutral-user--v1.png" />
                    </div>
                    <input type="text" id="name" name="name" className="w-full h-full border focus:outline-none focus:border focus:border-green-600" placeholder="이름" onChange={formik.handleChange} value={formik.values.name} />
                </div>
                <div className="w-full h-16 focus:border-white relative mb-6">
                    <div className="w-10 h-8 absolute right-2 top-22">
                        <img src="https://img.icons8.com/flat_round/100/000000/lock--v1.png" />
                    </div>
                    <input type="password" id="password" name="password" className="w-full h-full border focus:outline-none focus:border focus:border-green-600" placeholder="비밀번호" onChange={formik.handleChange} value={formik.values.password} />
                </div>
                <div className="w-full h-16 focus:border-white relative mb-6">
                    <div className="w-10 h-8 absolute right-2 top-22">
                        <img src="https://img.icons8.com/flat_round/100/000000/lock--v1.png" />
                    </div>
                    <input type="password" id="password2" name="password2" className="w-full h-full border focus:outline-none focus:border focus:border-green-600" placeholder="비밀번호 확인" onChange={formik.handleChange} value={formik.values.password2} />
                </div>
                <div className="w-full h-16 focus:border-white relative mb-6">
                    <div className="text-orange-700">{formik?.errors?.email ?? ''}</div>
                    <div className="text-orange-700">{formik?.errors?.name ?? ''}</div>
                    <div className="text-orange-700">{formik?.errors?.password ?? ''}</div>
                    <div className="text-orange-700">{formik?.errors?.password2 ?? ''}</div>
                </div>
                <div className="w-full h-16 bg-red-500 flex justify-center items-center">
                    <button className="text-white w-full h-full focus:outline-none" type="submit">{loading ? '로딩중' : '가입하기'}</button>
                </div>
            </form>
        </div>
    );
}

export default Join;