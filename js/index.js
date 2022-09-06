alert('hello')

const url = 'http://localhost:3000/monsters'
let page = 1

document.addEventListener('DOMContentLoaded', getData(page))

function getData(page) {
    newURL = url + '/?_limit=50&_page=' + page
    fetch(newURL)
    .then(res=>res.json())
    .then(json=>json.forEach(element => {
        renderMonster(element)
    }))
}

function renderMonster(monster) {
    const container = document.querySelector('#monster-container')
    const div = document.createElement('div')
    div.id = monster.id
    const h2 = document.createElement('h2')
    h2.textContent = monster.name
    const h4 = document.createElement('h4')
    h4.textContent = `Age : ${monster.age}`
    const p = document.createElement('p')
    p.textContent = `Bio: ${monster.description}`
    div.appendchild(h2)
    div.appendchild(h4)
    div.appendchild(p)
    container.append(newdiv)
}

document.addEventListener('DOMContentLoaded', forwardPage)

function forwardPage() {
    const forward = document.querySelector('#forward')
    const container = document.querySelector('#monster-container')
    forward.addEventListener('click', ()=>{
        page = page++
        container.innerHTML = ''
        getData(page)
    })
}

document.addEventListener('DOMContentLoaded', backPage)
function backPage() {
    const back = document.querySelector('#back')
    const container = document.querySelector('#monster-container')
    back.addEventListener('click', ()=>{
        if (page==1) {
            page = page
        } else {
            page = page-1
        }
        container.innerHTML = ''
        getData(page)
    })
}
document.addEventListener('DOMContentLoaded', createForm)

function createForm() {

    const container = document.querySelector('#create-monster')
    const form = document.createElement('form')
    const label1 = document.createElement('label')
    label1.setAttribute('name', 'inputName')
    label1.textContent = 'Name: '
    const name = document.createElement('input')
    name.setAttribute('name', 'inputName')
    name.setAttribute('id', 'inputName')
    const label2 = document.createElement('label')
    label2.setAttribute('name', 'inputAge')
    label2.textContent = 'Age: '
    const age = document.createElement('input')
    age.setAttribute('name', 'inputAge')
    age.setAttribute('id', 'inputAge')
    const label3 = document.createElement('label')
    label3.setAttribute('name', 'inputBio')
    label3.textContent = 'Bio: '
    const bio = document.createElement('input')
    bio.setAttribute('name', 'inputBio')
    bio.setAttribute('id', 'inputBio')
    const btn = document.createElement('button')
    btn.setAttribute('type', 'submit')
    btn.textContent = 'Create'
    form.appendChild(label1)
    form.appendChild(name)
    form.appendChild(label2)
    form.appendChild(age)
    form.appendChild(label3)
    form.appendChild(bio)
    form.appendChild(btn)
    container.appendChild(form)
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        const updateName = document.querySelector('#inputName').value
        const updateAge = document.querySelector('#inputAge').value
        const updateBio = document.querySelector('#inputBio').value
        fetch(URL,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                'name': updateName,
                'age': updateAge,
                'description': updateBio
            })
        }).then(resp=>resp.json())
        form.reset()

        getData(page)
    })
    alert('finished')
}