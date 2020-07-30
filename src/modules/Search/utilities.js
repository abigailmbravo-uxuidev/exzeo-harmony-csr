import { sortDiariesByDate } from '../../utilities/diaries';
import { COMPANY_OPTIONS, PRODUCT_OPTIONS, STATE_OPTIONS } from './constants';

/**
 * Build query string and encodeURI
 * @param firstName
 * @param lastName
 * @param mailingAddress
 * @param propertyAddress
 * @param companyCode
 * @param state
 * @param product
 * @param effectiveDate
 * @param policyNumber
 * @param quoteNumber
 * @param status
 * @param quoteState
 * @param page
 * @param pageSize
 * @param sort
 * @param sortDirection
 * @param agencyCode
 * @param agentCode
 * @param licenseNumber
 * @param displayName
 * @param taxIdNumber
 * @param primaryPhoneNumber,
 * @returns {string} querystring
 */
export function buildQuerystring({
  firstName,
  lastName,
  mailingAddress,
  propertyAddress,
  effectiveDate,
  policyNumber,
  quoteNumber,
  status,
  quoteState,
  page,
  pageSize,
  sort,
  sortDirection,
  companyCode,
  state,
  product,
  agencyCode,
  agentCode,
  licenseNumber,
  displayName,
  taxIdNumber,
  primaryPhoneNumber
}) {
  const fields = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(mailingAddress && { mailingAddress }),
    ...(propertyAddress && { propertyAddress }),
    ...(effectiveDate && { effectiveDate }),
    ...(policyNumber && { policyNumber }),
    ...(quoteNumber && { quoteNumber }),
    ...(status && { status }),
    ...(quoteState && { quoteState }),
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(sort && { sort }),
    ...(sortDirection && { sortDirection }),
    ...(companyCode && { companyCode }),
    ...(state && { state }),
    ...(product && { product }),
    ...(agencyCode && { agencyCode }),
    ...(agentCode && { agentCode }),
    ...(licenseNumber && { licenseNumber }),
    ...(displayName && { displayName }),
    ...(taxIdNumber && { taxIdNumber }),
    ...(primaryPhoneNumber && { primaryPhoneNumber })
  };

  return encodeURI(
    Object.keys(fields)
      .map(key => `${key}=${fields[key]}`)
      .join('&')
  );
}

/**
 *
 * @param currentPage
 * @param isNext
 * @returns {string|*|number}
 */
export function setPageNumber(currentPage, isNext) {
  if (typeof isNext === 'undefined') {
    return currentPage || 1;
  }
  return isNext ? String(currentPage + 1) : String(currentPage - 1);
}

/**
 *
 * @param currentPage
 * @param pageSize
 * @param sortBy
 * @param sortDirection
 * @param results
 * @param totalRecords
 * @param noResults
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
export function formatSearchResults({
  currentPage = 1,
  pageSize = 0,
  sortBy = '',
  sortDirection = '',
  results = [],
  totalRecords = 0,
  noResults = true
}) {
  return {
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    results,
    totalRecords,
    noResults
  };
}

/**
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
export function formatAddressResults(results) {
  return formatSearchResults({
    results: results.IndexResult,
    totalRecords: results.TotalCount,
    noResults: !results.TotalCount
  });
}

/**
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
export function formatQuoteResults(results) {
  return formatSearchResults({
    currentPage: results.currentPage,
    pageSize: results.pageSize,
    sortBy: results.sort,
    sortDirection: results.sortDirection === -1 ? 'desc' : 'asc',
    results: results.quotes,
    totalRecords: results.totalNumberOfRecords,
    noResults: !results.totalNumberOfRecords
  });
}

/**
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
export function formatPolicyResults(results) {
  return formatSearchResults({
    currentPage: results.currentPage || 0,
    pageSize: results.pageSize || 0,
    sortBy: results.sort || '',
    sortDirection: results.sortDirection,
    results: results.policies,
    totalRecords: results.totalNumberOfRecords,
    noResults: !results.totalNumberOfRecords
  });
}

/**
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
export function formatAgentResults(results) {
  const totalRecords = Array.isArray(results) ? results.length : 0;
  return formatSearchResults({
    results,
    totalRecords,
    noResults: !totalRecords
  });
}

/**
 *
 * @param results
 * @param product
 */
export function formatDiaryResults(results, product) {
  const sortedResults = sortDiariesByDate(results.result, product);

  return {
    results: sortedResults,
    totalRecords: sortedResults.length,
    noResults: !sortedResults.length
  };
}

