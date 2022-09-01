import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

import { firebaseConfig } from '../../firebase/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import img from '../../Assets/ponto-de-interrogacao-og.jpg';

const saveCount = 'save';

export const useDataContext = createContext();

export const AuthProvider = (props) => {

    //Códigos para pegar os dados do usuário no banco de dados//
    const [users, setUsers] = useState([]);
    const db = getFirestore(firebaseConfig);
    const useCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(useCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        }

        getUsers();

    }, [])
    //


    const [countColor, setCounterColor] = useState(1);

    //Código para salvar na memória do navegador um valor que determina qual página terá seu link com a cor alterada//

    useEffect(() => {

        let save = JSON.parse(sessionStorage.getItem(saveCount));

        if (save == '' || save == null) {
            setCounterColor(1);
        }

        else {
            setCounterColor(save);
        }


    }, [])

    useEffect(() => {

        sessionStorage.setItem(saveCount, JSON.stringify(countColor))

    }, [countColor])

    //


    //Abaixo os códigos para renderizar a API//
    const [char, setChar] = useState([]);
    const [digimons, setDigimons] = useState([]);

    useEffect(() => {

        axios.get('https://digimon-api.vercel.app/api/digimon').then(response => setChar(response.data));

    }, [])

    //Abaixo coloca na array o número de cada digimon//
    useEffect(()=>{
        let num = 0;
        
        let updateDigimon = char.map((digi)=> {
            num += 1;
            digi.number = num;

            return digi;
        })

        setDigimons(updateDigimon);

    },[char]);
    //


    //Abaixo os estados ara alterar a cor do menu desktop e mobile //
    const [colorList1, setColorlist1] = useState('');
    const [colorList2, setColorlist2] = useState('');
    const [colorList3, setColorlist3] = useState('');
    const [colorList4, setColorlist4] = useState('');


    useEffect(() => {

        setColorlist1(countColor == 1 ? 'var(--middleBlue)' : 'var(--floralWhite)');
        setColorlist2(countColor == 2 ? 'var(--middleBlue)' : 'var(--floralWhite)');
        setColorlist3(countColor == 3 ? 'var(--middleBlue)' : 'var(--floralWhite)');
        setColorlist4(countColor == 4 ? 'var(--middleBlue)' : 'var(--floralWhite)');

    }, [countColor])

    //Abaixo os estados para alterar quando o menu deve aparecer ou não na versão mobile //
    const [showMenu, setShowMenu] = useState(false);

    const [movementMenu, setMovementMenu] = useState('');

    const addShowMenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {

        setMovementMenu(showMenu ? '0' : '-100%');

    }, [showMenu])

    //


    const addCounter = (value) => {
        setCounterColor(value);
    }



    //Função responsável por verificar os dados do usuário e logar no site//
    const [logErr, setLogErr] = useState(false);

    const [showModal, setShowModal] = useState(false);

    //Estado que verifica se o usuário está logado//
    const [userLog, setUserLog] = useState(false);
    //

    //Abaixo os códigos que salva na memória do navegador  para que o usuário não prescise logar novamente ao recarregar a página//
    useEffect(() => {
        let savedLogin = JSON.parse(localStorage.getItem('saveLog'));
        if (savedLogin == '' || savedLogin == null) {
            setUserLog(false);
        }

        else {
            setUserLog(savedLogin);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('saveLog', JSON.stringify(userLog))
    }, [userLog])
    //

    //função que altera o userLog//
    const addUserLog = () => {
        setUserLog(!userLog);
    }
    //

    //Estado que quarda o nome do usuário//
    const [name, setName] = useState('');

    //

    //Salva o nome do usuário no navegador//
    useEffect(() => {
        let savedName = JSON.parse(localStorage.getItem('saveName'));
        setName(savedName);
    }, [])

    useEffect(() => {
        localStorage.setItem('saveName', JSON.stringify(name))
    }, [name])
    //

    //Função que verifica o nome do usuário e o formata caso ele tenha mais que 10 caracteres//
    function reduceName(name) {
        if (name.length > 10) {
            let formatName = '';
            for (let i = 0; i < 8; i++) {
                if (i == 7) {
                    formatName += name[i];
                    formatName += '...'
                }

                else {
                    formatName += name[i];
                }

            }
            setName(formatName);
        }

        else {
            setName(name);
        }
    }

    //

    //Estados e função que armazena a imagem do usuário//
    const [avatar, setAvatar] = useState('');
    //

    useEffect(() => {
        let ava = JSON.parse(localStorage.getItem('avatar'));
        setAvatar(ava)
    }, [])

    useEffect(() => {
        localStorage.setItem('avatar', JSON.stringify(avatar));
    }, [avatar])

    // Função que é responsável por verificar os dados do usuário e loga-lo no site// 
    const [user, setUser] = useState();

    //Função que exibe na tela os dados do usuário após serem alterados//
    function updateUser(data, id) {
        if (id) {
            let users = data.map((user) => ({ ...user.data(), id: user.id }));
            let update = users.filter((user) => { return user.id == id });
            setUser(update);
            setAvatar(JSON.parse(update[0].imageAvatar));
            if (update[0].name.length > 10) {
                reduceName(update[0].name);
            }

            else {
                setName(update[0].name);
            }

        }

        else {
            return;
        }
    }
    //

    const [errorReload, setErrorReload] = useState(false);

    function resetReload() {
        setErrorReload(false);
    }

    useEffect(() => {
        try {
            let userSave = JSON.parse(localStorage.getItem('user_saved'));
            setUser(userSave);
        }

        catch {
            localStorage.clear('user_saved');
            alert('Erro ineperado na página!');
            if (errorReload) {
                setErrorReload(false)
            }

            else {
                setErrorReload(true);
            }

        }


    }, [])

    useEffect(() => {
        if(user){
        let userData = user.map((it) => {
            it.password = '';
            
            return it;
        })

        localStorage.setItem('user_saved', JSON.stringify(userData));
        }
    }, [user])

    function login(email, password, users, e) {
        e.preventDefault()

        let updateUser = users.filter((user) => {

            return user.email == email && user.password == password
        })


        if (updateUser == '') {
            setLogErr(true);
        }

        else {
            let verificationImg = updateUser[0].imageAvatar;
            if(verificationImg.includes('undefined')){
                setAvatar(img);
            }

            else{
                setAvatar(JSON.parse(updateUser[0].imageAvatar));
            }
            setLogErr(false);
            setShowModal(true);
            reduceName(updateUser[0].name);
            setUser(updateUser);
        }

    }
    //


    //Função que deslogar o usuário do site//

    function logOut() {
        setShowModal(false);
        setUserLog(false);
    }

    //

    ///


    return (
        <useDataContext.Provider value={{ colorList1, colorList2, colorList3, colorList4, countColor, addCounter, addShowMenu, movementMenu, char, login, logErr, showModal, userLog, addUserLog, logOut, name, avatar, users, user, errorReload, resetReload, updateUser, digimons }}>{props.children}</useDataContext.Provider>
    )
}

