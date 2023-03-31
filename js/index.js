document.addEventListener("DOMContentLoaded", function() {});
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('DOMContentLoaded', fetchBooks())

//fetch books from API
function fetchBooks() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => appendBooks(data))
}

//append book titles to ul
function appendBooks(books) {
    let list = document.querySelector('#list')
    for (let i = 0; i < books.length; i++) {
            let obj = {
                id: books[i].id,
                title: books[i].title,
                subtitle: books[i].subtitle,
                description: books[i].description,
                author: books[i].author,
                img_url: books[i].img_url,
                users: books[i].users
            }
        let bookItem = document.createElement('li');
        bookItem.textContent = books[i].title;
        //display book information when title is clicked
        bookItem.addEventListener('click', function (e) {
            let liker
            let display = document.querySelector('#show-panel');
            display.innerHTML = ""
            //image
            let img = document.createElement('img');
            img.setAttribute('src', books[i].img_url);
            //Title
            let titleDisplay = document.createElement('h3');
            titleDisplay.textContent = books[i].title;
            titleDisplay.setAttribute('id', [i])
            //Above attribute to grab id in API when like button is clicked
            //SubTitle
            let subTitleDisplay = document.createElement('h3');
            subTitleDisplay.textContent = books[i].subtitle
            //Description
            let description = document.createElement('p');
            description.textContent = books[i].description;
            display.appendChild(img);
            display.appendChild(titleDisplay);
            display.appendChild(subTitleDisplay);
            display.appendChild(description);
            //List of likers
            let likerList = document.createElement('div');
            likerList.setAttribute('id', 'likerList')
            for (let j = 0; j < books[i].users.length; j++) {
                liker = document.createElement('li');
                liker.textContent = books[i].users[j].username;
                liker.style.paddingLeft = '25px'
                display.appendChild(likerList);
                likerList.appendChild(liker)
            }
            //Like Button
            let likeBtn = document.createElement('BUTTON');
            likeBtn.textContent = 'LIKE';
            likeBtn.style.marginTop = '10px'
            likeBtn.addEventListener('click', function (e) {
                let newUser = {
                    id: 1,
                    username: 'pouros'
                }
                let newObj = obj
                newObj.users.push(newUser)
                fetch(`http://localhost:3000/books/${Number(e.target.parentElement.children[1].id)+1}`,{
                    method:'PATCH',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:  JSON.stringify(newObj)
                })
                .then(res => res.json())
                .then(data => addNewUser(data) )
                function addNewUser(data) {
                    let li = document.createElement('li');
                    li.textContent = data.users.at(-1).username
                    li.style.paddingLeft = '25px'
                    document.querySelector('#likerList').appendChild(li)
                }
            })
            display.appendChild(likeBtn)
        })
        list.appendChild(bookItem);
    }
}

});
