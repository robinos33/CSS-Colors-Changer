chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    document.getElementById("colorForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let variables = {};
        for (const pair of formData.entries()) {
            variables[pair[0]] = pair[1];
        }
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: changeColors,
            args: [variables],
        });
    });
});


function changeColors(variables) {

    const setCssVariable = (variable, value) => {
        document.querySelector(':root').style.setProperty(variable, value);
    }

    for (const [key, value] of Object.entries(variables)) {
        setCssVariable("--" + key, value);
    }
}
