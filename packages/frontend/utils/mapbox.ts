import { Feature } from 'geojson';
import mapboxgl from 'mapbox-gl';
import { MapPointItemFeature } from '../redux/app';

export const deployRegions = (map: mapboxgl.Map | null, regions: Feature[]): void => {
  if (!map) return;
  regions.forEach((region) => {
    const regionCode = region.properties?.code.toString();
    map.addSource(regionCode, {
      type: 'geojson',
      data: region,
    });
    map
      .addLayer({
        id: regionCode,
        type: 'fill',
        source: regionCode,
        paint: {
          'fill-color': 'white',
          'fill-opacity': 0.4,
        },
      })
      .on('click', regionCode, () => {
        const selected = map.getPaintProperty(regionCode, 'fill-opacity') === 0.7;
        map.setPaintProperty(regionCode, 'fill-opacity', selected ? 0.4 : 0.7);
      });
  });
};

let nameOfMovingLayer = '';

export type DeployMapTokenParams = {
  map: mapboxgl.Map | null;
  point: MapPointItemFeature;
  image: string;
};

export const deployMapPointItem = ({ map, point, image }: DeployMapTokenParams): void => {
  if (!map) return;
  const canvas = map.getCanvasContainer();
  const i = point.properties.name;
  const sourceID = 'source' + i;
  const layerID = 'layer' + i;
  const imageID = 'image' + i;
  // Add the image to the map style.
  // @ts-ignore
  map.addImage(imageID, image);

  map.addSource(sourceID, {
    type: 'geojson',
    data: point,
  });
  map.addLayer({
    id: layerID,
    source: sourceID,
    type: 'symbol',
    layout: {
      'icon-image': imageID,
      'icon-size': 0.05,
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
  });

  map.on('mousedown', layerID, (e) => {
    // Prevent the default map drag behavior.
    e.preventDefault();

    canvas.style.cursor = 'grab';
    nameOfMovingLayer = point.properties.name;

    map.on('mousemove', onMove);
    map.once('mouseup', onStopDragging);
  });

  function onMove(e: mapboxgl.MapMouseEvent) {
    if (nameOfMovingLayer !== point.properties.name) return;
    const coords = e.lngLat;

    // Set a UI indicator for dragging.
    canvas.style.cursor = 'grabbing';

    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    point.geometry.coordinates = [coords.lng, coords.lat];
    // @ts-ignore
    map?.getSource(sourceID).setData(point);
  }

  function onStopDragging() {
    if (!map) return;
    // Print the coordinates of where the point had
    // finished being dragged to on the map.
    canvas.style.cursor = '';

    // Unbind mouse/touch events
    map.off('mousemove', onMove);
    map.off('touchmove', onMove);
  }

  // When the cursor enters a feature in
  // the point layer, prepare for dragging.
  map.on('mouseenter', layerID, () => {
    canvas.style.cursor = 'move';
  });

  map.on('mouseleave', layerID, () => {
    canvas.style.cursor = '';
  });

  // Mobile
  // map.current?.on('touchstart', pointID, (e) => {
  //   if (e.points.length !== 1) return;

  //   // Prevent the default map drag behavior.
  //   e.preventDefault();

  //   map.current?.on('touchmove', onMove);
  //   map.current?.once('touchend', onStopDragging);
  // });
};
