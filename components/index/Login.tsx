
import React, { useState, useCallback, useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import _ from 'lodash';
import { GoogleLogin } from 'react-google-login';
import NaverLogin from 'react-naver-login';
import { useCreateUserMutation } from "../../app/generated/graphql";
import { useLoginMutation } from "../../generated/graphql";
import { useDispatch } from "react-redux";
import { toggleShowLoginModal, toggleIsLogin } from "../../redux/indexSlice";

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
    const [googleLoading, setGoogleLoading] = useState(false);
    const [naverLoginLoading, setNaverLoginLoading] = useState(false);
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
                    document.cookie = `jid=${result?.data?.login?.refreshToken ?? ''}`;
                    dispatch(toggleIsLogin({ data: true, userId: result?.data?.login?.user?.id ?? undefined }));
                } else {
                    console.log('로그인 실패');
                }
                dispatch(toggleShowLoginModal({ data: false }));
            } catch (error) {
                console.log('error', error);
            } finally {
                setLoading(false);
            }
        },
    });
    const onSuccessGoogle = useCallback(async (googleResult) => {
        const email = googleResult?.profileObj?.email ?? '';
        const tokenId = googleResult?.tokenId ?? '';
        setGoogleLoading(true);
        try {
            const result = await login({
                variables: {
                    email,
                    password: tokenId,
                    loginType: 'google',
                }
            });
            const success = result?.data?.login ?? false;
            if (success) {
                alert('로그인이 성공했습니다.');
                document.cookie = `jid=${result?.data?.login?.refreshToken ?? ''}`;
                dispatch(toggleIsLogin({ data: true, userId: result?.data?.login?.user?.id ?? undefined }));
            } else {
                console.log('로그인 실패');
            }
            dispatch(toggleShowLoginModal({ data: false }));
        } catch (error) {
            console.log('error', error);
        } finally{
            setGoogleLoading(false);
        }
    }, []);
    const onFailureGoogle = useCallback(() => {
        alert('로그인이 실패했습니다.');
        dispatch(toggleShowLoginModal({ data: false }));
    }, []);
    const onSuccessNaverLogin = useCallback(async (naverResult) => {
        alert('onSuccessNaverLogin');
        const email = naverResult?.email ?? '';
        const id = naverResult?.id ?? '';
        const name = naverResult?.name ?? '';
        setNaverLoginLoading(true);
        try {
            const result = await login({
                variables: {
                    email,
                    password: id,
                }
            });
            const success = result?.data?.login ?? false;
            if (success) {
                alert('로그인이 성공했습니다.');
                document.cookie = `jid=${result?.data?.login?.refreshToken ?? ''}`;
                dispatch(toggleIsLogin({ data: true }));
            } else {
                console.log('로그인 실패');
            }
            dispatch(toggleShowLoginModal({ data: false }));
        } catch (error) {
            console.log('error', error);
        } finally {
            setNaverLoginLoading(false);
        }
    }, [setNaverLoginLoading]);
    const onFailureNaverLogin = useCallback(() => {
        alert('네이버 인증 실패');
        dispatch(toggleShowLoginModal({ data: false }));
    }, []);
    useEffect(() => {
    }, []);
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
                <div className="w-full h-16 bg-red-500 flex justify-center items-center mb-5">
                    <button className="text-white w-full h-full focus:outline-none" type="submit">{loading ? '로딩중' : '로그인'}</button>
                </div>
                <GoogleLogin
                    clientId={process.env.GOOGLE_CLIENT_ID}
                    buttonText={ googleLoading ? '로딩중' : '구글로그인' }
                    onSuccess={onSuccessGoogle}
                    onFailure={onFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                    onAutoLoadFinished={() => null}
                    className="w-full h-16 bg-f2f2f2 flex justify-center items-center mb-5"
                />
                {/* <NaverLogin
                    clientId={process.env.NAVER_CLIENT_ID}
                    callbackUrl={process.env.NAVER_CALLBACK_URL}
                    render={(props) => <div className="w-full h-16 bg-03c75a flex justify-center items-center text-white cursor-pointer" onClick={props.onClick}>{naverLoginLoading ? '로딩중' : '네이버로그인'}</div>}
                    onSuccess={onSuccessNaverLogin}
                    onFailure={onFailureNaverLogin}
                />
                <div id="naver_id_login"></div> */}
            </form>
        </div>
    );
}

export default Login;