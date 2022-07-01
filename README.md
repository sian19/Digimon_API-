# Digimon_API-
Site feito em React consumindo uma API do digimon e também com um sistema de login e senha.
<h3>Imagens do projeto:</h3>
<img src="https://github.com/sian19/Digimon_API-/blob/master/src/Assets/exemplo_1.jpg"/>
<img src="https://github.com/sian19/Digimon_API-/blob/master/src/Assets/exemplo_2.jpg"/>
<img src="https://github.com/sian19/Digimon_API-/blob/master/src/Assets/exemplo_3.jpg"/>
<img src="https://github.com/sian19/Digimon_API-/blob/master/src/Assets/exemplo_4.jpg"/>
<img src="https://github.com/sian19/Digimon_API-/blob/master/src/Assets/exemplo_5.jpg"/>

<p>Um projeto fullstack feito em React, onde se consumiu uma API pública do digimon. O projeto é um site onde o usuário para ter acesso a o conteúdo da API deve criar uma conta no site e logar em seguida. Depois de logado o usuário vai na aba search e no campo de busca ele pode digitar o nome do digimon e após ele apertar o botão de busca se o digimon que ele digitou o nome existe é exibido em tela para ele um card contendo o nome do digimon,a imagem, o nível e o número dele. Se caso o usuário digitar alguma letra e essa letra for a primeira letra do nome de algum ou vários digimons todos eles são exibidos em tela, dessa forma conforme o usuário for digitando as letras e elas forem correspondendes a algum ou alguns digimons eles vão sendo filtrados e sendo exibidos até o usuário digitar o nome correto de algum digimon e apenas ele ser exibido(nome completo do digimon digitado pelo usuário). No site também ao criar a conta o usuário pode escolher uma imagem de avatar que será exibida no header do site toda vez que ele estiver logado, também é possível alterar o nome e a imagem que o usuário escolheu na aba perfil mas isso somente se o usuário estiver autenticado(logado no site).</p>

<h3>Oque foi usado no desenvolvimento da aplicação:</h3>
<ul>
  <li>O site foi criado usando componentes funcionais para renderizar os componentes em tela.</li>
  <li>Se usou hooks para criar estados para guardar alguns dados, por exemplo oque foi digitado pelo  usuário como login, senha ou nome do digimon.</li>
  <li>Se utilizou a biblioteca react-router-dom para montar as rotas que serão trafegadas pelo o usuário durante a execução da aplicação.</li>
  <li>Se utilizou contextAPI para gerenciar alguns dados de forma global que são usados por outros componentes filhos, como por exemplo o estado users que é responsável por guardar dentro dele os usuários existentes dentro do banco de dados, então eu o coloquei para ser gerenciado de forma global pois outros componentes filhos como o componente login e o register prescisam desse dados, portanto eles devem ser globais para esses componentes terem acesso e trabalhar de forma mais prática.</li>
  <li>Se utilizou o axios para fazer resquest na api e no banco de dados.</li>
  <li>Para o back end se utilizou o firebase que a forma mais rápida e fácil que existe para se trabalhar com banco de dados, autentificação e etc.</li>
  <li>Se utilizou funções que são exclusivas do firebase como getDoc que pega os dados existentes no banco de dados firestore, updateDoc que serve para alterar os dados existentes no banco e o addDoc que serve para adicionar um dado no banco de dados.</li>
  <li>Se utilizou o storage do firebase para fazer o upload das imagens de avatar definidas pelo usuário.</li>
  <li>Se utilizou o localStorage para guardar na memória do navegador o nome e a imagem do avatar do usuário pois no caso dele recarregar a página os dados não sumam e o site não buga as informações do mesmo.</li>
</ul>
