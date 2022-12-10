console.log('index.js');
const e = () => {
    const e = document.querySelector('.alert');
    e && e.parentElement.removeChild(e);
  },
  t = (t, o) => {
    e();
    const a = `<div class="alert alert--${t}">${o}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', a),
      window.setTimeout(e, 5e3);
  },
  o = document.getElementById('map'),
  a = document.querySelector('.form--login'),
  s = document.querySelector('.nav__el.nav__el--logout'),
  n = document.querySelector('.form-user-data'),
  r = document.querySelector('.form-user-password'),
  d = document.getElementById('book-tour');
if (o) {
  const e = JSON.parse(document.getElementById('map').dataset.locations);
  console.log(e);
  const t = (e) => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoib3NtYW43ODYiLCJhIjoiY2xhOGY5d3VyMDJoczNvbnZpdGI0eDJiNSJ9.EYSlAQKesirYTHeEIi2wtg';
    var t = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      scrollZoom: !1,
    });
    const o = new mapboxgl.LngLatBounds();
    e.forEach((e) => {
      const a = document.createElement('div');
      (a.className = 'marker'),
        new mapboxgl.Marker({ element: a, anchor: 'bottom' })
          .setLngLat(e.coordinates)
          .addTo(t),
        new mapboxgl.Popup({ offset: 30 })
          .setLngLat(e.coordinates)
          .setHTML(
            `<p>\n          Day ${e.day}: ${e.description}\n        </p>`
          )
          .addTo(t),
        o.extend(e.coordinates);
    }),
      t.fitBounds(o, {
        padding: { top: 200, bottom: 200, left: 200, right: 200 },
      });
    const a = new mapboxgl.NavigationControl();
    t.addControl(a, 'top-right');
  };
  t(e);
}
a &&
  a.addEventListener('submit', (e) => {
    e.preventDefault();
    (async (e, o) => {
      try {
        'success' ===
          (
            await axios({
              method: 'POST',
              url: '/api/v1/users/login',
              data: { email: e, password: o },
            })
          ).data.status &&
          (t('success', 'Logged in successfully!'),
          window.setTimeout(() => {
            location.assign('/');
          }, 1500));
      } catch (e) {
        t('error', e.response.data.message),
          console.log(e.response.data.message);
      }
    })(
      document.getElementById('email').value,
      document.getElementById('password').value
    );
  }),
  s &&
    s.addEventListener('click', async () => {
      console.log('logout function played');
      try {
        'success' ==
          (await axios({ method: 'GET', url: '/api/v1/users/logout' })).data
            .status && location.reload(!0);
      } catch (e) {
        t('error', 'Error logging out! Try Again .');
      }
    }),
  n &&
    n.addEventListener('submit', (e) => {
      e.preventDefault();
      const o = new FormData();
      o.append('name', document.getElementById('name').value),
        o.append('email', document.getElementById('email').value),
        o.append('photo', document.getElementById('photo').files[0]);
      (async (e, o) => {
        console.log(e, o);
        try {
          const a =
              'data' === o
                ? '/api/v1/users/updateMe'
                : '/api/v1/users/updateMyPassword',
            s = await axios({ method: 'PATCH', url: a, data: e });
          console.log(s.status),
            200 === s.status &&
              (t('success', `${o} Data Updated successfully`),
              window.setTimeout(() => {
                location.reload();
              }, 1e3));
        } catch (e) {
          t('error', e.response.data.message);
        }
      })(o, 'data');
    }),
  r &&
    r.addEventListener('submit', async (e) => {
      e.preventDefault(),
        (document.querySelector('.btn--save-password').textContent =
          'Updating...');
      const o = document.getElementById('password-current').value,
        a = document.getElementById('password').value,
        s = document.getElementById('password-confirm').value;
      await (async (e, o) => {
        console.log(e, o);
        try {
          const a =
              'data' === o
                ? '/api/v1/users/updateMe'
                : '/api/v1/users/updateMyPassword',
            s = await axios({ method: 'PATCH', url: a, data: e });
          console.log(s.status),
            200 === s.status &&
              (t('success', `${o} Data Updated successfully`),
              window.setTimeout(() => {
                location.reload();
              }, 1e3));
        } catch (e) {
          t('error', e.response.data.message);
        }
      })({ passwordCurrent: o, password: a, confirmPassword: s }, 'password'),
        (document.querySelector('.btn--save-password').textContent =
          'SAVE PASSWORD'),
        (document.getElementById('password-current').value = ''),
        (document.getElementById('password').value = ''),
        (document.getElementById('password-confirm').value = '');
    }),
  d &&
    d.addEventListener('click', async (e) => {
      e.target.textContent = 'Processing...';
      const { tourId: o } = e.target.dataset,
        a = Stripe(
          'pk_test_51M9nnrSIH2aTZA92VigBxG04qGjmY9mETYcYcmF96MxXNo8PJyqiC3VK6zxS9DQuLuv50bvCX47fedrfRPPfSOEB00UlBeWiuT'
        );
      (async (e) => {
        try {
          const t = await axios(`/api/v1/booking/checkout-session/${e}`);
          await a.redirectToCheckout({ sessionId: t.data.session.id });
        } catch (e) {
          console.log(err), t('error', err);
        }
      })(o);
    });
//# sourceMappingURL=index.js.map
