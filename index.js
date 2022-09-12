window.addEventListener('load', () => {
    //declaring global variaebles
    const input = document.querySelector('input');
    const form = document.querySelector('form');
    const buttonPlus = document.querySelector('#addAction_button');
    const valuesList = document.querySelector('ul');

    let savedNotes = []; //array which stores each input text

    const getValueFromStorage = (value) => JSON.parse(localStorage.getItem('text')).find(el => el == value);
    const setValueInStorage = (value) => localStorage.setItem('text', JSON.stringify(value));

    
    const newNote = (noteText) => {
        //creating new note
        const noteLi = document.createElement('li'),
              noteDivText = document.createElement('div'),
              noteDivImages = document.createElement('div'),
              imgEdit = document.createElement('img'),
              imgDelete = document.createElement('img');
        //seting images as buttons in note
        imgEdit.setAttribute("src", "styles/icons/edit.png");
        imgDelete.setAttribute("src", "styles/icons/delete.png");
        //adding note to the window
        if(noteText == '') {
            return false;
        }
        noteDivImages.append(imgEdit);
        noteDivImages.append(imgDelete);
        noteLi.append(noteDivText);
        noteLi.append(noteDivImages);
        valuesList.insertBefore(noteLi, valuesList.childNodes[0]);
        noteDivText.textContent = noteText;
        savedNotes.push(noteText);
        setValueInStorage(savedNotes);
        input.value = '';

        //deleting note
        imgDelete.addEventListener("click", () => {
            savedNotes.splice(savedNotes.indexOf(noteDivText.textContent), 1);
            setValueInStorage(savedNotes);
            noteLi.remove();
        });
        //edit note
        imgEdit.addEventListener("click", () => {
            savedNotes.splice(savedNotes.indexOf(noteDivText.textContent), 1);
            noteDivText.contentEditable = true;
            const selection = window.getSelection();  
            const range = document.createRange();  
            selection.removeAllRanges();  
            range.selectNodeContents(noteDivText);
            range.collapse(false);  
            selection.addRange(range);  
            noteDivText.focus(); 
            noteDivText.addEventListener('keydown', (event) => {
                if(event.key  == "Enter") {
                    if(noteDivText.textContent == '') {
                        noteLi.remove();
                    }
                    noteDivText.contentEditable = false;
                    savedNotes.push(noteDivText.textContent);
                    setValueInStorage(savedNotes);
                    event.preventDefault();
                }
            });
            noteDivText.addEventListener("dblclick", () => {
                noteDivText.contentEditable = true;
                noteDivText.addEventListener('keydown', (event) => {
                    if(event.key  == "Enter") {
                        noteDivText.contentEditable = false;
                        savedNotes.push(noteDivText.textContent);
                        setValueInStorage(savedNotes);
                        event.preventDefault();
                    }
                });
            });
        });

    };
    //checking if note exists
    if(JSON.parse(localStorage.getItem('text')).length !== 0) {
        JSON.parse(localStorage.getItem('text')).forEach((el) => {
            newNote(el);
        });
    }
    //add note to the page
    form.addEventListener('keydown', (event) => {
        if(event.key  == "Enter") {
            newNote(input.value);
            event.preventDefault();
        }
    });
    buttonPlus.addEventListener("click", () => {
        newNote(input.value);
    });
});