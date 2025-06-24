declare namespace naver {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number)
    }
    class Map {
      constructor(el: HTMLElement, options: any)
      setCenter(latlng: LatLng): void
      setZoom(zoom: number): void
    }
    class Marker {
      constructor(options: any)
      setMap(map: Map | null): void
    }
    class Event {
      static addListener(instance: any, name: string, listener: Function): void
    }
  }
} 