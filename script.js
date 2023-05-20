const addBtn = document.getElementById('add-btn')
const title = document.getElementById('title')
const desc = document.getElementById('desc')
const notesContainer = document.getElementById('notes-container')
const search = document.getElementById('search')
const clearBtn = document.getElementById('clear-btn')
const editTitle = document.getElementById('edit-title')
const editDesc = document.getElementById('edit-desc')
const saveBtn = document.getElementById('save-btn')
const addAlert = document.getElementById('add-alert')
const saveAlert = document.getElementById('save-alert')
const notes = JSON.parse(localStorage.getItem('notes')) || []



addBtn.addEventListener('click',()=>{
    if(title.value==""){
        addAlert.classList.add('text-danger')
        addAlert.innerHTML="Title is empty !!";
    }else if(desc.value==""){
        addAlert.classList.add('text-danger')
        addAlert.innerHTML="Description is empty !!";
    }else{
        let note = {
            title:title.value,
            desc:desc.value,
        }
        if(checkNote(note)){
            alert("Note is already present")
        }else{
            pushNote(note)
            addNote(note)
            title.value=""
            desc.value=""
            addAlert.classList.remove('text-danger')
            addAlert.classList.add('text-success')
            addAlert.innerHTML="Note Added.";
        }
    }
    setTimeout(()=>{
        addAlert.innerHTML=""
    },2000)
})

const checkNote = (note)  =>{
    let isPresent=false
    notes.forEach((curNote)=>{
        if(curNote.title==note.title && curNote.desc ==note.desc){
            isPresent=true
        }
    })
    return isPresent
}


const pushNote = (note)  =>{
    notes.push(note)
    updateLs()
}

const updateLs =() =>{
    localStorage.setItem('notes',JSON.stringify(notes))
}

const addNote = (note)  =>{
    let card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `
    
    <h5 class="card-title">${note.title}</h5>
    <p class="card-text">${note.desc}</p><button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-pen-to-square text-light"></i></button><button class="btn btn-sm btn-danger" ><i class="fa-solid fa-trash"></i></button>
    
    `
    notesContainer.appendChild(card)
    card.querySelector('.btn-danger').addEventListener('click',()=>{
        card.remove()
        popNote(note.title,note.desc)
    })
    card.querySelector('.btn-warning').addEventListener('click',()=>{
        editTitle.value=note.title;
        editDesc.value=note.desc;
        saveBtn.addEventListener('click',()=>{
            if(editTitle.value==""){
                saveAlert.classList.add('text-danger')
                saveAlert.innerHTML="Title is empty !!"

            }else if(editDesc.value==""){
                saveAlert.classList.add('text-danger')
                saveAlert.innerHTML="Description is empty !!"
               
            }else if(editTitle.value==note.title && editDesc.value==note.desc){
                saveAlert.classList.add('text-danger')
                saveAlert.innerHTML="No Changes !!"
            }else{
           
            note.title=editTitle.value;
            note.desc=editDesc.value;
            saveAlert.classList.remove('text-danger')
            saveAlert.classList.add('text-success')

            saveAlert.innerHTML="Note Saved."
            updateLs()
            notesContainer.innerHTML=""
            loadNotes()

            }
            setTimeout(()=>{
                saveAlert.innerHTML=""
                saveAlert.classList.remove('text-success')
            },2000)
        })

        
    })
}



const popNote = (title, desc)  =>{
    notes.forEach((note,index)=>{
        if(note.title==title && note.desc == desc){
            notes.splice(index,1)
        }
    })
    updateLs()
}


search.addEventListener('keyup',()=>{
    let searchTerm = search.value.toUpperCase();

    document.querySelectorAll('.card-title').forEach((title)=>{
        if(title.textContent.toUpperCase().indexOf(searchTerm) > -1){
            title.parentElement.style.display=""
        }else{
            title.parentElement.style.display="none"
        }
    })
})

const loadNotes = ()  =>{
    notes.forEach((note)=>{
        addNote(note)
    })
}

clearBtn.addEventListener('click',()=>{
    notes.splice(0,notes.length)
    notesContainer.innerHTML=""
    updateLs()
})



loadNotes()
