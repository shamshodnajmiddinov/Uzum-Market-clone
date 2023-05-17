import axios from "axios"

const userId = JSON.parse(localStorage.getItem("user"))

export async function header(place) {

  place.innerHTML = `<header>
      <div class="logo">
        <img class="header_logo" src="/public/img/logo/logo.png" alt="">
      </div>
      
      <button class="creteries">
        <a href="/pages/category.html">Каталог</a>
      </button>
      
      
      <div class="input-wrapper">
        <input type="text" id="search-input" placeholder="Искать">
        <div class="search-box">asdfjaskljfaklsjfkals</div>
      </div>
      
      <div class="navigation">
        <div class="account">
          <img src="/public/img/logo/accountLogo.png" alt="">
          <a href="/pages/login.html" class="acc user"></a>
        </div>
        <a href="/pages/likes.html" class="likes">Избранное</a>
        <div class="cart_div">
          <a href="/pages/cart.html"" class="cart">Корзина</a>
          <div class="cart_place">
            <p class="place_lenght"></p>
          </div>
        </div>
      </div>
      <div class="burger">
      <span class="first"></span>
      <span class="first"></span>
      <span class="first"></span>
      </div>
      </header>
      
      <div class="burger_after">
      <img class="img" src="/public/img/logo/close_modal.png" alt="">
      <div class="burger_row">
      <a href="/pages/login.html" class="acc users"></a>
      <a class="logout" href="pages/registration.html">Выйти</a>
      <a href="/pages/likes.html" class="likes">Избранное</a>
      <a href="/pages/cart.html"" class="cart">Корзина</a>
      <a href="/pages/category.html">Каталог</a>
      </div>
      
      `


  let userName = document.querySelector('.user')
  let burge_user = document.querySelector('.users')
  let place_lenght = document.querySelector('.place_lenght')

  if (userId) {
    let userName = document.querySelector('.user')
    let burge_user = document.querySelector('.users')
    let place_lenght = document.querySelector('.place_lenght')
    const user = await axios.get(`http://localhost:3000/users/${userId}`)
    place_lenght.innerHTML = user.data.cart.length
    userName.innerHTML = user.data.name

  } else {
    place_lenght.innerHTML = 0
    place_lenght.onclick = () => {
      window.location.assign('/pages/login.html')
    }
    userName.innerHTML = 'Войти'
    burge_user.innerHTML = 'Войти'
  }


  const goods = await axios.get("http://localhost:3000/goods/")



  const burger_after = document.querySelector('.burger_after')
  const burger = document.querySelector('.burger')
  const img = document.querySelector('.img')

  burger.onclick = () => {
    burger_after.classList.add('active')

  }

  img.onclick = () => {
    burger_after.classList.remove('active')

  }


  let logout = document.querySelector('.logout')

  logout.onclick = () => {
    localStorage.clear()
  }
  const header_logo = document.querySelector(".header_logo")
  header_logo.onclick = () => {
    window.location.assign("/index.html")
  }

  const input = document.getElementById("search-input")
  const search_box = document.getElementsByClassName("search-box")[0]

  input.addEventListener("keydown", (e) => {
    search_box.innerHTML = ""

    const filtered = goods.data.filter((item) =>
      item.title.includes(e.target.value)
    )
    console.log(filtered);


    if (e.target.value.length > 1 && filtered.length > 0) {
      search_box.style.opacity = 1

      filtered.forEach((item) => {
        search_box.innerHTML += `
              <div class="search-result-item" data-id="${item.id}">
                ${item.title}
              </div>
            `
      })

      const search_results =
        document.getElementsByClassName("search-result-item")

      for (const el of search_results) {
        el.addEventListener("click", () => {
          localStorage.setItem("ids", JSON.stringify([Number(el.dataset.id)]))
          location.assign("/pages/pageProduct.html")
        })
      }
    } else {
      search_box.style.opacity = 0
    }
  })
}
