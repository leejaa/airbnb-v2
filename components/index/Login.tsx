
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import _ from 'lodash';
import { useCreateUserMutation } from "../../app/generated/graphql";
import { useLoginMutation } from "../../generated/graphql";
import { useDispatch } from "react-redux";
import { toggleShowLoginModal } from "../../redux/indexSlice";

type Props = {
};

const validationSchema = yup.object({
    email: yup
        .string()
        .required('X 이메일주소가 필요합니다.')
        .email('X 이메일형식으로 입력해주세요.'),
});

const Login: React.FunctionComponent<Props> = ({
}) => {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async values => {
            setLoading(true);
            try {
                const result = await login({
                    variables: {
                        email: values?.email ?? '',
                        password: values?.password ?? ''
                    }
                });
                const success = result?.data?.login ?? false;
                if (success) {
                    alert('로그인이 성공했습니다.');
                } else {
                    alert('로그인이 실패했습니다.');
                }
                document.cookie = `jid=${result?.data?.login?.refreshToken ?? ''}`;
                dispatch(toggleShowLoginModal({}));
            } catch (error) {
                console.log('error', error);
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
                    <div className="w-10 h-8 absolute right-2 top-22">
                        <img src="https://img.icons8.com/flat_round/100/000000/lock--v1.png" />
                    </div>
                    <input type="password" id="password" name="password" className="w-full h-full border focus:outline-none focus:border focus:border-green-600" placeholder="비밀번호" onChange={formik.handleChange} value={formik.values.password} />
                </div>
                <div className="w-full h-16 focus:border-white relative mb-6">
                    <div className="text-orange-700">{formik?.errors?.email ?? ''}</div>
                </div>
                <div className="w-full h-16 bg-red-500 flex justify-center items-center">
                    <button className="text-white w-full h-full focus:outline-none" type="submit">{loading ? '로딩중' : '로그인'}</button>
                </div>
            </form>
        </div>
    );
}

export default Login;