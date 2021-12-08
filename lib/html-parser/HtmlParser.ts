import cheerio, { Cheerio, Element, Node } from 'cheerio';
import {
  PointOfDeparture,
  PointOfDestination,
  Route,
  Seats,
} from '../../src/models/route.model';

export class HtmlParser {
  private list: Route[];
  constructor(private htmlDocument: string) {
    this.list = [];
  }

  public parse() {
    const $ = cheerio.load(this.htmlDocument);

    $('#__next > div > .MuiContainer-root > .MuiGrid-container > div')
      .first()
      .children('div')
      .not(':nth-last-child(-n+2)')
      .filter((index, node) => HtmlParser.validateContainer(node))
      .each((index, node) => this.addNode(node));

    return this.list;
  }

  private addNode(container: Element) {
    const $ = cheerio.load(container);
    const mainInfoWrapper = $(container)
      .children('div')
      .children('div')
      .children('div')
      .first();
    const pointOfDeparture =
      HtmlParser.composePointOfDeparture(mainInfoWrapper);
    const pointOfDestination =
      HtmlParser.composePointOfDestination(mainInfoWrapper);
    const seats = HtmlParser.composeSeats(mainInfoWrapper);

    this.setList([
      ...this.list,
      { pointOfDeparture, pointOfDestination, seats },
    ]);
  }

  private setList(list: Route[]) {
    this.list = list;
  }

  private static validateContainer(container: Element) {
    const $ = cheerio.load(container);
    const routeContainer = $(container).children('div').children('div');

    return routeContainer.first().children().length === 1;
  }

  private static composePointOfDeparture(
    mainInfoWrapper: Cheerio<Node>,
  ): PointOfDeparture {
    const departureSection = mainInfoWrapper
      .children('div:first-child')
      .children('div:first-child');
    const dateInnerText = departureSection
      .children('div:first-child')
      .children('div:nth-child(2)')
      .text(); // example: '8 Dec, We'
    const datePart = dateInnerText.split(',')[0]; // example: '8 Dec'

    const dateObject = new Date(Date.parse(datePart));
    dateObject.setFullYear(new Date().getFullYear());

    return {
      city: departureSection.children('div:nth-child(2)').text(),
      station: departureSection.children('div:last-child').first().text(),
      date: dateObject.toISOString(),
      time: departureSection
        .children('div:first-child')
        .children('div:first-child')
        .text(),
    };
  }

  private static composePointOfDestination(
    mainInfoWrapper: Cheerio<Node>,
  ): PointOfDestination {
    const arrivalSection = mainInfoWrapper
      .children('div:nth-child(2)')
      .children('div:first-child');

    return {
      city: arrivalSection.children('div:nth-child(2)').text(),
      station: arrivalSection.children('div:nth-child(3)').text(),
      time: arrivalSection
        .children('div:first-child')
        .children('div:first-child')
        .text(),
    };
  }

  private static composeSeats(mainInfoWrapper: Cheerio<Node>): Seats {
    const hasAvailableSeats = !!mainInfoWrapper
      .children('div:nth-child(3)')
      .text();

    if (!hasAvailableSeats) return null;

    const seatsSection = mainInfoWrapper
      .children('div:nth-child(3)')
      .children('div:first-child');

    return {
      cost: seatsSection.children('div:first-child').children('h6').text(),
      paymentByCard: !!seatsSection.children('div:nth-child(2)').text(),
      freeSeats: seatsSection.children('p:nth-child(4)').text(),
    };
  }
}
