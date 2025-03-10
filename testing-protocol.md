# Testing Protocol

This document outlines our manual protocol for ClearWaters. The goal is to verify that each core feature functions correctly and meets our users’ needs. Below are the key features to be tested, along with the testing process, expected results, unexpected results, and workarounds if bugs are present.

## Acceptance Testing

### Feature: PFA Quality Lookup by County

**Requirement Specification:**
Allows users to select one of five WA state counties to retrieve specific PFAs that have been detected in that county’s water system.

**Test Process:**
1. Navigated on the homepage, a user selects a county from the drop-down menu and presses go.
2. The frontend should send a request to the backend.
3. The backend should query the database and return the correct water quality data.
4. The frontend should display the correct data clearly and accurately.
5. The user should be taken to a page that displays the count of PFAs present for the county, as well as the shorthand name for each PFA.
6. When the user hovers over any PFA name, a blurb appears above the hovered PFA that displays the PFA State Action level and the PFA description.

**Expected Result / Success Criteria:**
- The correct county’s water PFA data appears in the results.
- The displayed data matches the stored database record.
- The response time is under 3 seconds.

**Unexpected Result / Failure Criteria:**
- Incorrect or no data is displayed.
- The request takes more than 5 seconds.
- Data formatting errors occur.

**Workaround for present bug:**
- If incorrect or no data is displayed, instruct the user to refresh the page and reselect the county from the dropdown; this triggers a new data request.
- If the response time exceeds 5 seconds, advise the user to check their network connection and wait a few extra seconds before retrying, as this may resolve temporary delays.
- If data formatting errors occur, recommend clearing the browser cache or switching to an alternative browser, while offering a simplified text view if available to bypass compatibility issues.



---

### Feature: Interactive Map with PFA Data by County

**Requirement Specification:**
Allows users to see a map of WA state with markers of five different counties. Users can click on any county marker on the map, and they can see all PFA test results for that county. Users can filter by county, water system, and PFA type.

**Test Process:**
1. User clicks on the Map button in the navbar.
2. User sees the map and clicks on any county marker on the map.
3. The frontend should send a request to the backend to pull all data from the specific county.
4. The backend should query the database and return the correct water quality data.
5. Under the map, the data is displayed, along with filters to change county, select water system, and select PFA type.
6. Under the map, the user selects a different county from the drop-down.
7. The backend should query the database and return the correct water quality data for the newly selected county.
8. The frontend should display the data clearly and accurately for the correct county.
9. User presses the reset button on the map to clear the data and reset the map positioning to zoom out of the previously clicked county.

**Success Criteria:**
- The selected county is zoomed in on the map.
- Under the map, selecting different filter options from the filter drop-downs immediately changes the presented data.
- Selecting a different county from the drop-down updates the map and the presented data immediately.
- The map remains responsive and does not lag.
- The reset button resets map positioning and the data table is no longer displayed.

**Failure Criteria:**
- When a county is selected from the map, the map does not zoom in on it.
- No data is displayed when a county is selected on the map.
- When the user selects different filters, the displayed data remains unchanged.
- The map is unresponsive or crashes.

**Workaround for present bug:**
- If the map fails to zoom when a county marker is clicked, instruct the user to select the desired county from the filter dropdown below the map; this alternative action should prompt the correct zoom functionality.
- If no data is displayed after selecting a county, reapply the county filter or use a manual refresh button, which may help load the correct dataset.
- If the filter options are unresponsive, recommend clearing the browser cache and using the “reset filters” button to reinitialize the data display, ensuring updated information.
- If the map becomes unresponsive or crashes, suggest trying an alternative browser or device and ensuring the current browser is updated, as this can resolve compatibility and performance issues.

---

## Limitations of Our Acceptance Tests
Here are some limitations of our acceptance tests and differences between our in-house testing environment and real-world user interactions:

### Limited Scope of Testing:
Our acceptance tests focus on core functionality, like accessing data and displaying accuracy, but do not comprehensively test for usability or a high load of data.

### Lack of Real-World Data Variability:
Our testing environment may have a controlled and well-structured dataset, whereas real-world data may be incomplete, inconsistent, or formatted differently.

### Device and Browser Compatibility:
Our tests may be conducted in a specific browser and device setup, potentially missing issues that arise on other platforms or older devices.

### Network Conditions:
Our testing environment may have stable and fast network conditions, but real users might experience slow or unstable connections, affecting performance and response times.
