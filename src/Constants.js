const appName = "blog";

const eventTopic = {
  ACCOUNT_CHANGE: "account_change",
  NETWORK_CHANGE: "network_change",
  REQUEST_THEME_TOGGLE: "request_theme_toggle",
};

const deployed = {
  contract: {
    BLOG: { 3: "0x2e4cd10546BfEC522e41F29B0896835CfbA12BeD" },
  },
};

const id = {
  input: {
    createBlogContent: "inputCreateBlogContent",
    createBlogIsPaid: "inputCreateBlogIsPaid",
  },
  div: {
    navbar: "divNavbar",
    navbarStickyPadding:"divNavbarStickyPadding"
  },
};

module.exports = {
  appName,
  eventTopic,
  deployed,
  id,
};
