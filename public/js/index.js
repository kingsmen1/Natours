/* eslint-disable */
// console.log('index.js');

// const hideAlert = () => {
//   const el = document.querySelector('.alert');
//   if (el) el.parentElement.removeChild(el);
// };
// const showAlert = (type, msg) => {
//   hideAlert();
//   const markup = `<div class="alert alert--${type}">${msg}</div>`;
//   document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
//   window.setTimeout(hideAlert, 5000);
// };

// //DOM Elements
// const mapBox = document.getElementById('map');
// const loginForm = document.querySelector('.form--login');
// const logOutButton = document.querySelector('.nav__el.nav__el--logout');
// const userDataForm = document.querySelector('.form-user-data');
// const userPasswordForm = document.querySelector('.form-user-password');
// const tourBookButton = document.getElementById('book-tour');

// if (mapBox) {
//   //Accessing data from template and parsing.
//   const locations = JSON.parse(
//     document.getElementById('map').dataset.locations
//   );
//   console.log(locations);
//   const displayMap = (locations) => {
//     mapboxgl.accessToken =
//       'pk.eyJ1Ijoib3NtYW43ODYiLCJhIjoiY2xhOGY5d3VyMDJoczNvbnZpdGI0eDJiNSJ9.EYSlAQKesirYTHeEIi2wtg';
//     var map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/light-v10',
//       scrollZoom: false,
//       //   center: [-118.113491, 34.111745],
//       //   zoom: 10,
//       //by interactive map cannot be moved.
//       // interactive: false,
//     });

//     const bounds = new mapboxgl.LngLatBounds();

//     locations.forEach((loc) => {
//       //Create Marker
//       const el = document.createElement('div');
//       el.className = 'marker';

//       //Add Marker
//       new mapboxgl.Marker({
//         element: el,
//         anchor: 'bottom',
//       })
//         .setLngLat(loc.coordinates)
//         .addTo(map);

//       new mapboxgl.Popup({
//         offset: 30,
//       })
//         .setLngLat(loc.coordinates)
//         .setHTML(
//           `<p>
//           Day ${loc.day}: ${loc.description}
//         </p>`
//         )
//         .addTo(map);

//       //Extend map bounds to include current location
//       bounds.extend(loc.coordinates);
//     });

//     //To fit map to all bounds/coordinates.
//     map.fitBounds(bounds, {
//       padding: {
//         top: 200,
//         bottom: 200,
//         left: 200,
//         right: 200,
//       },
//     });

//     //To add Zoom Buttons
//     const nav = new mapboxgl.NavigationControl();
//     map.addControl(nav, 'top-right');
//   };
//   displayMap(locations);
// }

// if (loginForm) {
//   loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const login = async (email, password) => {
//       try {
//         //axios is used to send http methods from client side to server.
//         const res = await axios({
//           method: 'POST',
//           url: '/api/v1/users/login',
//           data: {
//             email,
//             password,
//           },
//         });

//         if (res.data.status === 'success') {
//           showAlert('success', 'Logged in successfully!');
//           window.setTimeout(() => {
//             location.assign('/');
//           }, 1500);
//         }
//       } catch (e) {
//         showAlert('error', e.response.data.message);
//         console.log(e.response.data.message);
//       }
//     };
//     login(email, password);
//   });
// }

// if (logOutButton) {
//   logOutButton.addEventListener('click', async () => {
//     console.log('logout function played');
//     try {
//       const res = await axios({
//         method: 'GET',
//         url: '/api/v1/users/logout',
//       });
//       // 'location.reload' It trigger's reload from server.
//       // It needs to set 'true' if not it will load from the same page/state from cache.
//       if (res.data.status == 'success') location.reload(true);
//     } catch (e) {
//       showAlert('error', 'Error logging out! Try Again .');
//     }
//   });
// }

