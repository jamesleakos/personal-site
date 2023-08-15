
exports.extractBrowserInfo = (ua) => {
  let type, os, browser;

  if (!ua) return { type: 'unknown', os: 'unknown', browser: 'unknown', summary: 'unknown' };

  // Determine type (desktop/mobile/tablet)
  if (ua.includes('Mobile') || ua.includes('iPhone') || (ua.includes('Android') && !ua.includes('Tablet'))) {
    type = 'mobile';
  } else if (ua.includes('Tablet') || ua.includes('iPad')) {
    type = 'tablet';
  } else {
    type = 'desktop';
  }

  // Determine OS
  if (ua.includes('Macintosh') || ua.includes('Mac OS X')) {
    os = 'mac';
  } else if (ua.includes('Windows')) {
    os = 'windows';
  } else if (ua.includes('Android')) {
    os = 'android';
  } else if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) {
    os = 'ios';
  } else if (ua.includes('Linux')) {
    os = 'linux';
  } else {
    os = 'unknown';
  }

  // Determine browser
  if (ua.includes('CriOS')) {
    browser = 'chrome (ios)';
  } else if (ua.includes('Chrome')) {
    browser = 'chrome';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'safari';
  } else if (ua.includes('Firefox')) {
    browser = 'firefox';
  } else if (ua.includes('Edg')) {
    browser = 'edge';
  } else if (ua.includes('MSIE') || ua.includes('Trident/')) {
    browser = 'internet explorer';
  } else if (ua.includes('Opera') || ua.includes('OPR/')) {
    browser = 'opera';
  } else {
    browser = 'unknown';
  }

  return { type, os, browser, summary: `${type} ${os} ${browser}` };
}

