import UI from './UI.js'

let UserInterface = new UI()

let create = document.querySelector('#create')
let logo = document.querySelector('#logo')

create.addEventListener('click', (event) => {
        logo.setAttribute('class', 'none')
        create.setAttribute('class','none')
        UserInterface.setupGame()
},{once : true})