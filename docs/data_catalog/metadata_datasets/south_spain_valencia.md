# Super Node: South | TEF Node: Spain

## Site: Valencia | Waste Container 

| ATTRIBUTE       | TYPE     | UNITS (SI)   | DESCRIPTION/COMMENTS                                                                                                                       |
|:----------------|:---------|:-------------|:-------------------------------------------------------------------------------------------------------------------------------------------|
| location        | geo:json |           | Geojson reference to the element. Can be Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon                           |
| address         | string   |           | Civil address where the container is located.                                                                                              |
| project         | string   |           | Project to which this entity belongs.                                                                                                      |
| category        | list     |           | Container category(s).                                                                                                                     |
| storedWasteKind | string   |           | Type of waste stored.                                                                                                                      |
| depth           | number   | m            | Container depth                                                                                                                            |
| height          | number   | m            | Container height.                                                                                                                          |
| fillingLevel    | number   |           | Percentage of container filling in parts by 1.                                                                                             |
| temeprature     | number   | ºC          | Temperature inside the container.                                                                                                          |
| c_factor        | number   |           | Multiplicative factor between [0 - 2] to adapt the measurement taken by the sensor with the visual % of filling that the client has of it. |

## Site: Valencia | Weather Forecast 

| ATTRIBUTE          | TYPE      | UNITS (SI)   | DESCRIPTION/COMMENTS                                                |
|:-------------------|:----------|:-------------|:--------------------------------------------------------------------|
| name               | string    |           | The name of where the weather forecast is located.                  |
| location           | geo:json  |           | Geojson reference to the element. It will be a Point.               |
| dateIssued         | date-time | ISO8601 UTC  | Date and time of issuance of the forecast in ISO8601 UTC format.    |
| validFrom          | date-time | ISO8601 UTC  | Date and time of start of the validity period in ISO8601 UTC format |
| validTo            | date-time | ISO8601 UTC  | Date and time of end of the validity period in ISO8601 UTC format.  |
| temperatureSurface | number    | ºC          | Surface temperature.                                                |
| windSpeed          | number    | m/s          | Wind speed at 10 meters high                                        |
| dewPoint2m         | number    | ºC          | Dew point at 2 meters high.                                         |

## Site: Valencia | Wate Container 

| ATTRIBUTE       | TYPE     | UNITS (SI)   | DESCRIPTION/COMMENTS                                                                                                                       |
|:----------------|:---------|:-------------|:-------------------------------------------------------------------------------------------------------------------------------------------|
| location        | geo:json |           | Geojson reference to the element. Can be Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon                           |
| address         | string   |           | Civil address where the container is located.                                                                                              |
| project         | string   |           | Project to which this entity belongs.                                                                                                      |
| category        | list     |           | Container category(s).                                                                                                                     |
| storedWasteKind | string   |           | Type of waste stored.                                                                                                                      |
| depth           | number   | m            | Container depth                                                                                                                            |
| height          | number   | m            | Container height.                                                                                                                          |
| fillingLevel    | number   |           | Percentage of container filling in parts by 1.                                                                                             |
| temeprature     | number   | ÂºC          | Temperature inside the container.                                                                                                          |
| c_factor        | number   |           | Multiplicative factor between [0 - 2] to adapt the measurement taken by the sensor with the visual % of filling that the client has of it. |

## Site: Valencia | Weather Forecast 

| ATTRIBUTE          | TYPE      | UNITS (SI)   | DESCRIPTION/COMMENTS                                                |
|:-------------------|:----------|:-------------|:--------------------------------------------------------------------|
| name               | string    |           | The name of where the weather forecast is located.                  |
| location           | geo:json  |           | Geojson reference to the element. It will be a Point.               |
| dateIssued         | date-time | ISO8601 UTC  | Date and time of issuance of the forecast in ISO8601 UTC format.    |
| validFrom          | date-time | ISO8601 UTC  | Date and time of start of the validity period in ISO8601 UTC format |
| validTo            | date-time | ISO8601 UTC  | Date and time of end of the validity period in ISO8601 UTC format.  |
| temperatureSurface | number    | ÂºC          | Surface temperature.                                                |
| windSpeed          | number    | m/s          | Wind speed at 10 meters high                                        |
| dewPoint2m         | number    | ÂºC          | Dew point at 2 meters high.                                         |

