import React, { useContext, useState } from 'react';

import './perfil.css';

import { useDataContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import imgX from '../../Assets/xx.png';

import { firebaseConfig, storage } from '../../firebase/firebase';
import { getFirestore, updateDoc, doc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect } from 'react';

import img from '../../Assets/ponto-de-interrogacao-og.jpg';

function Perfil() {

    const { avatar, user, errorReload, resetReload, updateUser } = useContext(useDataContext);

    //Código abaixo verifica se o usuário cadastrou uma imagem ao criar sua conta//
    let verificationImg = avatar;
    let ramdomImg = false;
    if(verificationImg.includes('undefined')){
        ramdomImg = true;
    }
    //

    const [up, setUp] = useState(false);

    const db = getFirestore(firebaseConfig);
    const useCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(useCollectionRef);
            updateUser(data.docs, user ? user[0].id : '');
        }

        getUsers();
    }, [up])

    const navigate = useNavigate()

    const [preview, setPreview] = useState('');
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [modal, setModal] = useState(false);

    const [updateName, setUpdateName] = useState('');

    function handleUpdate(updateName, file) {

        if(updateName.length < 6){
            alert('o nome deve ter no minímo 6 caracteres!');
        }

        else{
           
            if(!file){
                setChange(true);

                updateDoc(doc(db, 'users', user[0].id),{
                    name: updateName
                })

                setUp(!up);
            }

            else{
                //Código para salvar a imagem no banco de dados//
                setChange(true);
                const storageRef = ref(storage, `${user[0].email}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    Snapshot => { },
                    error => { console.log(error) },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((imgURL) => {
                            let Avatar = JSON.stringify(imgURL);
                            setImage(Avatar);
                            updateDoc(doc(db, 'users', user[0].id), {
                                name: updateName,
                                imageAvatar: Avatar,
                            })

                            setUp(!up);
                        })
                    }
                    )
                    //
            }
        }

        


    }

    const [count, setCount] = useState(7);
    const [change, setChange] = useState(false);

    useEffect(() => {
        if (change) {
            if (count < 0) {
                return;
            }

            else {
                setTimeout(() => {
                    setCount(count => count - 1);
                }, 1000)
            }
        }
    }, [count, change])

    return (
        <div className='perfil'>
            <div className='container-perfil'>
                <h2>Avatar</h2>
                <div className='image'><img src={ramdomImg ? img : avatar} alt="avatar" /></div>
                <h3>Nome: </h3>
                <p>{!user ? '' : user[0].name}</p>
                <h3>Email:</h3>
                <p>{!user ? '' : user[0].email}</p>
                <h3>id:</h3>
                <p>{!user ? '' : user[0].id}</p>

                <button onClick={(e) => {

                    e.preventDefault();
                    setModal(true);

                }}>Editar</button>
            </div>

            <div className={modal ? 'modal-perfil' : 'off-modal-perfil'}>

                <div className='container-modal-perfil'>

                    <div className='x' onClick={() => {

                        setModal(false);

                    }}><img src={imgX} alt="closed" /></div>

                    <div className='error' style={{ display: errorReload ? 'block' : 'none' }}><h1>Erro inesperado clique no botão abaixo pra deslogar e fazer o login novamente</h1>
                        <button onClick={() => {
                            resetReload();
                            navigate('/login');
                        }}>Log out</button>
                    </div>

                    <h3>Nome:</h3>
                    <input type="text" placeholder={!user ? '' : user[0].name} onChange={(e) => {

                        setUpdateName(e.target.value);

                    }} />

                    <h3>Avatar:</h3>
                    <img src={!preview && !ramdomImg ? avatar : preview || img} alt="avatar" />
                    <input type="file" onChange={(e) => {

                        let file = URL.createObjectURL(e.target.files[0]);
                        setFile(e.target.files[0]);
                        setPreview(file);
                    }} />

                    <div className='save' onClick={() => {

                        let name = !updateName ? user[0].name : updateName;

                        handleUpdate(name, file);

                    }}>Salvar</div>
                </div>
            </div>

            <div className={change ? 'modal-reload' : 'off-modal-reload'}>
                <div className='container-modal-reload'>
                    <div className={count < 0 ? 'off-container-count' : 'container-count'}>
                        <h3>Fazendo as alterações aguarde...</h3>
                        <div className='circle'></div>
                        <h4>{count}</h4>
                    </div>

                    <div className={count < 0 ? 'reload-sucess' : 'off-reload-sucess'}>
                        <h3>Alterações feitas com sucesso!</h3>
                        <button onClick={() => {

                            setChange(false);
                            setCount(0);

                        }}>Clique aqui</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Perfil;