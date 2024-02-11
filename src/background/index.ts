
chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
    const tabId = details.tabId
    if (details.url.includes('14.139.242.71:8085/Studentnew/Feedbacksemwise.aspx')) {
        void chrome.tabs.sendMessage(tabId, 'feedback');
    }
})
