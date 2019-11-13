const loadGoogleMapsApi = require('load-google-maps-api')

const componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'long_name',
  country: 'long_name',
  postal_code: 'short_name'
}

const fillInAddress = (autocomplete, callback) => () => {
  const place = autocomplete.getPlace()
  const data = place.address_components.map(item => {
    const addressType = item.types[0]
    if (componentForm[addressType]) {
      const value = item[componentForm[addressType]]
      return [addressType, value]
    }
    return null
  })
  .filter(item => item)
  .reduce((acc, item) => {
    acc[item[0]] = item[1]
    return acc
  }, {})

  return callback(data)
}

let instance = null

export default (element, callback) => {
  if (!element.current) {
    return null
  }

  return loadGoogleMapsApi({
    key: 'AIzaSyC0HDekZyCAyDNNKgs2oE1n55OjtSD8ahE',
    libraries: ['places'],
  }).then((googleMaps) => {
    if (!instance) {
      instance = new googleMaps.places.Autocomplete(element.current, { types: ['geocode'] })
      instance.setFields(['address_component'])
      instance.addListener('place_changed', fillInAddress(instance, callback))
    }
  })
}