// if (userDataForm) {
//   userDataForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('name', document.getElementById('name').value);
//     form.append('email', document.getElementById('email').value);
//     //Since we receave files in an array we have to select by index.
//     form.append('photo', document.getElementById('photo').files[0]);
//     const updateSettings = async (data, type) => {
//       console.log(data, type);
//       try {
//         const url =
//           type === 'data'
//             ? '/api/v1/users/updateMe'
//             : '/api/v1/users/updateMyPassword';
//         const res = await axios({
//           method: 'PATCH',
//           url,
//           data: data,
//         });
//         console.log(res.status);
//         if (res.status === 200) {
//           showAlert('success', `${type} Data Updated successfully`);
//           //page reloading.
//           window.setTimeout(() => {
//             location.reload();
//           }, 1000);
//         }
//       } catch (err) {
//         showAlert('error', err.response.data.message);
//       }
//     };
//     updateSettings(form, 'data');
//   });
// }

// if (userPasswordForm) {
//   userPasswordForm.addEventListener('submit', async (e) => {
//     e.preventDefault(); //btn--save-password
//     document.querySelector('.btn--save-password').textContent = 'Updating...';
//     const passwordCurrent = document.getElementById('password-current').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('password-confirm').value;
//     const updateSettings = async (data, type) => {
//       console.log(data, type);
//       try {
//         const url =
//           type === 'data'
//             ? '/api/v1/users/updateMe'
//             : '/api/v1/users/updateMyPassword';
//         const res = await axios({
//           method: 'PATCH',
//           url,
//           data: data,
//         });
//         console.log(res.status);
//         if (res.status === 200) {
//           showAlert('success', `${type} Data Updated successfully`);
//           //page reloading.
//           window.setTimeout(() => {
//             location.reload();
//           }, 1000);
//         }
//       } catch (err) {
//         showAlert('error', err.response.data.message);
//       }
//     };
//     await updateSettings(
//       { passwordCurrent, password, confirmPassword },
//       'password'
//     );
//     document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
//     document.getElementById('password-current').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('password-confirm').value = '';
//   });
// }

// if (tourBookButton) {
//   tourBookButton.addEventListener('click', async (e) => {
//     //e.target is the element in this case(book-button) which triggers the eventlistner.
//     e.target.textContent = 'Processing...';
//     //^ "tour-id" given from template converts to tourId in js bcos after '-' it cammel case it.
//     const { tourId } = e.target.dataset;
//     const stripe = Stripe(
//       'pk_test_51M9nnrSIH2aTZA92VigBxG04qGjmY9mETYcYcmF96MxXNo8PJyqiC3VK6zxS9DQuLuv50bvCX47fedrfRPPfSOEB00UlBeWiuT'
//     );
//     const bookTour = async (tourId) => {
//       try {
//         //1) Get Checkout sessoin from api.
//         //^ Without parameter's axios is set default to 'get'
//         const session = await axios(
//           `/api/v1/booking/checkout-session/${tourId}`
//         );

//         //2) Create Checkout form + Charge Credit Card.
//         await stripe.redirectToCheckout({
//           sessionId: session.data.session.id,
//         });
//       } catch (e) {
//         console.log(err);
//         showAlert('error', err);
//       }
//     };
//     bookTour(tourId);
//   });
// }

/* eslint-disable */

import 'core-js/stable';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateData, updateSettings } from './updateSetting';
import { bookTour } from './stripe';

//DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutButton = document.querySelector('.nav__el.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const tourBookButton = document.getElementById('book-tour');

if (mapBox) {
  //Accessing data from template and parsing.
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  // console.log(locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log(email, password);
    login(email, password);
  });
}

if (logOutButton) logOutButton.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    //Since we receave files in an array we have to select by index.
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //btn--save-password
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, confirmPassword },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (tourBookButton) {
  tourBookButton.addEventListener('click', async (e) => {
    //e.target is the element in this case(book-button) which triggers the eventlistner.
    e.target.textContent = 'Processing...';
    //^ "tour-id" given from template converts to tourId in js bcos after '-' it cammel case it.
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
