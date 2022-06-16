ymaps.ready(function () {
  const myMap = new ymaps.Map('map', {
    center: [55.759488, 37.614245],
    zoom: 13,
    controls: [],
  },
  {
    searchControlProvider: 'yandex#search'
  }
  );

  const myPlacemark = new ymaps.Placemark([55.769535, 37.639985], {
    hintContent: 'Студия “High pass”',
  },
  {
    iconLayout: 'default#image',
    iconImageHref: './images/marker.svg',
    iconImageSize: [12, 12],
  });

  myMap.geoObjects.add(myPlacemark);

  myPlacemark.events
    .add('mouseenter', (event) => {
      console.log(event.get('target'));
    });
});
