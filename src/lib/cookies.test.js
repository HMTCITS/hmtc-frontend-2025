/* eslint-disable no-undef */
jest.mock('universal-cookie', () => {
  const mockInstance = {
    set: jest.fn(),
    get: jest.fn(),
    remove: jest.fn(),
  };
  return jest.fn().mockImplementation(() => mockInstance);
});

import Cookies from 'universal-cookie';

import { getToken, removeToken, setToken } from './cookies';

describe('Cookies Utilities', () => {
  let mockCookieInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCookieInstance = new Cookies();
  });

  test('setToken should call cookies.set with correct arguments', () => {
    const token = 'xyz123token';
    setToken(token);

    expect(mockCookieInstance.set).toHaveBeenCalledWith('@HMTCTOKEN', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: false,
    });
    expect(mockCookieInstance.set).toHaveBeenCalledTimes(1);
  });

  test('getToken should call cookies.get and return its value', () => {
    const token = 'xyz123token';
    mockCookieInstance.get.mockReturnValue(token);

    const receivedToken = getToken();

    expect(receivedToken).toBe(token);
    expect(mockCookieInstance.get).toHaveBeenCalledWith('@HMTCTOKEN');
    expect(mockCookieInstance.get).toHaveBeenCalledTimes(1);
  });

  test('getToken should return undefined when no token exists', () => {
    mockCookieInstance.get.mockReturnValue(undefined);

    const receivedToken = getToken();

    expect(receivedToken).toBeUndefined();
    expect(mockCookieInstance.get).toHaveBeenCalledWith('@HMTCTOKEN');
    expect(mockCookieInstance.get).toHaveBeenCalledTimes(1);
  });

  test('getToken should return undefined when token is not a string', () => {
    mockCookieInstance.get.mockReturnValue(123);

    const receivedToken = getToken();

    expect(receivedToken).toBeUndefined();
    expect(mockCookieInstance.get).toHaveBeenCalledWith('@HMTCTOKEN');
    expect(mockCookieInstance.get).toHaveBeenCalledTimes(1);
  });

  test('removeToken should call cookies.remove with correct arguments', () => {
    removeToken();
    expect(mockCookieInstance.remove).toHaveBeenCalledWith('@HMTCTOKEN', {
      path: '/',
    });
    expect(mockCookieInstance.remove).toHaveBeenCalledTimes(1);
  });
});
