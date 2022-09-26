const cartIcon = document.querySelector(".fa-cart-plus"),
    addToCart = document.querySelector(".add-to-cart"),
    hideShow = document.querySelector(".hide"),
    row = document.querySelector(".row"),
    purches = document.querySelector(".purches"),
    thankBox = document.querySelector(".prches-box"),
    seacrch = document.querySelector(".search input"),
    loder = document.querySelector("#loder")
var countItem = document.querySelector(".count")

var count = 0




// sidbar
cartIcon.addEventListener("click", () => {
    addToCart.classList.add("active")
    hideShow.classList.add("show")
})
hideShow.addEventListener("click", () => {
    addToCart.classList.remove("active")
    hideShow.classList.remove("show")
})

// after purches
purches.addEventListener("click", () => {

    var itemcard = addToCart.querySelectorAll(".add-card")

    itemcard.forEach(element => {
        if (addToCart.hasChildNodes(element)) {
            thankBox.classList.add("show")
            addToCart.classList.remove("active")
            hideShow.classList.remove("show")
            element.remove()
            updateTotal()
            count = 0
            countItem.innerText = count
            if (count != 0) {
                countItem.classList.remove("none")
            } else {
                countItem.classList.add("none")
            }
        }

    })
})



thankBox.addEventListener("click", () => {
    thankBox.classList.remove("show")
})

// api fatch

FetchApi()

async function FetchApi() {
    await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            showData(json)
            // loder
            loder.style.display = "none"
        })

}

// show api data

function showData(data) {
    var html = ''
    data.forEach(element => {
        var short = element.title
        var short2 = short.toString(short)
        short2 = short2.substring(0, 18)

        html += ` <div class="card">
        <div class="img">
            <img src="${element.image}" alt="">
        </div>
        <div class="heading">
            <h3 class="title">${short2}</h3>
        </div>
        <div class="about-produt">
            <p>${element.category}</p>
        </div>
        <div class="price-box">
        <p>₹ ${element.price}</p>
        </div>
        <button class="btn">Add to cart</button>
    </div>`

    });

    row.innerHTML = html

    additem(row)



    // search
    const itemCard = document.querySelectorAll(".card")

    seacrch.addEventListener('keyup', search)

    function search() {
        var searchVal = seacrch.value.toUpperCase()
        itemCard.forEach(element => {
            const cardTitle = element.querySelector(".title").innerText.toUpperCase()
            if (cardTitle.includes(searchVal)) {
                element.style.display = ''
            } else {
                element.style.display = 'none'
            }
        })
    }
}


function additem(data) {

    const card = data.querySelectorAll(".card")

    card.forEach(element => {
        const addBtn = element.querySelectorAll(".btn")

        addBtn.forEach(element => {
            element.addEventListener("click", (e) => {
                const cardBtn = e.target.parentElement
                const img = cardBtn.querySelector(".img img").src
                const title = cardBtn.querySelector(".heading .title").innerText
                const itemPrice = cardBtn.querySelector(".price-box p").innerText

                showItemCard(img, title, itemPrice)

            })
        })
    })

}




// add remove update data
function showItemCard(img, title, itemPrice) {


    // addToCart
    var itemTitle = addToCart.querySelectorAll(".title")

    for (var i = 0; i < itemTitle.length; i++) {
        if (itemTitle[i].innerText === title) {
            alert("Item already add in cart")
            return
        }
    }

    count++
    countItem.innerText = count
    if (count != 0) {
        countItem.classList.remove("none")
    } else {
        countItem.classList.add("none")
    }


    var cardAdd = document.createElement("div")
    cardAdd.classList.add("add-card")

    var html = ` 
    <div class="img">
        <img src="${img}" alt="">
    </div>
    <div class="heading">
        <h3 class="title">${title}</h3>
    </div>
    <div class="input">
        <span class="negetive">-</span>
        <input type="number" value="1">
        <span class="positive">+</span>
    </div>
    <div class="price-box">
        <p class="price">${itemPrice}</p>
    </div>
    <button class="remove">Remove</button>
`

    cardAdd.innerHTML = html

    addToCart.prepend(cardAdd)


    const addCart = document.querySelector(".add-card")

    // update input value on btn click
    addCart.querySelector(".input .negetive").addEventListener("click", () => {
        var input = addCart.querySelector(".input input")
        input.value = input.value - 1
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateTotal()
    })

    addCart.querySelector(".input .positive").addEventListener("click", () => {
        var input = addCart.querySelector(".input input")
        inputVal = parseInt(input.value)
        input.value = inputVal + 1
        updateTotal()
    })


    const removBtn = addToCart.querySelector(".remove")

    // remove card
    removBtn.addEventListener("click", remove)

    function remove(e) {
        var remove = e.target.parentElement
        remove.remove()

        count--
        countItem.innerText = count
        if (count <= 0) {
            countItem.classList.add("none")
        } else {
            countItem.classList.remove("none")
        }

        updateTotal()
    }
    
    
    updateTotal()
}

// update total
function updateTotal() {
    var addCard = addToCart.querySelectorAll(".add-card")
    var total = 0
    addCard.forEach(element => {
        var price = parseFloat(element.querySelector(".price").innerHTML.replace('₹', ''))
        var inputVal = element.querySelector("input")
        total += price * inputVal.value
    })
    total = Math.round(total * 100) / 100
    var totalVal = document.querySelector(".total-price")
    totalVal.innerText = '₹' + total
}


updateTotal()



