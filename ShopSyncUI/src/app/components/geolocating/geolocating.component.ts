import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-geolocating',
  templateUrl: './geolocating.component.html',
  styleUrls: ['./geolocating.component.scss'],
})
export class GeolocatingComponent {
  userLocation: { latitude: number; longitude: number } | null = null;
  nearestFilials: any[] | null = null;
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserLocation();
    this.searchNearbyEdekaFilials();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  searchNearbyEdekaFilials() {
    if (this.userLocation) {
      const lat = encodeURIComponent(this.userLocation.latitude.toString());
      const lon = encodeURIComponent(this.userLocation.longitude.toString());

      const edekaApiUrl = `https://www.edeka.de/api/marketsearch/markets?coordinates=lat%3D${lat}%26lon%3D${lon}`;

      this.http.get(edekaApiUrl).subscribe((data: any) => {
        if (data.markets.length > 0) {
          this.nearestFilials = data.markets.map((result: any) => ({
            ...result,
            distance: this.calculateHaversineDistance(
              Number(lat),
              Number(lon),
              Number(result.coordinates.lat),
              Number(result.coordinates.lon)
            ),
          }));

          if (this.nearestFilials) {
            this.nearestFilials.sort(
              (a: any, b: any) => a.distance - b.distance
            );
          }
          console.log('Sorted Edeka Filials:', this.nearestFilials);
        }
      });
    }
  }

  calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Number(distance.toFixed(2));
  }

  isMarketOpen(market: any): boolean {
    const businessHours = market.businessHours;

    if (!businessHours) {
      return false;
    }

    const now = new Date();
    const currentDay = now
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;

    if (businessHours[currentDay] && businessHours[currentDay].open) {
      const openingTime = businessHours[currentDay].from;
      const closingTime = businessHours[currentDay].to;
      return this.isTimeBetween(currentTime, openingTime, closingTime);
    }
    return false;
  }

  isTimeBetween(
    currentTime: string,
    startTime: string,
    endTime: string
  ): boolean {
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const currentMinutesSinceMidnight = currentHour * 60 + currentMinute;
    const startMinutesSinceMidnight = startHour * 60 + startMinute;
    const endMinutesSinceMidnight = endHour * 60 + endMinute;

    return (
      currentMinutesSinceMidnight >= startMinutesSinceMidnight &&
      currentMinutesSinceMidnight <= endMinutesSinceMidnight
    );
  }

  openEdekaPage(marketUrl: string) {
    if (marketUrl.startsWith('https://www.edeka.de/')) {
      const modifiedUrl = marketUrl.replace('index.jsp', 'angebote');
      window.open(modifiedUrl, '_blank');
    } else {
      console.error('Ungültige Edeka-URL');
    }
  }
}
