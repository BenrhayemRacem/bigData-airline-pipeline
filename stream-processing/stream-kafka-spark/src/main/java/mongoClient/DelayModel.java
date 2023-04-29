package mongoClient;

public class DelayModel {
  String date;
  String flight;
  String origin;
  String destination;
  double delay;

  public DelayModel(String date, String flight, String origin,
                    String destination, double delay) {
    this.date = date;
    this.flight = flight;
    this.origin = origin;
    this.destination = destination;
    this.delay = delay;
  }

  public String getDate() { return this.date; }

  public void setDate(String date) { this.date = date; }

  public String getFlight() { return flight; }

  public void setFlight(String flight) { this.flight = flight; }

  public String getOrigin() { return origin; }

  public void setOrigin(String origin) { this.origin = origin; }

  public String getDestination() { return destination; }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public double getDelay() { return delay; }

  public void setDelay(double delay) { this.delay = delay; }

  @Override
  public String toString() {
    return "date=" + this.date + ",\n"
        + "flight=" + this.flight + ",\n"
        + "origin=" + this.origin + ",\n"
        + "destination=" + this.destination + ",\n"
        + "delay=" + this.delay + ",\n";
  }
}
