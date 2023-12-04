const mongoose = require('mongoose');
const Visit = require('../../db/models/Visit.js');
const { extractBrowserInfo } = require('../helpers/extractBrowserInfo.js');

// tracking saves the visit to the database - visits returns the visits data

const getIdentifiedUser = (ip) => {
  if (
    [
      '98.97.56.141',
      '::1',
      '174.238.12.45',
      '98.97.57.220',
      '98.97.152.244',
      '216.147.125.127',
      '216.147.122.133',
      '174.238.11.133',
      '98.97.57.93',
      '75.104.111.155',
      '199.192.125.66',
    ].includes(ip)
  ) {
    return 'James Leakos';
  } else {
    return 'Unknown';
  }
};

const tagVisitWithUser = (visit) => {
  visit.identifiedUser = getIdentifiedUser(visit.ip);
  return visit;
};

const addUserInfoToVisits = (visits) => {
  return visits.map((visit) => {
    visit.browserInfo = extractBrowserInfo(visit.user_agent);
    if (!visit.user) {
      visit.user = 'Not Logged In';
    }
    visit = tagVisitWithUser(visit);
    return visit;
  });
};

exports.getVisitsSummaryByPage = async (req, res) => {
  try {
    // Fetch visits data
    let visitsData = await Visit.find({}).lean();

    // Process the user agent for each entry
    visitsData = addUserInfoToVisits(visitsData);

    // Aggregate the processed data
    let aggregatedData = { pages: {} };

    visitsData.forEach((visit) => {
      let page = !!visit.sub_name
        ? visit.pageVisited + '/' + visit.sub_name
        : visit.pageVisited;
      let user = visit.identifiedUser;
      let visitDate = new Date(visit.date); // Assuming visit has a date property
      let now = new Date();
      let oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      let oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);

      if (!aggregatedData.pages[page]) {
        aggregatedData.pages[page] = { users: {} };
      }

      if (!aggregatedData.pages[page].users[user]) {
        aggregatedData.pages[page].users[user] = {
          totalVisits: 0,
          visitsLastWeek: 0,
          visitsLastMonth: 0,
        };
      }

      aggregatedData.pages[page].users[user].totalVisits++;

      if (visitDate >= oneWeekAgo) {
        aggregatedData.pages[page].users[user].visitsLastWeek++;
      }

      if (visitDate >= oneMonthAgo) {
        aggregatedData.pages[page].users[user].visitsLastMonth++;
      }
    });

    // Convert the aggregated data to the desired format
    let pagesArray = [];
    for (let page in aggregatedData.pages) {
      let usersArray = [];
      for (let user in aggregatedData.pages[page].users) {
        usersArray.push({
          identifiedUser: user,
          totalVisits: aggregatedData.pages[page].users[user].totalVisits,
          visitsLastWeek: aggregatedData.pages[page].users[user].visitsLastWeek,
          visitsLastMonth:
            aggregatedData.pages[page].users[user].visitsLastMonth,
        });
      }
      pagesArray.push({
        pageVisited: page,
        users: usersArray,
      });
    }

    res.status(200).send(pagesArray);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ message: 'Error' });
  }
};

exports.getVisitsSummary = async (req, res) => {
  try {
    // Fetch visits data
    let visitsData = await Visit.find({}).lean();

    // Process the user agent for each entry
    visitsData = addUserInfoToVisits(visitsData);

    // Aggregate the processed data
    let aggregatedData = { identifiedUsers: {} };

    visitsData.forEach((visit) => {
      let identifiedUser = visit.identifiedUser; // Use identifiedUser instead of user
      let visitDate = new Date(visit.date); // Assuming visit has a date property
      let now = new Date();
      let oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      let oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);

      if (!aggregatedData.identifiedUsers[identifiedUser]) {
        aggregatedData.identifiedUsers[identifiedUser] = {
          totalVisits: 0,
          visitsLastWeek: 0,
          visitsLastMonth: 0,
        };
      }

      aggregatedData.identifiedUsers[identifiedUser].totalVisits++;

      if (visitDate >= oneWeekAgo) {
        aggregatedData.identifiedUsers[identifiedUser].visitsLastWeek++;
      }

      if (visitDate >= oneMonthAgo) {
        aggregatedData.identifiedUsers[identifiedUser].visitsLastMonth++;
      }
    });

    // Convert the aggregated data to the desired format
    let usersArray = [];
    for (let identifiedUser in aggregatedData.identifiedUsers) {
      usersArray.push({
        identifiedUser,
        totalVisits: aggregatedData.identifiedUsers[identifiedUser].totalVisits,
        visitsLastWeek:
          aggregatedData.identifiedUsers[identifiedUser].visitsLastWeek,
        visitsLastMonth:
          aggregatedData.identifiedUsers[identifiedUser].visitsLastMonth,
      });
    }

    res.status(200).send(usersArray);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ message: 'Error' });
  }
};