/**
 *
 * @param diaries
 * @returns {string[]}
 */
export function getCheckedDiaries(diaries) {
  return Object.keys(diaries).filter(id => diaries[id]);
}

/**
 *
 * @param users
 * @returns {*}
 */
export function buildAssigneesList(users) {
  const activeUsers = users.filter(user => !!user.enabled);

  const userList = activeUsers.map(user => ({
    answer: user.userId,
    label: `${user.firstName} ${user.lastName}`,
    type: 'user'
  }));

  return userList.sort((a, b) => {
    const userA = a.label.toUpperCase();
    const userB = b.label.toUpperCase();
    if (userA > userB) return 1;
    if (userA < userB) return -1;
    return 0;
  });
}

/**
 *
 * @param diaryOptions
 * @returns {{reasons: *, tags: *}}
 */
export function formatDiaryOptions(diaryOptions) {
  const options = diaryOptions;
  const diaryReasons = options.reduce((acc, d) => {
    const reasons = d.reasons;
    acc.push(...reasons);
    return acc;
  }, []);

  const diaryTags = options.reduce((acc, d) => {
    const tags = d.tags;
    acc.push(...tags);
    return acc;
  }, []);

  return {
    reasons: removeDuplicates(diaryReasons, 'answer'),
    tags: removeDuplicates(diaryTags, 'answer')
  };
}

/**
 *
 * @param array
 * @param property
 * @returns {*}
 */
function removeDuplicates(array, property) {
  return array.filter((obj, position, filteredArray) => {
    return (
      filteredArray.map(mapObj => mapObj[property]).indexOf(obj[property]) ===
      position
    );
  });
}

/**
 *
 * @param resources
 * @param uri
 * @param right
 * @returns {*[]}
 */
export const getMatchingResources = (resources = [], uri, right) => {
  return resources.filter(resource => {
    if (process.env.NODE_ENV !== 'production') {
      if (!!resource.conditions) {
        // As we use this more and more, every way we can slim down the resources array will help with perf.
        throw new Error(
          'Please filter out legacy resources in store when user logs in'
        );
      }
    }

    return resource.right === right && resource.uri.includes(uri);
  });
};

/**
 *
 * @param resources
 * @param uri
 * @param right
 * @returns {boolean}
 */
export const doesUserHaveAccess = (resources = [], uri, right) => {
  const matchingResources = getMatchingResources(resources, uri, right);

  return matchingResources.length > 0;
};

/**
 *
 * @param userProfile
 * @param uri
 * @returns {{productOptionMap: {}, productOptions: [], stateOptions: [], companyCodeMap: {}, companyCodeOptions: []}}
 */
export const cspConfigForSearch = (userProfile = {}, uri, right) => {
  const userResources = getMatchingResources(
    userProfile?.resources,
    uri,
    right
  );

  const companyCodeMap = {};
  const stateOptions = [];
  const productOptions = [];
  const companyCodeOptions = [];
  const productOptionMap = {};

  userResources.forEach(resource => {
    const [companyCode, state, product] = resource.uri.split(':');
    // we need to pass companyCode to server when creating a quote
    const resourceKey = `${state}:${product}`;
    companyCodeMap[resourceKey] = companyCode;

    if (!companyCodeOptions.find(o => o.answer === companyCode)) {
      companyCodeOptions.push(COMPANY_OPTIONS[companyCode]);
    }
    if (!stateOptions.find(o => o.answer === state)) {
      stateOptions.push(STATE_OPTIONS[state]);
    }
    if (!productOptions.find(o => o.answer === product)) {
      productOptions.push(PRODUCT_OPTIONS[product]);
    }
    if (!productOptionMap[state]) {
      productOptionMap[state] = [];
    }
    if (!productOptionMap[state].find(option => option.answer === product)) {
      productOptionMap[state].push(PRODUCT_OPTIONS[product]);
    }
  });

  return {
    companyCodeMap,
    companyCodeOptions,
    stateOptions,
    productOptions,
    productOptionMap
  };
};

export const normalizeDate = (value, previousValue) => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');

  if (!value || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 2) {
      return `${onlyNums}/`;
    }
    if (onlyNums.length === 4) {
      return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}/`;
    }
  }
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 4) {
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
  }
  return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(
    4,
    8
  )}`;
};

export const processChunk = async (data, chunkSize, func) => {
  if (data.length > chunkSize) {
    const result = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      result.push(func(data.slice(i, i + chunkSize)));
    }
    return await Promise.all(result);
  }
  return await func(data);
};
