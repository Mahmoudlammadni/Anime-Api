# AnimeFusion

AnimeFusion is a React web application that displays anime information fetched from the Jikan API (an unofficial MyAnimeList API).  
The app features popular, airing, upcoming, and genre-based anime listings, along with detailed anime pages and a favorites list managed with Redux.

---

## 🛠️ Features

- Display anime by categories: Popular, Airing, Upcoming, and by Genre.
- Detailed anime information pages including synopsis, score, episodes, rating, studios, and trailer.
- Favorites list (My List) where users can add anime using Redux state management.
- Advanced filtering and search by genre, rating, score, and type.
- Routing and navigation handled with React Router.
- Global state management with Redux.

---

## 🚀 Getting Started (Local Setup)

1. **Prerequisites**  
   Make sure you have Node.js and npm installed.

2. **Clone the repository**  
   ```bash
   git clone https://github.com/USERNAME/REPO.git
   cd REPO
````

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the development server**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

* `index.jsx` — React entry point, Redux store provider setup
* `app.js` — Main app component with routing setup
* `redux.js` & `action.js` — Redux reducer and action creators
* `nav.js` — Navigation bar component
* `all.jsx` — Home page with search and filters
* `affichage.jsx` — Anime card display component
* `mylist.jsx` — Favorites list page
* `ani_infor.jsx` — Anime detailed info page
* `airing.js`, `upcoming.jsx`, `popular2.js`, `genre.js` — Category listing pages
* `style.css`, `style2.css` — Styling files

---

## ⚙️ Technologies Used

* React
* Redux (with legacy\_createStore)
* React Router DOM
* Jikan API ([https://jikan.moe/](https://jikan.moe/))
* Bootstrap (for some base styling)

---

## ✨ Notes

* Make sure you have internet access to fetch data from Jikan API.
* Redux is used to manage favorites and detailed info state.
* Filtering options use React state hooks locally inside components.

---

## 📞 Contact

For questions or feedback, please contact \Mahmoudlammadni.

