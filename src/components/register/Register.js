import React, { useContext, useState, useEffect } from 'react';

import './register.css';

import ModalLoad from './ModalLoad';

import { useDataContext } from '../context/AuthContext';

import imgGuilmon from '../../Assets/Guilmon_t.png';

import { storage, firebaseConfig } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

function Register() {

    //Estados para definir as mensagens de erro que irão instruir o usuário//
    const [emailError, setEmailError] = useState('');
    const [colorErrorEmail, setColorErrorEmail] = useState(false);

    const [nameError, setNameError] = useState('');
    const [colorErrorName, setColorErrorName] = useState(false);

    const [passError, setPassError] = useState('');
    const [colorErrorPass, setColorErrorPass] = useState(false);

    const [repPassError, setRepPassError] = useState('');
    const [colorRepPassErr, setColorRepPassErr] = useState(false);
    //

    const [userCreate, setUserCreate] = useState(false);
    //Função que adiciona a imagem de avatar do usuário no banco de dados//
    const registerUser = (file, email) => {
        const storageRef = ref(storage, `${email}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                alert('Coloque a imagem na dimensão 130 x 130');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((imgUrl) => {
                    let imageAvatar = JSON.stringify(imgUrl)
                    console.log(imageAvatar);
                    const db = getFirestore(firebaseConfig);
                    const useCollectionRef = collection(db, 'users');
                    addDoc(useCollectionRef, { email, name, password, imageAvatar });
                })
            }
        )

    }
    //    


    // Função que verifica os dados do usuário para a criação da conta no site //
    const { users } = useContext(useDataContext);

    const checkUser = (email, name, pass, repPass, e) => {

        e.preventDefault();

        //Código que verifica o email do usuário//
        setColorErrorEmail(false);
        setEmailError('');
        let textEmail = '';

        let filterUser = users.filter((user) => {
            return email == user.email
        }
        )

        if (filterUser != '') {
            textEmail += ' Esse email já existe-';
            setEmailError(textEmail);
            setColorErrorEmail(true);
        }

        if (email == '') {
            textEmail += ' Digite um email válido- ';
            setEmailError(textEmail);
            setColorErrorEmail(true);
        }

        let atSign = ''

        for (let i of email) {
            if (i == '@') {
                atSign = i
            }
        }

        if (atSign == '') {
            textEmail += ' Deve ter @-';
            setEmailError(textEmail);
            setColorErrorEmail(true);
        }
        //

        //Código que verifica o nome do usuário//
        const alfaMin = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

        const alfaMai = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

        let textName = '';
        let letterSpaceName = '';
        let numAlfa = 0;
        setNameError('');
        setColorErrorName(false);

        if (name.length < 6) {
            textName += ' O nome deve ter no mínimo 6 caracteres-';
            setNameError(textName);
            setColorErrorName(true);
        }

        for (let i of name) {
            for (let x of alfaMin) {
                if (i == x) {
                    numAlfa += 1
                }
            }
        }

        for (let i of name) {
            for (let x of alfaMai) {
                if (x == i) {
                    numAlfa += 1
                }
            }
        }

        if (numAlfa < 4) {
            textName += ' Deve ter pelo menos 4 letras-'
            setNameError(textName);
            setColorErrorName(true);
        }

        for (let i of name) {
            if (i == ' ') {
                letterSpaceName += i
            }
        }

        if (letterSpaceName.length > 0) {
            textName += ' Não deve ter espaços-';
            setNameError(textName);
            setColorErrorName(true)
        }

        //

        //O código abaixo verifica a senha do usuário//
        let textErrorPass = '';
        setPassError('');
        setRepPassError('');
        setColorRepPassErr(false);
        setColorErrorPass(false);
        let letterSpacePass = '';

        for (let i of pass) {
            if (i == ' ') {
                letterSpacePass += i;
            }
        }

        if (pass.length < 6) {
            textErrorPass += ' a senha deve ter no minímo 6 caracteres-';
            setPassError(textErrorPass);
            setColorErrorPass(true);
        }

        if (letterSpacePass.length > 0) {
            textErrorPass += ' a senha não pode ter espaços-';
            setPassError(textErrorPass);
            setColorErrorPass(true);
        }

        if (pass != repPass) {
            setRepPassError('repita a mesma senha criada acima');
            setColorRepPassErr(true);
        }

        if (textErrorPass == '' && pass == repPass && letterSpacePass.length == 0 && textEmail == '' && textName == '' && letterSpaceName.length == 0) {
            if (imgAvatar == '') {
                alert(' Por favor escolha uma imagem para seu avatar');
            }

            else {
                registerUser(imgAvatar, email);
                setUserCreate(true);
            }

        }

        //

    }
    //

    //Estados criados para alterar a borda dos inputs caso de erro//
    const [borderLog, setBorderLog] = useState('');
    const [borderRepPass, setBorderRepPass] = useState('');
    const [borderPass, setBorderPass] = useState('');
    const [borderName, setBorderName] = useState('');
    //

    useEffect(() => {

        setBorderLog(colorErrorEmail ? '1.5px solid red' : '0');
        setBorderRepPass(colorRepPassErr ? '1.5px solid red' : '0');
        setBorderPass(colorErrorPass ? '1.5px solid red' : '0');
        setBorderName(colorErrorName ? '1.5px solid red' : '0');

    }, [colorErrorEmail, colorRepPassErr, colorErrorPass, colorErrorName]);

    //Estados que armazenam os dados inseridos pelo usuário //
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    //
    //Função responsável por inserir uma imagem de avatar para o usuário//
    const [imgAvatar, setImgAvatar] = useState('');


    //

    //Estado que verifica se o usuário está logado//
    const { userLog } = useContext(useDataContext);
    //


    return (
        <div className={userLog ? 'off-register' : 'register'} >
            <form onSubmit={(e) => {
                checkUser(email, name, password, repeatPass, e);
            }}>
                <div className='container'>

                    <div className='inputs'>
                        <div className='title'>
                            <h2>Faça seu registro</h2>
                        </div>

                        <h3>E-mail</h3>
                        <input type="email" required onChange={(e) => {

                            setEmail(e.target.value)

                        }} style={{ border: borderLog }} />

                        <p>{emailError}</p>

                        <h3>Nome</h3>
                        <input type="text" required onChange={(e) => {

                            setName(e.target.value);

                        }} style={{ border: borderName }} />

                        <p>{nameError}</p>

                        <h3>Senha</h3>
                        <input type="password" required onChange={(e) => {

                            setPassword(e.target.value);

                        }} style={{ border: borderPass }} />

                        <p>{passError}</p>

                        <h3>Repita a senha</h3>
                        <input type="password" required onChange={(e) => {

                            setRepeatPass(e.target.value);

                        }} style={{ border: borderRepPass }} />

                        <p>{repPassError}</p>

                        <h3>Imagem do avatar</h3>
                        <input type="file" name='img' onChange={(e) => {

                            const file = e.target.files[0];
                            setImgAvatar(file);

                        }} />

                        <div className={imgAvatar == '' ? 'off-img-avatar ' : 'img-avatar'}>
                            {imgAvatar ? <img src={URL.createObjectURL(imgAvatar)} /> : <></>}
                        </div>

                        <button type='submit'>Registrar</button>

                    </div>
                    <div className='img'><img src={imgGuilmon} /></div>
                </div>
            </form>

            <ModalLoad userCreate={userCreate} setUserCreate={setUserCreate} />
        </div>
    )
}

export default Register;
