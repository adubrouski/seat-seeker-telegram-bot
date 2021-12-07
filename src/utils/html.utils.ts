import cheerio, { Cheerio, Element, Node } from 'cheerio';
import {
  PointOfDeparture,
  PointOfDestination,
  Route,
  Seats,
} from '../models/Route.model';

export const getRoutesListFromContainer = () => {
  const routes: Route[] = [];

  return {
    appendRouteByContainer: (index: number, container: Element) => {
      const $ = cheerio.load(container);
      const mainInfoWrapper = $(container)
        .children('div')
        .children('div')
        .children('div')
        .first();

      const pointOfDeparture = composePointOfDeparture(mainInfoWrapper);
      const pointOfDestination = composePointOfDestination(mainInfoWrapper);
      const seats = composeSeats(mainInfoWrapper);

      routes.push({ pointOfDeparture, pointOfDestination, seats });
    },
    routes,
  };
};

const composePointOfDeparture = (
  mainInfoWrapper: Cheerio<Node>,
): PointOfDeparture => {
  const departureSection = mainInfoWrapper
    .children('div:first-child')
    .children('div:first-child');

  return {
    city: departureSection.children('div:nth-child(2)').text(),
    station: departureSection.children('div:last-child').first().text(),
    date: departureSection
      .children('div:first-child')
      .children('div:first-child')
      .text(),
    time: departureSection
      .children('div:first-child')
      .children('div:nth-child(2)')
      .text(),
  };
};

const composePointOfDestination = (
  mainInfoWrapper: Cheerio<Node>,
): PointOfDestination => {
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
};

const composeSeats = (mainInfoWrapper: Cheerio<Node>): Seats => {
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
};

export const validateRouteContainer = (index: number, container: Element) => {
  const $ = cheerio.load(container);

  return !$(container).children('div').attr('style');
};
