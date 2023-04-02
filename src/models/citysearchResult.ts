export class CitysearchResult {
    public display_name: string;
    public lat: string;
    public lon: string;
  
    constructor(display_name: string, lat: string, lon: string) {
      this.display_name = display_name;
      this.lat = lat;
      this.lon = lon;
    }
  }