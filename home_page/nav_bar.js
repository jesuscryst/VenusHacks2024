function switchActive(tabId) {
    // Hide all tabs and panels
    document.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        panel.style.display = 'none';
    });

  
    // Show the selected tab and panel
    const selectedTab = document.getElementById(tabId);
    var parentdiv = selectedTab.closest("div").id;
    var selectedPanel = document.getElementById(`${parentdiv}_content`);
    selectedTab.setAttribute('aria-selected', 'true');
    selectedPanel.style.display = 'block';

    var deactivatenav = document.querySelectorAll(".nav-link");
    deactivatenav.forEach(element => {
        if (element.classList.contains("active")) {
            element.classList.remove("active");

            var parentid = element.closest("div").id;
            var deactivatecontent = document.getElementById(`${parentid}_content`);
            deactivatecontent.classList.remove("show", "active");
        }
    });

    var activenav = document.getElementById(tabId);
    activenav.classList.add("active");
    var activetitle = document.getElementById("title");
    switch(tabId) {
        case "reminderslink":
            activetitle.innerHTML = "Reminders";
            break;
        case "messageslink":
            activetitle.innerHTML = "Messages";
            break;
        case "babysitterslink":
            activetitle.innerHTML = "Find Babysitters";
            break;
        default:
            activetitle.innerHTML = "Calendar";
    }

    var parentdiv = activenav.closest("div").id;
    var activecontent = document.getElementById(`${parentdiv}_content`);
    activecontent.classList.add("show", "active");
}