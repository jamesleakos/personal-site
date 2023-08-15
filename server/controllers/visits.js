const mongoose = require('mongoose');
const Visit = require('../../db/models/Visit.js');
const { extractBrowserInfo } = require('../helpers/extractBrowserInfo.js');

exports.getVisitsSummaryByPage = async (req, res) => {
  try {
    // Fetch visits data
    const visitsData = await Visit.find({}).lean();

    // Process the user agent for each entry
    visitsData.forEach(visit => {
      visit.browserInfo = extractBrowserInfo(visit.user_agent);
      if (!visit.user) {
        visit.user = "Anonymous";
      }
    });

    // Now, aggregate the processed data
    let aggregatedData = {}; // To store the aggregated results

    visitsData.forEach(visit => {
      let page = visit.pageVisited;
      let user = visit.user;
      let ip = visit.ip;
      let browser = visit.browserInfo.summary;

      if (!aggregatedData[page]) {
        aggregatedData[page] = { users: {}, totalVisits: 0 };
      }
      if (!aggregatedData[page].users[user]) {
        aggregatedData[page].users[user] = { ips: {}, totalVisits: 0 };
      }
      if (!aggregatedData[page].users[user].ips[ip]) {
        aggregatedData[page].users[user].ips[ip] = { browsers: {}, totalVisits: 0 };
      }
      if (!aggregatedData[page].users[user].ips[ip].browsers[browser]) {
        aggregatedData[page].users[user].ips[ip].browsers[browser] = 0;
      }

      aggregatedData[page].users[user].ips[ip].browsers[browser]++;
      aggregatedData[page].users[user].ips[ip].totalVisits++;
      aggregatedData[page].users[user].totalVisits++;
      aggregatedData[page].totalVisits++;
    });

    // Convert the aggregated data to the desired format
    let result = [];
    for (let page in aggregatedData) {
      let usersArray = [];
      for (let user in aggregatedData[page].users) {
        let ipsArray = [];
        for (let ip in aggregatedData[page].users[user].ips) {
          let browsers = [];
          for (let browser in aggregatedData[page].users[user].ips[ip].browsers) {
            browsers.push({
              browser,
              count: aggregatedData[page].users[user].ips[ip].browsers[browser]
            });
          }
          ipsArray.push({
            ip,
            totalVisits: aggregatedData[page].users[user].ips[ip].totalVisits,
            browsers
          });
        }
        usersArray.push({
          user,
          totalVisits: aggregatedData[page].users[user].totalVisits,
          ips: ipsArray
        });
      }
      result.push({
        pageVisited: page,
        totalVisits: aggregatedData[page].totalVisits,
        users: usersArray
      });
    }

    res.status(200).send(result);

  } catch (error) {
    console.log('error', error);
    res.status(500).send({ message: 'Error' });
  }
};

exports.getVisitsSummary = async (req, res) => {
  try {
    // Fetch visits data
    const visitsData = await Visit.find({}).lean();

    // Process the user agent for each entry
    visitsData.forEach(visit => {
      visit.browserInfo = extractBrowserInfo(visit.user_agent);
      if (!visit.user) {
        visit.user = "Anonymous";
      }
    });

    // Aggregate the processed data
    let aggregatedData = { users: {} };

    visitsData.forEach(visit => {
      let user = visit.user;
      let ip = visit.ip;
      let browser = visit.browserInfo.browser;
      let page = visit.pageVisited;

      if (!aggregatedData.users[user]) {
        aggregatedData.users[user] = { ips: {}, totalVisits: 0 };
      }
      if (!aggregatedData.users[user].ips[ip]) {
        aggregatedData.users[user].ips[ip] = { pages: {}, browsers: {}, totalVisits: 0 };
      }
      if (!aggregatedData.users[user].ips[ip].pages[page]) {
        aggregatedData.users[user].ips[ip].pages[page] = 0;
      }
      if (!aggregatedData.users[user].ips[ip].browsers[browser]) {
        aggregatedData.users[user].ips[ip].browsers[browser] = 0;
      }

      aggregatedData.users[user].ips[ip].pages[page]++;
      aggregatedData.users[user].ips[ip].browsers[browser]++;
      aggregatedData.users[user].ips[ip].totalVisits++;
      aggregatedData.users[user].totalVisits++;
    });

    // Convert the aggregated data to the desired format
    let usersArray = [];
    for (let user in aggregatedData.users) {
      let ipsArray = [];
      for (let ip in aggregatedData.users[user].ips) {
        let pagesArray = Object.keys(aggregatedData.users[user].ips[ip].pages).map(page => ({
          pageVisited: page,
          count: aggregatedData.users[user].ips[ip].pages[page]
        }));

        let browsersArray = Object.keys(aggregatedData.users[user].ips[ip].browsers).map(browser => ({
          browser,
          count: aggregatedData.users[user].ips[ip].browsers[browser]
        }));

        ipsArray.push({
          ip,
          totalVisits: aggregatedData.users[user].ips[ip].totalVisits,
          pages: pagesArray,
          browsers: browsersArray
        });
      }
      usersArray.push({
        user,
        totalVisits: aggregatedData.users[user].totalVisits,
        ips: ipsArray
      });
    }

    res.status(200).send(usersArray);

  } catch (error) {
    console.log('error', error);
    res.status(500).send({ message: 'Error' });
  }
};



